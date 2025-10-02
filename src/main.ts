//import 'dotenv/config'; //crear base de datos
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bullmq';
import { RequestCounterMiddleware } from './req-contador/request-counter.middleware';
import { QueueManagerService } from './tareas/queue-manager.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  // Habilitar CORS
  app.enableCors({
    origin: '*',  // Permitir solicitudes desde tu frontend en Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Métodos permitidos
    credentials: true,  // Permitir envío de credenciales como cookies
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("End points")
    .setDescription("todos los servicios de la api")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    }
  });

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  
  const queueManager = app.get(QueueManagerService);
  
  // Inicializamos con las colas existentes (puede estar vacío al principio)
  let adapters = queueManager.getAllQueues().map(queue => new BullMQAdapter(queue));
  
  const { replaceQueues } = createBullBoard({
    queues: adapters,
    serverAdapter,
  });
  
  app.use('/admin/queues', serverAdapter.getRouter());
  
  // 🔄 Hook: cada vez que quieras refrescar el dashboard
  queueManager['onQueuesChanged'] = () => {
    const adapters = queueManager.getAllQueues().map(queue => new BullMQAdapter(queue));
    replaceQueues(adapters);
  };

  // Middleware para contar las solicitudes
  app.use(new RequestCounterMiddleware().use);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
}
bootstrap();

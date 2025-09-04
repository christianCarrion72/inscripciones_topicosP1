// src/tareas/tareas.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // Ajusta según tu cliente
})
export class TareasGateway {
  @WebSocketServer()
  server: Server;

  sendJobUpdate(jobId: string, event: string, data: any) {
    this.server.emit(`job:${jobId}`, { event, ...data });
  }
}

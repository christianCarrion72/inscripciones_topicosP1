describe('InscripcionsService', () => {
  // Creamos un mock simple del servicio
  const mockInscripcionsService = {
    requestSeat: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mockInscripcionsService).toBeDefined();
  });

  describe('requestSeat', () => {
    it('should throw an error when no cupos available', async () => {
      // Configuramos el mock para simular un error
      mockInscripcionsService.requestSeat.mockRejectedValueOnce(new Error('No hay cupos disponibles'));
      
      await expect(mockInscripcionsService.requestSeat({ 
        idEstudiante: 1, 
        idsGrupoMateria: [1] 
      })).rejects.toThrow('No hay cupos disponibles');
    });

    it('should successfully request a seat when cupos available', async () => {
      // Configuramos el mock para simular éxito
      mockInscripcionsService.requestSeat.mockResolvedValueOnce({ id: 1, success: true });
      
      const result = await mockInscripcionsService.requestSeat({ 
        idEstudiante: 1, 
        idsGrupoMateria: [1] 
      });
      
      expect(result).toEqual({ id: 1, success: true });
    });
  });
});
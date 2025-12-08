const DulceController = require('../controllers/dulces.controller');
const { Dulce } = require('../models');


jest.mock('../models', () => ({
  Dulce: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));


const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Pruebas unitarias del controlador de Dulces', () => {

  test('obtenerDulces debe devolver una lista de dulces', async () => {
    const req = {};
    const res = mockResponse();
    const dulcesMock = [{ id: 1, nombre: 'Bon Bon Bum' }];
    Dulce.findAll.mockResolvedValue(dulcesMock);

    await DulceController.obtenerDulces(req, res);

    expect(res.json).toHaveBeenCalledWith(dulcesMock);
    expect(Dulce.findAll).toHaveBeenCalledTimes(1);
  });

  test('obtenerDulcePorId debe devolver un dulce específico', async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const dulceMock = { id: 1, nombre: 'Chocorramo' };
    Dulce.findByPk.mockResolvedValue(dulceMock);

    await DulceController.obtenerDulcePorId(req, res);

    expect(res.json).toHaveBeenCalledWith(dulceMock);
  });

  test('obtenerDulcePorId debe devolver 404 si el dulce no existe', async () => {
    const req = { params: { id: 99 } };
    const res = mockResponse();
    Dulce.findByPk.mockResolvedValue(null);

    await DulceController.obtenerDulcePorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Dulce no encontrado' });
  });

  test('crearDulce debe crear un nuevo dulce', async () => {
    const req = { body: { nombre: 'Jet', precio: 1000 } };
    const res = mockResponse();
    const dulceMock = { id: 1, nombre: 'Jet', precio: 1000 };
    Dulce.create.mockResolvedValue(dulceMock);

    await DulceController.crearDulce(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(dulceMock);
  });

  test('crearDulce debe devolver error si ocurre un problema', async () => {
    const req = { body: {} };
    const res = mockResponse();
    Dulce.create.mockRejectedValue(new Error('Error al crear dulce'));

    await DulceController.crearDulce(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Error al crear dulce',
    }));
  });

});
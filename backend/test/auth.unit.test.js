const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');
const AuthController = require('../controllers/auth.controller');


const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


jest.mock('../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Pruebas unitarias del login', () => {
  afterEach(() => jest.clearAllMocks());

  test('Debe devolver 404 si el usuario no existe', async () => {
    const req = { body: { email: 'no@existe.com', password: '1234' } };
    const res = mockResponse();

    Usuario.findOne.mockResolvedValue(null);

    await AuthController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });

  test('Debe devolver 401 si la contraseña es incorrecta', async () => {
    const req = { body: { email: 'admin@dulzon.com', password: 'mala' } };
    const res = mockResponse();

    Usuario.findOne.mockResolvedValue({
      id: 1,
      nombre: 'Admin',
      email: 'admin@dulzon.com',
      password: 'hash123',
      rolId: 1,
      rol: { nombre: 'Administrador' },
    });

    bcrypt.compare.mockResolvedValue(false);

    await AuthController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Contraseña incorrecta' });
  });

  test('Debe devolver token y datos del usuario si el login es correcto', async () => {
    const req = { body: { email: 'admin@dulzon.com', password: '1234' } };
    const res = mockResponse();

    Usuario.findOne.mockResolvedValue({
      id: 1,
      nombre: 'Admin',
      email: 'admin@dulzon.com',
      password: 'hash123',
      rolId: 1,
      rol: { nombre: 'Administrador' },
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('');

    await AuthController.login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Login exitoso',
      token: '',
      usuario: {
        id: 1,
        nombre: 'Admin',
        email: 'admin@dulzon.com',
        rol: 'Administrador',
      },
    });
  });

  test('Debe devolver 500 si ocurre un error en el servidor', async () => {
    const req = { body: { email: 'error@server.com', password: '1234' } };
    const res = mockResponse();

    Usuario.findOne.mockRejectedValue(new Error('Error de conexión'));

    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Error en el servidor' })
    );
  });
});
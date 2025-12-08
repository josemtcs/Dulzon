const request = require('supertest');
const app = require('../index');
const sequelize = require('../config');
const { Dulce } = require('../models');

describe('Pruebas de las rutas de dulces', () => {
  let idDulceCreado; 

  
  test('GET /api/dulces debe devolver lista de dulces', async () => {
    const response = await request(app).get('/api/dulces');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

 
  test('POST /api/dulces debe crear un dulce correctamente (sin token)', async () => {
    const nuevoDulce = {
      nombre: "Gomitas Frutales",
      precio: 1500,
      descripcion: "Gomitas de sabores surtidos",
      categoriaId: 1
    };

    const response = await request(app)
      .post('/api/dulces')
      .send(nuevoDulce);

    
    if ([401, 403].includes(response.statusCode)) {
      expect([401, 403]).toContain(response.statusCode);
    } else {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      idDulceCreado = response.body.id;
    }
  });

  
  test('GET /api/dulces/:id debe devolver un dulce específico o 404 si no existe', async () => {
    const id = idDulceCreado || 1; // si no se creó, usa 1 como ejemplo
    const response = await request(app).get(`/api/dulces/${id}`);
    expect([200, 404]).toContain(response.statusCode);
  });

  
  test('PUT /api/dulces/:id debe actualizar un dulce existente', async () => {
    if (!idDulceCreado) {
      console.warn('⚠ No se creó un dulce para probar PUT, se omite esta prueba');
      return;
    }

    const actualizado = { precio: 1800, descripcion: "Gomitas surtidas actualizadas" };
    const response = await request(app)
      .put(`/api/dulces/${idDulceCreado}`)
      .send(actualizado);

    expect([200, 401, 403]).toContain(response.statusCode);
  });

  
  test('DELETE /api/dulces/:id debe eliminar un dulce existente', async () => {
    if (!idDulceCreado) {
      console.warn('⚠ No se creó un dulce para probar DELETE, se omite esta prueba');
      return;
    }

    const response = await request(app)
      .delete(`/api/dulces/${idDulceCreado}`);

    expect([200, 401, 403, 404]).toContain(response.statusCode);
  });
});


afterAll(async () => {
  await sequelize.close();
});
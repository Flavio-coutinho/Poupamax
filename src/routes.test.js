import request from 'supertest';
import { app } from './server-setup'

const server = app.listen()

describe('User routes',  () => {
  it('should return not found with wrong password', async () => {
    // Preparação
    const email = 'coutinho@gmail.com';
    const password = 'teste';

    // execução
    const result = await request(server).get('/login').auth(email, password)

    // Expectação
    expect(result.status).toBe(404)
  });

  it('should return not found with wrong email', async () => {
    // Preparação
    const email = 'errado@gmail.com';
    const password = '123456';

    // execução
    const result = await request(server).get('/login').auth(email, password)

    // Expectação
    expect(result.status).toBe(404)
  });

});

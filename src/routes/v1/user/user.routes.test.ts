import 'jest';
import supertest from 'supertest';
import {prisma} from '../../../helpers/prisma';
import sessionStore from '../../../helpers/sessionStore';
import app from '../../../index';

describe('Users routes', () => {
  jest.setTimeout(15000);
  let Cookies: string;
  afterAll(async () => {
    await prisma.$disconnect();
    await sessionStore.shutdown();
  });
  test('Debe crear un nuevo usuario', async () => {
    const res = await supertest(app).post('/apiv1/signIn').send({
      name: 's',
      username: 'fg',
      password: 's',
      email: 'asd@asd.com',
    });
    Cookies = res.headers['set-cookie'].pop().split(';')[0];
    expect(res.statusCode).toBe(201);
  });

  test('Debe deslogear el usuario creado', async () => {
    const a = supertest(app).delete('/apiv1/logOut');
    a.cookies = Cookies;
    const res = await a.send();
    expect(res.statusCode).toBe(200);
  });

  test('Debe logear con el usuario', async () => {
    const res = await supertest(app).post('/apiv1/logIn').send({
      username: 'fg',
      password: 's',
    });
    Cookies = res.headers['set-cookie'].pop().split(';')[0];
    expect(res.statusCode).toBe(200);
  });
  test('Debe borra el usuario creado', async () => {
    const a = supertest(app).delete('/apiv1/user/delete/');
    a.cookies = Cookies;
    const res = await a.send();
    expect(res.statusCode).toBe(200);
  });
});

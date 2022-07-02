import supertest from 'supertest';
import {prisma} from '../../../helpers/prisma';
import sessionStore from '../../../helpers/sessionStore';
import app from '../../../index';

describe('Rutas de amigos', () => {
  let Cookies: string;
  let Cookies2: string;
  // eslint-disable-next-line no-unused-vars
  let User: any;
  let User2: any;
  let request: any;
  beforeAll(async () => {
    const a = await supertest.agent(app).post('/apiv1/logIn').send({
      username: 'test',
      password: 'test',
    });
    Cookies = a.headers['set-cookie'].pop().split(';')[0];
    User = a.body.user;
    const b = await supertest.agent(app).post('/apiv1/logIn').send({
      username: 'test2',
      password: 'test2',
    });
    Cookies2 = b.headers['set-cookie'].pop().split(';')[0];
    User2 = b.body.user;
  });
  afterAll(async () => {
    const a = supertest.agent(app).delete('/apiv1/logOut');
    a.cookies = Cookies;
    await a.send();
    a.cookies = Cookies2;
    await a.send();
    await prisma.$disconnect();
    await sessionStore.shutdown();
  });
  test('Debe enviar la solicitud', async () => {
    const a = supertest.agent(app).post('/apiv1/friend/');
    a.cookies = Cookies;
    const result = await a.send({
      friendid: User2.id,
    });
    request = result.body.friend;
    if (result.statusCode === 400) console.log(result.body);
    expect(result.statusCode).toBe(201);
  });
  test('Debe aceptar la solicitud', async () => {
    const a = supertest.agent(app).post('/apiv1/friend/');
    a.cookies = Cookies2;
    const result = await a.send({
      reqid: request.id,
    });
    expect(result.statusCode).toBe(201);
  });
});

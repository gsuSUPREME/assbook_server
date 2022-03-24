import supertest from "supertest";
import app from "../../..";
import { prisma } from "../../../helpers/prisma";
import sessionStore from "../../../helpers/sessionStore";

describe("Pruebas de autorización", () => {
  var Cookies: any;
  afterAll(async () => {
    await prisma.$disconnect();
    await sessionStore.shutdown();
  });
  test("Debe no poder acceder a ruta protegida sin autorización", async () => {
    const result = await supertest(app).get("/apiv1/post/");
    expect(result.statusCode).toBe(401);
  });

  test("Debe logear exitosamente", async () => {
    const a = await supertest.agent(app).post("/apiv1/logIn").send({
      username: "test",
      password: "test",
    });
    Cookies = a.headers["set-cookie"].pop().split(";")[0];
    expect(a.statusCode).toBe(200);
  });

  test("Debe acceder a la ruta protegida estando logeado", async () => {
    const a = supertest.agent(app).get("/apiv1/post/");
    a.cookies = Cookies;
    const result = await a.send();
    expect(result.statusCode).toBe(200);
  });

  test("Debe cerrar sesión", async () => {
    const a = supertest.agent(app).delete("/apiv1/logOut");
    a.cookies = Cookies;
    const result = await a.send();
    expect(result.statusCode).toBe(200);
  });
});

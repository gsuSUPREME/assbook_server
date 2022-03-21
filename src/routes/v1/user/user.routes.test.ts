import "jest";
import request from "supertest";
import app from "../index";

describe("Users routes", () => {
  jest.setTimeout(15000);
  test("Debe crear un nuevo usuario", async () => {
    const res = await request(app).post("/apiv1/signIn").send({
      name: "s",
      username: "fg",
      password: "s",
      email: "asd@asd.com",
    });
    expect(res.statusCode).toBe(201);
  });

  test("Debe logear con el usuario", async () => {
    const res = await request(app).post("/apiv1/logIn").send({
      username: "fg",
      password: "s",
    });
    expect(res.statusCode).toBe(200);
  });
  test("Debe borra el usuario creado", async () => {
    const res = await request(app)
      .delete("/apiv1/delete")
      .send({ username: "fg" });
    expect(res.statusCode).toBe(200);
  });
});

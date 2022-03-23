import supertest from "supertest";
import app from "../../../index";

describe("Post routes", () => {
  let post: any;
  let reaction: any;
  var Cookies: string;
  var Cookies2: string;
  beforeAll(async () => {
    const a = await supertest.agent(app).post("/apiv1/logIn").send({
      username: "test",
      password: "test",
    });
    Cookies = a.headers["set-cookie"].pop().split(";")[0];
  });
  afterAll(async () => {
    const a = supertest(app).delete("/apiv1/logOut");
    a.cookies = Cookies;
    await a.send();
  });
  test("Debe crear un nuevo post", async () => {
    const a = supertest(app).post("/apiv1/post/");
    a.cookies = Cookies;
    const result = await a.send({
      title: "a",
      content: "asdadsasd",
    });
    post = result.body.post;
    expect(result.statusCode).toBe(201);
  });

  test("Debe no dejar reaccionar a su propio post", async () => {
    const a = supertest(app).post("/apiv1/post/reaction/");
    a.cookies = Cookies;
    const result = await a.send({
      postid: post.id,
      reactionType: "like",
    });
    expect(result.statusCode).toBe(400);
  });

  test("Debe dejar reaccionar desde otro usuario", async () => {
    const a1 = await supertest.agent(app).post("/apiv1/logIn").send({
      username: "test2",
      password: "test2",
    });
    Cookies2 = a1.headers["set-cookie"].pop().split(";")[0];
    const a = supertest(app).post("/apiv1/post/reaction/");
    a.cookies = Cookies2;
    const result = await a.send({
      postid: post.id,
      reactionType: "like",
    });
    reaction = result.body.reaction;
    expect(result.statusCode).toBe(201);
  });

  test("Debe cargar los posts", async () => {
    const a = supertest(app).get("/apiv1/post/");
    a.cookies = Cookies;
    const result = await a.send();
    expect(result.statusCode).toBe(200);
  });
  test("Debe actualizar el post", async () => {
    const a = supertest(app).patch("/apiv1/post/");
    a.cookies = Cookies;
    const result = await a.send({
      title: "b",
      content: "bcbcbcbc",
      postid: post.id,
    });
    expect(result.statusCode).toBe(200);
  });
  test("Debe actualizar la reacción", async () => {
    const a = supertest(app).patch("/apiv1/post/reaction/");
    a.cookies = Cookies2;
    const result = await a.send({
      reactionid: reaction.id,
      reactionType: "heart",
    });
    expect(result.statusCode).toBe(200);
  });
  test("Debe borrar el post", async () => {
    const a = supertest(app).delete("/apiv1/post/");
    a.cookies = Cookies;
    const result = await a.send({
      postid: post.id,
    });
    expect(result.statusCode).toBe(200);
  });
});

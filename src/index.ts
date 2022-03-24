import express from "express";
import ApiV1Routes from "./routes/v1/index.routes";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import PrismaSessionStore from "./helpers/sessionStore";
import { prisma } from "./helpers/prisma";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
const session = sessions({
  secret: process.env.TOKEN_SECRET || "xd",
  saveUninitialized: true,
  cookie: { maxAge: oneDay, secure: "auto" },
  resave: false,
  store: PrismaSessionStore,
});
app.use(session);

app.on("exit", async () => {
  await prisma.$disconnect();
  await PrismaSessionStore.shutdown();
});

app.use("/apiv1", ApiV1Routes);

export default app;

import express from "express";
import ApiV1Routes from "./routes/v1/index.routes";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./helpers/prisma";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.TOKEN_SECRET || "xd",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, secure: "auto" },
    resave: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/apiv1", ApiV1Routes);

export default app;

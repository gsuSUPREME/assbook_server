import { Router } from "express";
import type { Request, Response } from "express";
import UserController from "../../../controllers/UserController";
import {
  UserError,
  UserState,
  UserSuccessfull,
} from "../../../helpers/models/User_Model";
import AuthHelper from "../../../helpers/auth";
const router = Router();

router.use(AuthHelper);

router.get("/", async (req: Request, res: Response) => {
  const result: UserState = await UserController.getUser(req.session.userid!);
  if (result instanceof UserError)
    return res.status(400).json({ error: result.error });
  if (result instanceof UserSuccessfull)
    return res.status(200).json({ user: result.user });
  else
    return res
      .status(500)
      .json({ error: "Hubo un error en el servidor, puta" });
});

router.delete("/delete", async (req: Request, res: Response) => {
  const { username } = req.body;
  const a: UserState = await UserController.deleteUser(username);
  if (a instanceof UserError) return res.status(400).json({ error: a.error });
  if (a instanceof UserSuccessfull) {
    req.session.destroy(() => {});
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: a.user });
  }
});

export default router;

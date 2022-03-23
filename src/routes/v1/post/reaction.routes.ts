import { Router } from "express";
import type { Request, Response } from "express";
import ReactionController from "../../../controllers/ReactionController";
import {
  ReactionError,
  ReactionState,
  ReactionSuccessfull,
} from "../../../helpers/models/ReactionState";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { userid } = req.session;
  const { postid, reactionType } = req.body;
  const response: ReactionState = await ReactionController.addReaction(
    userid!,
    parseInt(postid),
    reactionType
  );
  if (response instanceof ReactionError)
    return res.status(400).json({ error: response.error });
  if (response instanceof ReactionSuccessfull)
    return res.status(201).json({ reaction: response.reaction });
  return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
});

router.patch("/", async (req: Request, res: Response) => {
  const { userid } = req.session;
  const { reactionid, reactionType } = req.body;
  const response: ReactionState = await ReactionController.UpdateReaction(
    parseInt(reactionid),
    userid!,
    reactionType
  );
  if (response instanceof ReactionError)
    return res.status(400).json({ error: response.error });
  if (response instanceof ReactionSuccessfull)
    return res.status(200).json({ reaction: response.reaction });
  return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
});

router.delete("/", async (req: Request, res: Response) => {
  const { userid } = req.session;
  const { reactionid } = req.body;
  const response: ReactionState = await ReactionController.removeReaction(
    parseInt(reactionid),
    userid!
  );
  if (response instanceof ReactionError)
    return res.status(400).json({ error: response.error });
  if (response instanceof ReactionSuccessfull)
    return res.status(200).json({ reaction: response.reaction });
  return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
});

export default router;

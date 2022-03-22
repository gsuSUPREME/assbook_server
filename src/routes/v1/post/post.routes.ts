import { Router } from "express";
import type { Request, Response } from "express";
import PostController from "../../../controllers/PostController";
import { PostError, PostSuccessfull } from "../../../helpers/models/PostState";
import AuthHelper from "../../../helpers/auth";

const router = Router();

router.use(AuthHelper);

router.get("/", async (req: Request, res: Response) => {
  const result = await PostController.fetchPosts(req.session.userid!);
  if (result instanceof PostError)
    return res.status(400).json({ error: result.error });
  if (result instanceof PostSuccessfull)
    return res.status(200).json({ posts: result.posts });
  else
    return res.status(500).json({
      error:
        "ha ocurrido un error en el servidor, gnial lo bugueaste con tu xiaomi",
    });
});

router.post("/", async (req: Request, res: Response) => {
  const result = await PostController.createPost({
    userid: req.session.userid!,
    content: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  if (result instanceof PostError)
    return res.status(400).json({ error: result.error });
  if (result instanceof PostSuccessfull)
    return res.status(201).json({ post: result.post });
  else
    return res.status(500).json({
      error:
        "ha ocurrido un error en el servidor, gnial lo bugueaste con tu xiaomi",
    });
});

router.patch("/", async (req: Request, res: Response) => {
  const result = await PostController.updatePost(req.body.postid, {
    title: req.body.title,
    content: req.body.content,
  });
  if (result instanceof PostError)
    return res.status(400).json({ error: result.error });
  if (result instanceof PostSuccessfull)
    return res.status(200).json({ post: result.post });
  else
    return res.status(500).json({
      error:
        "ha ocurrido un error en el servidor, gnial lo bugueaste con tu xiaomi",
    });
});
router.delete("/", async (req: Request, res: Response) => {
  const result = await PostController.deletePost(req.body.postid);
  if (result instanceof PostError)
    return res.status(400).json({ error: result.error });
  if (result instanceof PostSuccessfull)
    return res.status(200).json({ post: result.post });
  else
    return res.status(500).json({
      error:
        "ha ocurrido un error en el servidor, gnial lo bugueaste con tu xiaomi",
    });
});

export default router;

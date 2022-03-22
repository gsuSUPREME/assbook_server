import { Router } from "express";
import UserRoutes from "./user/user.routes";
import PostRoutes from "./post/post.routes";
import AuthRoutes from "./auth/auth.routes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/post", PostRoutes);
router.use("", AuthRoutes);
export default router;

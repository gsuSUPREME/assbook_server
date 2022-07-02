import {Router as expressRouter} from 'express';
import UserRoutes from './user/user.routes';
import PostRoutes from './post/post.routes';
import AuthRoutes from './auth/auth.routes';
import FriendRoutes from './friends/friends.routes';

const router = expressRouter();

router.use('/user', UserRoutes);
router.use('/post', PostRoutes);
router.use('', AuthRoutes);
router.use('/friend', FriendRoutes);
export default router;

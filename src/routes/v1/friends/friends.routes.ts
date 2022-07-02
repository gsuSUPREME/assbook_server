import {Router as expressRouter} from 'express';
import type {Request, Response} from 'express';
import FriendsController from '../../../controllers/FriendsController';
import {FriendError,
  FriendState,
  FriendSuccessfull} from '../../../helpers/models/FriendState';

const router = expressRouter();

router.get('/', async (req: Request, res: Response) => {
  const {userid} = req.session;
  const {request} = req.query;
  let result: FriendState;
  if (request) {
    result = await FriendsController.getFriendsRequest({userid: userid!});
  } else {
    result = await FriendsController.getFriends({userid: userid!});
  }
  if (result instanceof FriendSuccessfull) {
    return res.json({friends: result.request});
  };
  if (result instanceof FriendError) {
    return res.status(400).json({error: result.error});
  };
  return res.status(400).json({error: 'lo bugeaste'});
});

router.post('/', async (req: Request, res: Response) => {
  const {userid} = req.session;
  const {friendid} = req.body;
  const result = await FriendsController.
      addFriend({userid: userid!, friendid: friendid});
  if (result instanceof FriendSuccessfull) {
    return res.status(201).json({friend: result.request});
  };
  if (result instanceof FriendError) {
    return res.status(400).json({error: result.error});
  };
  return res.status(400).json({error: 'lo bugeaste'});
});

router.delete('/', async (req: Request, res: Response) => {
  const {userid} = req.session;
  const {reqid} = req.body;
  const result = await FriendsController.deleteFriend({
    reqid: reqid!,
    userid: userid!,
  });
  if (result instanceof FriendSuccessfull) {
    return res.json({friend: result.request});
  };
  if (result instanceof FriendError) {
    return res.status(400).json({error: result.error});
  };
  return res.status(400).json({error: 'lo bugeaste'});
});

router.patch('/', async (req: Request, res: Response) => {
  const {userid} = req.session;
  const {reqid} = req.body;
  const result = await FriendsController.acceptFriend({
    reqid: reqid!, userid: userid!,
  });
  if (result instanceof FriendSuccessfull) {
    return res.json({friend: result.request});
  };
  if (result instanceof FriendError) {
    return res.status(400).json({error: result.error});
  };
  return res.status(400).json({error: 'lo bugeaste'});
});

export default router;

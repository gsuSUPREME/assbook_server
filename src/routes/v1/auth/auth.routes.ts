import {Router as expressRouter, Request, Response} from 'express';
import UserController from '../../../controllers/UserController';
import {
  UserState,
  UserError,
  UserSuccessfull,
} from '../../../helpers/models/User_Model';

const router = expressRouter();

router.post('/logIn', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  const result: UserState = await UserController.logInUser({
    username,
    password,
  });
  if (result instanceof UserError) {
    return res.status(401).json({error: result.error});
  }
  if (result instanceof UserSuccessfull) {
    req.session.userid = result.user.id;
    return res.status(200).json({user: result.user});
  } else {
    return res
        .status(500)
        .json({error: 'Ha ocurrido un error en el servidor'});
  }
});

router.post('/signIn', async (req: Request, res: Response) => {
  const {email, name, password, bio, phone, username} = req.body;
  const result: UserState = await UserController.createUser({
    email,
    name,
    password,
    bio,
    phone,
    username,
  });
  if (result instanceof UserError) {
    return res.status(400).json({error: result.error});
  }
  if (result instanceof UserSuccessfull) {
    req.session.userid = result.user.id;
    return res.status(201).json({user: result.user});
  } else {
    res.status(500).json({error: 'Ha ocurrido un error en el servidor'});
  }
});

router.delete('/logOut', async (req: Request, res: Response) => {
  if (!req.session) {
    return res.status(401).json({error: 'Debes iniciar sesion para acceder'});
  }
  req.session.destroy(() => {});
  return res.status(200).json({message: 'Sesion cerrada'});
});
export default router;

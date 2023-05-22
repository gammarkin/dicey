import {Router} from 'express';

import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

const router = Router();

router.get('/:tag/:code', (req, res) => userController.findOne(req, res));

export default router;

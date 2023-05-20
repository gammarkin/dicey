import {Router} from 'express';

import CharacterController from '../controllers/User';
import CharacterService from '../services/User';
import CharacterModel from '../models/User';

import ValidateUser from '../middlewares/validateUser';

const router = Router();

const charModel = new CharacterModel();
const charService = new CharacterService(charModel);
const charController = new CharacterController(charService);

router.get('/', (req, res) => charController.findAll(req, res));

router.post(
	'/',
	ValidateUser.validateTag,
	ValidateUser.validatePass,
	(req, res) => charController.create(req, res)
);

router.put(
	'/:tag',
	ValidateUser.validateTag,
	ValidateUser.validatePass,
	(req, res) => charController.update(req, res)
);

router.delete(
	'/:tag',
	ValidateUser.validateTag,
	ValidateUser.validatePass,
	(req, res) => charController.destroy(req, res)
);

export default router;

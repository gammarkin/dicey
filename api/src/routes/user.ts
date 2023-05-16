import {Router} from 'express';

import CharacterController from '../controllers/User';
import CharacterService from '../services/User';
import CharacterModel from '../models/User';

import ValidatePost from '../middlewares/validatePost';
import ValidatePut from '../middlewares/validatePut';
import ValidateIfCharExists from '../middlewares/validateIfCharExists';

const router = Router();

const charModel = new CharacterModel();
const charService = new CharacterService(charModel);
const charController = new CharacterController(charService);

router.get('/', (req, res) => charController.findAll(req, res));

router.post('/', (req, res) => charController.create(req, res));

router.put(
	'/:playerTag',
	ValidatePut.validateBody,
	ValidatePut.validatePlayerTag,
	ValidatePut.validateCharacterName,
	ValidatePut.validateSkills,
	ValidatePut.validateAttributes,
	ValidatePut.validateWeapons,
	(req, res) => charController.update(req, res)
);

router.delete('/:tag', (req, res) => charController.destroy(req, res));

export default router;

import {Router} from 'express';

import CharacterController from '../controllers/Character';
import CharacterService from '../services/Character';
import CharacterModel from '../models/Character';

import ValidatePost from '../middlewares/validatePost';
import ValidatePut from '../middlewares/validatePut';
import ValidateIfCharExists from '../middlewares/validateIfCharExists';

const router = Router();

const charModel = new CharacterModel();
const charService = new CharacterService(charModel);
const charController = new CharacterController(charService);

const charValidation = new ValidateIfCharExists(charService);

router.get('/', (req, res) => charController.findAll(req, res));
router.get('/seed', (req, res) => charController.destroyAndSeed(req, res));
router.get('/:playerTag', (req, res) =>
	charController.findByPlayerTag(req, res)
);

router.post(
	'/',
	ValidatePost.validateId,
	ValidatePost.validatePlayerTag,
	ValidatePost.validateCharacterName,
	ValidatePost.validateSkills,
	ValidatePost.validateAttributes,
	(req, res) => charController.create(req, res)
);

router.put(
	'/:playerTag',
	ValidatePut.validateBody,
	ValidatePut.validatePlayerTag,
	ValidatePut.validateCharacterName,
	ValidatePut.validateSkills,
	ValidatePut.validateAttributes,
	ValidatePut.validateWeapons,
	(req, res, next) => charValidation.validateIfCharacterExists(req, res, next),
	(req, res) => charController.update(req, res)
);

router.delete(
	'/:playerTag',
	(req, res, next) => charValidation.validateIfCharacterExists(req, res, next),
	(req, res) => charController.destroy(req, res)
);

router.delete('/', (req, res) => charController.destroyAndSeed(req, res));

export default router;

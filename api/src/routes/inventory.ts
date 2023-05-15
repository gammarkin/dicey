import {Router} from 'express';

import InventoryController from '../controllers/Inventory';
import InventoryService from '../services/Inventory';
import InventoryModel from '../models/Inventory';

import ValidatePost from '../middlewares/validatePost';
import ValidatePut from '../middlewares/validatePut';

const router = Router();

const inventoryModel = new InventoryModel();
const inventoryService = new InventoryService(inventoryModel);
const inventoryController = new InventoryController(inventoryService);

router.get('/', (req, res) => inventoryController.findAll(req, res));

router.post(
	'/',
	ValidatePost.validateAttributes,
	ValidatePost.validateSkills,
	ValidatePost.validateWeapons,
	(req, res) => inventoryController.create(req, res)
);

router.put(
	'/:name',
	ValidatePut.validateBody,
	ValidatePut.validateAttributes,
	ValidatePut.validateSkills,
	ValidatePut.validateWeapons,
	(req, res) => inventoryController.update(req, res)
);

router.delete('/:name', (req, res) => inventoryController.destroy(req, res));

export default router;

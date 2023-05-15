import {model as mongooseCreateModel, Schema} from 'mongoose';
import MongoModel from './MongoModel';
import InventoryInterface from '../interfaces/Inventory';

const inventoryMongooseSchema = new Schema<InventoryInterface>(
	{
		name: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: false,
		},

		description: {
			type: String,
			required: false,
		},
	},
	{versionKey: false}
);

class Inventory extends MongoModel<InventoryInterface> {
	constructor(
		model = mongooseCreateModel('Inventory', inventoryMongooseSchema)
	) {
		super(model);
	}
}

export default Inventory;

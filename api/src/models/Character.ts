import {model as mongooseCreateModel, Schema} from 'mongoose';
import MongoModel from './MongoModel';
import IChar from '../interfaces/IChar';

const CharMongooseSchema = new Schema<IChar>(
	{
		id: {
			type: Number,
			required: true,
		},
		playerTag: {
			type: String,
			required: true,
		},
		characterName: {
			type: String,
			required: true,
		},
		skills: {
			type: Array,
			required: true,
		},
		attributes: {
			type: Array,
			required: true,
		},
		weapons: {
			type: Array,
			required: true,
		},
	},
	{versionKey: false}
);

class Char extends MongoModel<IChar> {
	constructor(model = mongooseCreateModel('Characters', CharMongooseSchema)) {
		super(model);
	}
}

export default Char;

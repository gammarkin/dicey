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
			type: [
				{
					name: String,
					value: Number,
				},
			],
			required: true,
		},
		attributes: {
			type: [
				{
					name: String,
					value: Number,
				},
			],
			required: true,
		},
		weapons: {
			type: [
				{
					name: String,
					critical: String,
					damageDice: String,
					damageType: String,
					weapon_type: String,
				},
			],
			required: true,
		},
		dmTag: {
			type: String,
			required: false,
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

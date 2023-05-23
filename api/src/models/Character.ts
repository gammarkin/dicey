import {model as mongooseCreateModel, Schema} from 'mongoose';
import MongoModel from './MongoModel';
import IChar from '../interfaces/IChar';

const CharMongooseSchema = new Schema<IChar>(
	{
		playerTag: {
			type: String,
			required: true,
		},
		characterName: {
			type: String,
			required: true,
		},
		dmTag: {
			type: String,
			required: false,
		},
		origin: {
			type: String,
			required: false,
		},
		characterClass: {
			type: String,
			required: false,
		},
		nex: {
			type: String,
			required: false,
		},
		movement: {
			type: String,
			required: false,
		},
		pv: {
			type: String,
			required: false,
		},
		pe: {
			type: String,
			required: false,
		},
		pvMax: {
			type: String,
			required: false,
		},
		peMax: {
			type: String,
			required: false,
		},
		defense: {
			type: String,
			required: false,
		},
		sanity: {
			type: String,
			required: false,
		},
		protection: {
			type: String,
			required: false,
		},
		resistance: {
			type: String,
			required: false,
		},
		skills: {
			type: [],
			required: true,
		},
		attributes: {
			type: [],
			required: true,
		},
		weapons: {
			type: [],
			required: true,
		},
		attacks: {
			type: [],
			required: false,
		},
		habilities: {
			type: [],
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

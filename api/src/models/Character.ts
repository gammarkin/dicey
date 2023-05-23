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
			type: Number,
			required: false,
		},
		pe: {
			type: Number,
			required: false,
		},
		pvMax: {
			type: Number,
			required: false,
		},
		peMax: {
			type: Number,
			required: false,
		},
		defense: {
			type: Number,
			required: false,
		},
		sanity: {
			type: Number,
			required: false,
		},
		protection: {
			type: Number,
			required: false,
		},
		resistance: {
			type: Number,
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

import {Model, UpdateQuery} from 'mongoose';
import IModel from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
	protected _model: Model<T>;

	constructor(model: Model<T>) {
		this._model = model;
	}

	public async create(obj: T): Promise<T> {
		return this._model.create({...obj});
	}

	public async readOne(playerTag: string): Promise<T | null> {
		return this._model.findOne({playerTag});
	}

	public async read(): Promise<T[]> {
		return this._model.find({});
	}

	public async update(playerTag: string, obj: Partial<T>): Promise<T | null> {
		return this._model.findOneAndUpdate(
			{playerTag},
			{...obj} as UpdateQuery<T>,
			{
				new: true,
			}
		);
	}

	public async delete(playerTag: string): Promise<void> {
		await this._model.deleteOne({playerTag});
	}

	public async createMany(obj: T[]): Promise<T[]> {
		return this._model.insertMany(obj);
	}

	public async deleteAll(): Promise<void> {
		await this._model.deleteMany({});
	}
}

export default MongoModel;

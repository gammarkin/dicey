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

	public async readOne(item: {}): Promise<T | null> {
		return this._model.findOne(item as {});
	}

	public async read(): Promise<T[]> {
		return this._model.find({});
	}

	public async update(item: {}, obj: Partial<T>): Promise<T | null> {
		return this._model.findOneAndUpdate(
			item as {},
			{...obj} as UpdateQuery<T>,
			{
				new: true,
			}
		);
	}

	public async delete(item: {}): Promise<void> {
		await this._model.deleteOne(item as {});
	}

	public async createMany(obj: T[]): Promise<T[]> {
		return this._model.insertMany(obj);
	}

	public async deleteAll(): Promise<void> {
		await this._model.deleteMany({});
	}
}

export default MongoModel;

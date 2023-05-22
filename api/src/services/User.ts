import IModel from '../interfaces/IModel';
import {IService} from '../interfaces/IService';
import IUser from '../interfaces/IUser';

class InventoryService implements IService<IUser> {
	private _inventory: IModel<IUser>;

	constructor(model: IModel<IUser>) {
		this._inventory = model;
	}

	public async create(item: IUser): Promise<IUser> {
		return this._inventory.create(item);
	}

	public async findAll(): Promise<IUser[]> {
		return this._inventory.read();
	}

	public async findOne(tag: {}): Promise<IUser | null> {
		return this._inventory.readOne({tag});
	}

	public async updateOne(tag: {}, item: IUser): Promise<IUser | null> {
		return this._inventory.update({tag}, item);
	}

	public async destroy(tag: {}): Promise<void> {
		await this._inventory.delete({tag});
	}
}

export default InventoryService;

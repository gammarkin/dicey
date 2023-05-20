import IModel from '../interfaces/IModel';
import {IService} from '../interfaces/IService';
import IUser from '../interfaces/IUser';
import {hash} from 'bcrypt';

class InventoryService implements IService<IUser> {
	private _inventory: IModel<IUser>;

	constructor(model: IModel<IUser>) {
		this._inventory = model;
	}

	public async create(item: IUser): Promise<IUser> {
		item.code = await hash(item.code, 10);

		return this._inventory.create(item);
	}

	public async findAll(): Promise<IUser[]> {
		return this._inventory.read();
	}

	public async updateOne(name: string, item: IUser): Promise<IUser | null> {
		return this._inventory.update(name, item);
	}

	public async destroy(name: string): Promise<void> {
		await this._inventory.delete(name);
	}
}

export default InventoryService;

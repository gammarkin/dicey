import IModel from '../interfaces/IModel';
import {IService} from '../interfaces/IService';
import InventoryInterface from '../interfaces/Inventory';

class InventoryService implements IService<InventoryInterface> {
	private _inventory: IModel<InventoryInterface>;

	constructor(model: IModel<InventoryInterface>) {
		this._inventory = model;
	}

	public async create(
		item: InventoryInterface | InventoryInterface[]
	): Promise<InventoryInterface> {
		return this._inventory.create(item);
	}

	public async findAll(): Promise<InventoryInterface[]> {
		return this._inventory.read();
	}

	public async updateOne(
		name: string,
		item: InventoryInterface
	): Promise<InventoryInterface | null> {
		return this._inventory.update({name}, item);
	}

	public async destroy(name: string): Promise<void> {
		await this._inventory.delete({name});
	}
}

export default InventoryService;

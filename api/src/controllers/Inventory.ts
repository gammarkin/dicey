import {Request, Response} from 'express';

import InventoryInterface from '../interfaces/Inventory';
import {IService} from '../interfaces/IService';

const OBJECT_NOT_FOUND = 'Object not found';

export default class CharController {
	constructor(private _service: IService<InventoryInterface>) {}

	public async create(req: Request, res: Response<InventoryInterface>) {
		const results = await this._service.create(req.body);

		return res.status(201).json(results);
	}

	public async findAll(_req: Request, res: Response<InventoryInterface[]>) {
		const results = await this._service.findAll();

		return res.status(200).json(results);
	}

	public async update(
		req: Request,
		res: Response<InventoryInterface | Record<string, string>>
	) {
		const {name} = req.params;

		const results = await this._service.updateOne(name, req.body);

		if (!results) {
			return res.status(404).json({error: OBJECT_NOT_FOUND});
		}

		return res.status(200).json(results);
	}

	public async destroy(req: Request, res: Response<InventoryInterface>) {
		const {name} = req.params;

		await this._service.destroy(name);

		return res.status(204).end();
	}
}

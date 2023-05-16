import {Request, Response} from 'express';

import IUser from '../interfaces/IUser';
import {IService} from '../interfaces/IService';

const OBJECT_NOT_FOUND = 'Object not found';

export default class CharController {
	constructor(private _service: IService<IUser>) {}

	public async create(req: Request, res: Response<IUser>) {
		const results = await this._service.create(req.body);

		return res.status(201).json(results);
	}

	public async findAll(_req: Request, res: Response<IUser[]>) {
		const results = await this._service.findAll();

		return res.status(200).json(results);
	}

	public async update(
		req: Request,
		res: Response<IUser | Record<string, string>>
	) {
		const {tag} = req.params;

		const results = await this._service.updateOne(tag, req.body);

		if (!results) {
			return res.status(404).json({error: OBJECT_NOT_FOUND});
		}

		return res.status(200).json(results);
	}

	public async destroy(req: Request, res: Response<IUser>) {
		const {tag} = req.params;

		await this._service.destroy(tag);

		return res.status(204).end();
	}
}

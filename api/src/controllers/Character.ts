import {Request, Response} from 'express';

import ICharacter from '../interfaces/IChar';
import IService from '../interfaces/IService';

const OBJECT_NOT_FOUND = 'Object not found';

export default class CharController {
	constructor(private _service: IService<ICharacter>) {}

	public async create(req: Request, res: Response<ICharacter>) {
		const results = await this._service.create(req.body);

		return res.status(201).json(results);
	}

	public async findAll(_req: Request, res: Response<ICharacter[]>) {
		const results = await this._service.findAll();

		return res.status(200).json(results);
	}

	public async findByPlayerTag(
		req: Request,
		res: Response<ICharacter | Record<string, string>>
	) {
		const {playerTag} = req.params;

		const results = await this._service.findByPlayerTag(playerTag);

		if (!results) {
			return res.status(404).json({error: OBJECT_NOT_FOUND});
		}

		return res.status(200).json(results);
	}

	public async update(
		req: Request,
		res: Response<ICharacter | Record<string, string>>
	) {
		const {playerTag} = req.params;

		const results = await this._service.updateOne(playerTag, req.body);

		if (!results) {
			return res.status(404).json({error: OBJECT_NOT_FOUND});
		}

		return res.status(200).json(results);
	}

	public async destroy(req: Request, res: Response<ICharacter>) {
		const {playerTag} = req.params;

		await this._service.destroy(playerTag);

		return res.status(204).end();
	}

	public async destroyAndSeed(_req: Request, res: Response<ICharacter[]>) {
		const seeds = await this._service.destroyAndSeed();

		return res.status(200).json(seeds);
	}
}

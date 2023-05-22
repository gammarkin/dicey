import {Request, Response} from 'express';

import IUser from '../interfaces/IUser';
import {IUserService} from '../interfaces/IService';

import {hash, verify} from 'argon2';

const OBJECT_NOT_FOUND = 'Object not found';

export default class CharController {
	constructor(private _service: IUserService<IUser>) {}

	public async create(req: Request, res: Response<IUser>) {
		req.body.code = await hash(req.body.code);

		const results = await this._service.create(req.body);

		results.code = '';

		return res.status(201).json(results);
	}

	public async findOne(req: Request, res: Response<IUser>) {
		const {tag, code} = req.params;

		const results = (await this._service.findOne(tag)) || undefined;

		if (!results) {
			return res.status(404).json({code: 'error! user not found'} as IUser);
		}

		if (!(await verify(results.code, code))) {
			return res.status(404).json({
				code: 'error! password incorrect',
			} as IUser);
		}

		results.code = '';

		return res.status(200).json(results);
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

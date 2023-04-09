import {Request, Response, NextFunction} from 'express';
import IChar from '../interfaces/IChar';
import IService from '../interfaces/IService';

export default class ValidateIfCharResists {
	constructor(private _char: IService<IChar>) {}

	public async validateIfCharacterExists(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const {playerTag} = req.params;

		const character = await this._char.findByPlayerTag(playerTag);

		if (!character) {
			return res.status(404).json({error: 'character was not found'});
		}

		next();
	}
}

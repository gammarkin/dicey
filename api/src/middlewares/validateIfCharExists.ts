import {Request, Response, NextFunction} from 'express';
import {CharServiceInterface} from '../interfaces/IService';
import IChar from '../interfaces/IChar';

export default class ValidateIfCharResists {
	constructor(private _char: CharServiceInterface<IChar>) {}

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

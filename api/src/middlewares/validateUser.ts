import {Request, Response, NextFunction} from 'express';

export default class ValidatePost {
	static validateTag(req: Request, res: Response, next: NextFunction) {
		const {
			body: {tag},
		} = req;

		if (!tag) {
			return res.status(400).json({message: 'tag is required'});
		}

		next();
	}

	static validatePass(req: Request, res: Response, next: NextFunction) {
		const {
			body: {code},
		} = req;

		if (!code) {
			return res.status(400).json({message: 'code is required'});
		}

		next();
	}
}

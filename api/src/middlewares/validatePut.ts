import {Request, Response, NextFunction} from 'express';

export default class ValidatePut {
	static validateBody(req: Request, res: Response, next: NextFunction) {
		const {body} = req;

		if (Object.keys(body).length === 0) {
			return res.status(400).json({message: 'Body is required'});
		}

		next();

		if (
			!body.playerTag &&
			!body.characterName &&
			!body.skills &&
			!body.attributes &&
			!body.id &&
			!body.weapons
		) {
			return res.status(400).json({message: 'Body is invalid'});
		}
	}

	static validatePlayerTag(req: Request, res: Response, next: NextFunction) {
		const playerTag = req.body.playerTag;

		if (playerTag && typeof playerTag !== 'string') {
			return res.status(400).json({message: 'Key playerTag must be a string'});
		}

		next();
	}

	static validateCharacterName(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const characterName = req.body.characterName;

		if (characterName && typeof characterName !== 'string') {
			return res
				.status(400)
				.json({message: 'Key characterName must be a string'});
		}

		next();
	}

	static validateSkills(req: Request, res: Response, next: NextFunction) {
		const skills = req.body.skills;

		if (skills) {
			if (typeof skills !== 'object' || Array.isArray(skills)) {
				return res.status(400).json({message: 'Key skills must be an object'});
			}

			if (Object.keys(skills).length !== 5) {
				return res.status(400).json({message: 'Key skills must have 5 keys'});
			}
		}
		next();
	}

	static validateAttributes(req: Request, res: Response, next: NextFunction) {
		const attributes = req.body.attributes;

		if (attributes) {
			if (typeof attributes !== 'object' || Array.isArray(attributes)) {
				return res
					.status(400)
					.json({message: 'Key attributes must be an object'});
			}

			if (Object.keys(attributes).length !== 28) {
				return res
					.status(400)
					.json({message: 'Key attributes must have 5 keys'});
			}
		}
		next();
	}

	static validateWeapons(req: Request, res: Response, next: NextFunction) {
		const weapons = req.body.weapons;

		if (weapons) {
			if (!Array.isArray(weapons)) {
				return res.status(400).json({message: 'Key weapons must be an array'});
			}

			if (weapons.length === 0) {
				return res
					.status(400)
					.json({message: 'Key weapons must have at least 1 weapon'});
			}

			weapons.forEach((weapon: any) => {
				if (typeof weapon !== 'object' || Array.isArray(weapon)) {
					return res
						.status(400)
						.json({message: 'Key weapons must be an array of objects'});
				}

				if (Object.keys(weapon).length !== 5) {
					return res
						.status(400)
						.json({message: 'Key weapons must have 5 keys'});
				}

				if (!weapon.name || typeof weapon.name !== 'string') {
					return res.status(400).json({message: 'Key name must be a string'});
				}

				if (!weapon.damageDice || typeof weapon.damageDice !== 'string') {
					return res
						.status(400)
						.json({message: 'Key damageDice must be a string'});
				}

				if (!weapon.type || typeof weapon.type !== 'string') {
					return res.status(400).json({message: 'Key type must be a string'});
				}

				if (!weapon.damageType || typeof weapon.damageType !== 'string') {
					return res
						.status(400)
						.json({message: 'Key damageType must be a string'});
				}

				if (!weapon.critical || typeof weapon.critical !== 'string') {
					return res
						.status(400)
						.json({message: 'Key critical must be a string'});
				}
			});
		}
		next();
	}
}

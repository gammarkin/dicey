import IService from '../interfaces/IService';
import ICharacter from '../interfaces/IChar';
import IModel from '../interfaces/IModel';
import seed from '../seed';

class CharacterService implements IService<ICharacter> {
	private _character: IModel<ICharacter>;

	constructor(model: IModel<ICharacter>) {
		this._character = model;
	}

	public async create(
		character: ICharacter | ICharacter[]
	): Promise<ICharacter> {
		return this._character.create(character);
	}

	public async findAll(): Promise<ICharacter[]> {
		const characters = await this._character.read();

		if (characters.length === 0) {
			await this._character.createMany(seed);

			return this._character.read();
		}

		return characters;
	}

	public async findByPlayerTag(playerTag: string): Promise<ICharacter | null> {
		return this._character.readOne(playerTag);
	}

	public async updateOne(
		playerTag: string,
		character: ICharacter
	): Promise<ICharacter | null> {
		return this._character.update(playerTag, character);
	}

	public async destroy(playerTag: string): Promise<void> {
		await this._character.delete(playerTag);
	}

	public async destroyAndSeed(): Promise<ICharacter[]> {
		await this._character.deleteAll();

		return this._character.createMany(seed);
	}
}

export default CharacterService;

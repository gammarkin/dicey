import ICharacter from '../models/Character';

export interface IService<T> {
	create(item: T): Promise<T>;
	findAll(): Promise<T[]>;
	updateOne(id: string, item: T): Promise<T | null>;
	destroy(id: string): Promise<void>;
}

export interface CharServiceInterface<T> extends IService<T> {
	findByPlayerTag(id: string): Promise<T | null>;
	destroyAndSeed(): Promise<T[]>;
}

export interface IService<T> {
	create(item: T): Promise<T>;
	findAll(): Promise<T[]>;
	updateOne(id: string, item: T): Promise<T | null>;
	destroy(id: string): Promise<void>;
	findOne?(id: string): Promise<T | null>;
}

export interface CharServiceInterface<T> extends IService<T> {
	findByPlayerTag(id: string): Promise<T | null>;
	destroyAndSeed(): Promise<T[]>;
}

export interface IUserService<T> extends IService<T> {
	findOne(tag: string): Promise<T | null>;
}

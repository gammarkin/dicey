export default interface IService<T> {
	create(item: T): Promise<T>;
	findAll(): Promise<T[]>;
	findByPlayerTag(id: string): Promise<T | null>;
	updateOne(id: string, item: T): Promise<T | null>;
	destroy(id: string): Promise<void>;
	destroyAndSeed(): Promise<T[]>;
}

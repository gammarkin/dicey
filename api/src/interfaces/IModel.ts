export default interface IModel<T> {
	create(obj: T | Array<object>): Promise<T>;
	createMany(obj: T[] | Array<object>): Promise<T[]>;
	read(): Promise<T[]>;
	readOne(id: string): Promise<T | null>;
	update(id: string, obj: T): Promise<T | null>;
	delete(id: string): Promise<void>;
	deleteAll(): Promise<void>;
}

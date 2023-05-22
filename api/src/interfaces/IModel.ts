export default interface IModel<T> {
	create(obj: T | Array<object>): Promise<T>;
	createMany(obj: T[] | Array<object>): Promise<T[]>;
	read(): Promise<T[]>;
	readOne(id: {}): Promise<T | null>;
	update(id: {}, obj: T): Promise<T | null>;
	delete(id: {}): Promise<void>;
	deleteAll(): Promise<void>;
}

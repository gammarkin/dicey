export default interface IChar {
	id: number;
	playerTag: string;
	characterName: string;
	skills: object;
	attributes: object;
	weapons: [] | undefined;
}

export default interface IChar {
	id: number;
	playerTag: string;
	characterName: string;
	skills: [];
	attributes: [];
	weapons: [];
	attacks?: [];
	habilities?: [];
	origin?: string;
	characterClass?: string;
	nex?: string;
	movement?: string;
	dmTag?: string;
	pv?: number;
	pe?: number;
	pvMax?: number;
	peMax?: number;
	defense?: number;
	sanity?: number;
	protection?: number;
	resistance?: number;
}

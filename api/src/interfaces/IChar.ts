export default interface IChar {
	id: number;
	playerTag: string;
	characterName: string;
	skills: [];
	attributes: [];
	weapons: [];
	attacks?: [];
	habilities?: [];
	dmTag?: string;
	origin?: string;
	characterClass?: string;
	nex?: string;
	movement?: string;
	pv?: string;
	pe?: string;
	pvMax?: string;
	peMax?: string;
	defense?: string;
	sanity?: string;
	protection?: string;
	resistance?: string;
}

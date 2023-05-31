import {useState} from 'react';

import attributes from '../utils/data/attributes';
import expertises from '../utils/data/expertises';

import Attacks from '../components/Attacks';
import Attribute from '../components/Attribute';
import Expertise from '../components/Expertise';
import Habilities from '../components/Hability';

export default function CreateChar() {
	const [characterName, setCharacterName] = useState('');
	const [playerTag, setPlayerTag] = useState('');
	const [origin, setOrigin] = useState('');
	const [characterClass, setCharacterClass] = useState('');
	const [nex, setNex] = useState('');
	const [movement, setMovement] = useState('');
	const [pv, setPv] = useState('');
	const [pe, setPe] = useState('');
	const [pvMax, setPvMax] = useState('');
	const [peMax, setPeMax] = useState('');
	const [defense, setDefense] = useState('');
	const [sanity, setSanity] = useState('');
	const [protection, setProtection] = useState('');
	const [dmTag, setDmTag] = useState('');
	const [resistance, setResistance] = useState('');
	const [weapons, setWeapons] = useState([]);

	const submit = () => {
		const habilities = JSON.parse(localStorage.getItem('habilities')) || [];
		const attributes = JSON.parse(localStorage.getItem('attributes')) || [];
		const expertises = JSON.parse(localStorage.getItem('expertises')) || [];

		const newChar = {
			characterName,
			playerTag,
			origin,
			characterClass,
			nex,
			movement,
			pv,
			pe,
			pvMax,
			peMax,
			defense,
			sanity,
			protection,
			dmTag,
			resistance,
			weapons,
			habilities,
			expertises,
			attributes,
		};

		console.log(newChar);
	};

	return (
		<main>
			<h1>Criar Personagem</h1>

			<form>
				<label htmlFor="characterName">Nome do Personagem</label>
				<input
					type="text"
					id="characterName"
					value={characterName}
					onChange={({target: {value}}) => setCharacterName(value)}
				/>

				<label htmlFor="playerTag">Nome do Jogador</label>
				<input
					type="text"
					id="playerTag"
					value={playerTag}
					onChange={({target: {value}}) => setPlayerTag(value)}
				/>

				<label htmlFor="origin">Origem</label>
				<input
					type="text"
					id="origin"
					value={origin}
					onChange={({target: {value}}) => setOrigin(value)}
				/>

				<label htmlFor="characterClass">Classe</label>
				<input
					type="text"
					id="characterClass"
					value={characterClass}
					onChange={({target: {value}}) => setCharacterClass(value)}
				/>

				<label htmlFor="nex">Nex</label>
				<input
					type="text"
					id="nex"
					value={nex}
					onChange={({target: {value}}) => setNex(value)}
				/>

				<label htmlFor="movement">Movimento</label>
				<input
					type="text"
					id="movement"
					value={movement}
					onChange={({target: {value}}) => setMovement(value)}
				/>

				<label htmlFor="pv">PV</label>
				<input
					type="text"
					id="pv"
					value={pv}
					onChange={({target: {value}}) => setPv(value)}
				/>

				<label htmlFor="pe">PE</label>
				<input
					type="text"
					id="pe"
					value={pe}
					onChange={({target: {value}}) => setPe(value)}
				/>

				<label htmlFor="pvMax">PV Máximo</label>
				<input
					type="text"
					id="pvMax"
					value={pvMax}
					onChange={({target: {value}}) => setPvMax(value)}
				/>

				<label htmlFor="peMax">PE Máximo</label>
				<input
					type="text"
					id="peMax"
					value={peMax}
					onChange={({target: {value}}) => setPeMax(value)}
				/>

				<label htmlFor="defense">Defesa</label>
				<input
					type="text"
					id="defense"
					value={defense}
					onChange={({target: {value}}) => setDefense(value)}
				/>

				<label htmlFor="sanity">Sanidade</label>
				<input
					type="text"
					id="sanity"
					value={sanity}
					onChange={({target: {value}}) => setSanity(value)}
				/>

				<label htmlFor="protection">Proteção</label>
				<input
					type="text"
					id="protection"
					value={protection}
					onChange={({target: {value}}) => setProtection(value)}
				/>

				<label htmlFor="dmTag">Tag do Mestre</label>
				<input
					type="text"
					id="dmTag"
					value={dmTag}
					onChange={({target: {value}}) => setDmTag(value)}
				/>

				<label htmlFor="resistance">Resistência</label>
				<input
					type="text"
					id="resistance"
					value={resistance}
					onChange={({target: {value}}) => setResistance(value)}
				/>

				<Attacks setWeapons={setWeapons} />
				{attributes.map((attribute, i) => (
					<>
						{attribute}
						<Attribute name={attribute} key={i} />
					</>
				))}
				{expertises.map((expertise, i) => (
					<>
						{expertise}
						<Expertise name={expertise} key={i} />
					</>
				))}
				{Array.from({length: 20}, (_, i) => (
					<Habilities id={i} key={i} />
				))}

				<button onClick={submit} type="button">
					Criar
				</button>
			</form>
		</main>
	);
}

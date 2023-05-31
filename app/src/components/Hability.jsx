import {useState} from 'react';
import {number} from 'prop-types';

export default function Habilities({id}) {
	const [hability, setHability] = useState('');

	const setHabilities = () => {
		const newHability = {id, hability};

		let habilities = JSON.parse(localStorage.getItem('habilities')) || [];

		if (habilities.some((hability) => hability.id === id)) {
			habilities = habilities.map((hability) =>
				hability.id === id ? newHability : hability
			);
		} else {
			habilities.push(newHability);
		}

		habilities = habilities.filter((hability) => hability.hability !== '');

		return localStorage.setItem('habilities', JSON.stringify(habilities));
	};

	return (
		<input
			type="text"
			name="hability"
			onChange={({target: {value}}) => setHability(value)}
			onBlur={setHabilities}
		/>
	);
}

Habilities.propTypes = {
	id: number,
}.isRequired;

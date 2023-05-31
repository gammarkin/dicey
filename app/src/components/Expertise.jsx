import {useState} from 'react';
import {string} from 'prop-types';

import setIntoLS from '../utils/setInLocalStorage';

export default function Expertise({name}) {
	const [expertise, setExpertise] = useState(0);

	return (
		<input
			onChange={({target: {value}}) => setExpertise(value)}
			onBlur={() => setIntoLS('expertises', {name, value: Number(expertise)})}
		/>
	);
}

Expertise.propTypes = {
	name: string,
}.isRequired;

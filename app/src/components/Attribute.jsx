import {useState} from 'react';
import {string} from 'prop-types';

import setIntoLS from '../utils/setInLocalStorage';

export default function Attribute({name}) {
	const [attribute, setAttribute] = useState(0);

	return (
		<input
			onChange={({target: {value}}) => setAttribute(value)}
			onBlur={() => setIntoLS('attributes', {name, value: Number(attribute)})}
		/>
	);
}

Attribute.propTypes = {
	name: string,
}.isRequired;

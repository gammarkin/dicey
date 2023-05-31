import {useState} from 'react';
import {string} from 'prop-types';

export default function Attribute({name}) {
	const [attribute, setAttribute] = useState('');

	const sendAttributeToLS = () => {
		const newAttribute = {name, value: Number(attribute)};

		let attributes = JSON.parse(localStorage.getItem('attributes')) || [];

		if (attributes.some((attribute) => attribute.name === name)) {
			attributes = attributes.map((attribute) =>
				attribute.name === name ? newAttribute : attribute
			);
		} else {
			attributes.push(newAttribute);
		}

		attributes = attributes.filter((attribute) => attribute.name !== '');

		return localStorage.setItem('attributes', JSON.stringify(attributes));
	};

	return (
		<input
			onChange={({target: {value}}) => setAttribute(value)}
			onBlur={sendAttributeToLS}
		/>
	);
}

Attribute.propTypes = {
	name: string,
}.isRequired;

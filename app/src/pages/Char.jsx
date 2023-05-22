import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import getCharacter from '../utils/getChar';

export default function Char() {
	const [char, setChar] = useState({});

	const {tag} = useParams();

	useEffect(() => {
		const getChar = async () => {
			return setChar(await getCharacter(tag));
		};

		getChar();
	}, [tag]);

	return <p>{JSON.stringify(char)}</p>;
}

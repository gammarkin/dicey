import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import login from '../utils/login';

export default function Login() {
	const [userTag, setUserTag] = useState('');
	const [password, setPassword] = useState('');
	const [notFound, setNotFound] = useState(null);

	const navigate = useNavigate();

	const useSubmit = async (event) => {
		event.preventDefault();

		const data = await login(userTag, password);

		return data ? navigate(`/char/${data.data.tag}`) : setNotFound(true);
	};

	return (
		<main>
			<label htmlFor="userTag">
				User Tag
				<input
					id="userTag"
					value={userTag}
					onChange={({target: {value}}) => setUserTag(value)}
					onSubmit={useSubmit}
				/>
			</label>

			<label htmlFor="password">
				Password
				<input
					id="password"
					onChange={({target: {value}}) => setPassword(value)}
					value={password}
					onSubmit={useSubmit}
				/>
			</label>

			<button onClick={useSubmit}>Entrar</button>

			{notFound && <p>tag ou senha incorretos</p>}

			<Link to="/register">Criar conta</Link>
		</main>
	);
}

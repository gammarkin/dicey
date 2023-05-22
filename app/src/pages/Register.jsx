import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import register from '../utils/register';

export default function Register() {
	const [userTag, setUserTag] = useState('');
	const [password, setPassword] = useState('');
	const [seePassword, setSeePassword] = useState(false);

	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleCreateAccountOnEnter = async (event) => {
		if (event.key === 'Enter') {
			return await handleCreateAccount();
		}
	};

	const handleCreateAccount = async () => {
		try {
			const data = await register({code: password, tag: userTag});

			return navigate(`/char/create/${data.data.tag}`);
		} catch (e) {
			console.log(e);

			return setError(true);
		}
	};

	return (
		<main>
			<form>
				<label htmlFor="userTag">
					Tag
					<input
						id="userTag"
						value={userTag}
						onChange={({target: {value}}) => setUserTag(value)}
						onKeyDown={handleCreateAccountOnEnter}
						required
					/>
				</label>

				<label htmlFor="password">
					Senha
					<input
						id="password"
						onChange={({target: {value}}) => setPassword(value)}
						value={password}
						onKeyDown={handleCreateAccountOnEnter}
						required
						type={seePassword ? 'text' : 'password'}
					/>
				</label>

				<button type="button" onClick={() => setSeePassword((prev) => !prev)}>
					{seePassword ? 'Esconder senha' : 'Ver senha'}
				</button>
			</form>

			<button onClick={handleCreateAccount}>Criar conta</button>

			{error && <p>Erro ao criar conta. Preencha todos os campos</p>}
		</main>
	);
}

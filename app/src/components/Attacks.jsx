import {useState} from 'react';
import PropTypes from 'prop-types';

export default function Attacks({id}) {
	const [attack, setAttack] = useState({});

	const saveAttacks = () => {
		if (!attack.value) {
			return;
		}

		const attacks = JSON.parse(localStorage.getItem('attacks')) || [];
		const attackFromStorage = attacks.find((attack) => attack.id === id);

		if (attackFromStorage) {
			attacks.map((atk) => {
				if (atk.id === id) {
					return (atk.value = attack.value);
				}
			});

			return localStorage.setItem('attacks', JSON.stringify(attacks));
		}

		attacks.push(attack);

		return localStorage.setItem('attacks', JSON.stringify(attacks));
	};

	return (
		<section>
			<label htmlFor="attackName">Ataques</label>
			<label htmlFor="Teste">Teste</label>
			<label htmlFor="Dano">Dano</label>
			<label htmlFor="Tipo de arma">Critico/Alcance/Especial</label>

			<input
				type="text"
				id="attack"
				value={attack.value}
				onChange={({target: {value}}) => setAttack({value, id})}
				onBlur={saveAttacks}
			/>
		</section>
	);
}

Attacks.propTypes = {
	id: PropTypes.number.isRequired,
};

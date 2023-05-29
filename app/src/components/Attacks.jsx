import {number} from 'prop-types';
import weapons from '../utils/data/weapons';

export default function Attacks({setWeapons}) {
	return (
		<section>
			<p>Ataques - Teste - Dano - Crítico/Alcance/Especial</p>

			<select
				id="attackName"
				name="attackName"
				onChange={({target: {value}}) =>
					setWeapons([weapons.find((weapon) => weapon.name === value)])
				}
			>
				<option value="">Selecione sua arma</option>
				{weapons.map((weapon) => (
					<option key={weapon.name} value={weapon.name}>
						{`${weapon.name}  -  ${weapon.weapon_type}  -  ${weapon.damageDice} - 
						${weapon.critical}/${weapon.damageType}/-`}
					</option>
				))}
			</select>
		</section>
	);
}

Attacks.propTypes = {
	id: number,
}.isRequired;

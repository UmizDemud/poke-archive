import { FC } from 'react'
import { typesvgs } from '../../assets/poke-types/imports';
import { capitalize } from '../../utils/capitalize';

export const Type: FC<{name: string}> = ({name}) => (
	<li className="type-item">
		<span className="type-desc">{capitalize(name)}</span>
		<img className="type-img" src={typesvgs[name as keyof typeof typesvgs]} />
	</li>
)

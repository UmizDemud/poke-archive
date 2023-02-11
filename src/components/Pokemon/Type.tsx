import { FC } from 'react'
import { capitalize } from '../../utils/capitalize';

export const Type: FC<{name: string}> = ({name}) => (
	<li className="type-item">
		<span className="type-desc">{capitalize(name)}</span>
		<img className="type-img" src={`/poke-types/${name}.svg`} />
	</li>
)

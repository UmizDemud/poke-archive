import { FC, memo } from 'react'
import { Link } from 'react-router-dom';
import { capitalize } from '../../../utils/capitalize';

type Props = {
	poke: {
		id: number;
		name: string;
		types: string[];
		icon: string;
	};
}

export const PokemonRow: FC<Props> = memo(({poke}) => (
	<div className="row" key={poke.id}>
		<div className="col st">
			{poke.id}
		</div>
		<Link
			to={`/${poke.id}`}
			className="col namelink"
		>
			{capitalize(poke.name)}
		</Link>
		<div className="col">
			{poke.types.map(type => (
				<span key={`${poke.name}_${type}`} className="tooltip">
					<span className="tooltiptext">
						{type}
					</span>
					<img className="type-img" src={`/poke-types/${type}.svg`} />
				</span>
			))}
		</div>
		<div className="col">
			<img src={poke.icon} alt="icon" />
		</div>
	</div>
));

import { FC, memo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { Ability } from '../../../pages/pokemon/types';
import { capitalize } from '../../../utils/capitalize';

type Props = {
	abilitiesArr: Ability[];
}

export const AbilitiesList: FC<Props> = memo(({abilitiesArr}) => {
	const abilities = useAppSelector(state => {
		return abilitiesArr.map(ability => {
			const spl = ability.ability.url.split('/');
			return parseInt(spl[spl.length - 2]);
		}).map(id => state.pokemon.abilities[id])
	});

	return (
		<section className="section">
			<h4 className="title">Base Skills</h4>
			<>
				{Object.keys(abilities).map(k => {
					const key = parseInt(k);
					if (!abilities[key]) {
						return null;
					}
					return (
						<div style={{marginTop: '1rem'}} key={abilities[key].slot}>
							<h4 style={{marginBottom: '1rem',padding: '0 1rem', borderBottom: '1px solid var(--bc_tertiary)'}}>
								{capitalize(abilities[key].name)}
							</h4>
							<h5>
								Effect: <span style={{fontWeight: 400}}>{abilities[key].effect}</span>
							</h5>
							<h5>
								Slot: <span style={{fontWeight: 400}}>{abilities[key].slot}</span>
							</h5>
							<h5>
								Is Hidden: <span style={{fontWeight: 400}}>{abilities[key].isHidden ? 'Yes' : 'No'}</span>
							</h5>
						</div>
					)
				})}
			</>
		</section>
	);
});

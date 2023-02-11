import { FC, useState } from 'react'
import { typesvgs } from '../../../assets/poke-types/imports';
import { typeToColor } from '../../../assets/typeToColor'
import { MoveDataRenderable } from '../../../pages/pokemon/types'
import { capitalize } from '../../../utils/capitalize';
import arrowsvg from '../../../assets/icons/basic_arrow_right.svg'

type Props = {
	move: MoveDataRenderable;
	hidden: boolean;
}

export const Move: FC<Props> = ({move, hidden}) => {
	const color = typeToColor[move.type.name as keyof typeof typeToColor];
	const desc = move.effect_entries.find(eff => eff.language.name == 'en')?.effect.replaceAll('$effect_chance%', `${move.effect_chance}%`);
	const [open, setOpen] = useState(false)
	
	return (
		<div className="moveContainer" style={{maxHeight: hidden ? '600vh' : '0'}}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
			>
				<h5 className="subtitle" style={{color}}>
					<img
						src={arrowsvg}
						alt="toggle move"
						style={{transition: 'transform var(--t-time)', transform: open ? 'rotateZ(90deg)' : ''}}
					/>
					{capitalize(move.name)}
					<img className="type-img" src={typesvgs[move.type.name as keyof typeof typesvgs]} />
				</h5>
			</button>
			<div className="moveDetails" style={{maxHeight: open ? '200vh' : '0'}}>
				<h6>
					Type: {capitalize(move.damage_class.name)}
				</h6>
				<h6>
					<span>
						{`${move.power ? `Power: ${move.power}` : ''}`}
					</span>
				</h6>
				<h6>{move.accuracy ? `Accuracy: ${move.accuracy}%` : ''}</h6>
				<h6>Target: {move.target.name}</h6>
				<h6>{`${move.effect_chance ? `Effect chance: ${move.effect_chance}%` : ''}`}</h6>
				{desc && <p style={{padding: '1rem 1rem 0'}}>{desc}</p>}
			</div>
		</div>
	)
}
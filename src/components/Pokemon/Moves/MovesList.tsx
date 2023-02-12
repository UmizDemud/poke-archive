import { FC, memo, useCallback, useState } from 'react'
import { Move as M, MoveDataRenderable } from '../../../pages/pokemon/types'
import { typesvgs } from '../../../assets/poke-types/imports';
import { useAppSelector } from '../../../app/hooks';
import { sorter } from '../../Sorter/sorterFunctions';
import { Sorter } from '../../Sorter/Sorter';
import { Filter } from '../../Filter/Filter';
import { Move } from './Move'
import './MovesList.css';

type Props = {
	movesArr: M[];
};

const sortOptions = ['Name', 'Element', 'Power', 'Accuracy', 'Effect Chance', 'Damage Class', 'Target Class'];


export const MovesList: FC<Props> = memo(({movesArr}) => {
	const moves = useAppSelector(state => {
		return movesArr.map(move => {
			const spl = move.move.url.split('/');
			return parseInt(spl[spl.length - 2]);
		}).map(id => state.pokemon.moves[id])
	})

	const [filterType, setFilterType] = useState<{
		[key: string]: {
			[key: string]: boolean;
		}
	}>(() => {
		const element: {
			[key: string]: boolean
		} = {};
		const damage_class: {
			[key: string]: boolean
		} = {};
		const target: {
			[key: string]: boolean
		} = {};

		for (const move of moves) {
			if (!(move.type.name in element)) {
				element[move.type.name] = true;
			}

			if (!(move.damage_class.name in damage_class)) {
				damage_class[move.damage_class.name] = true;
			}

			if (!(move.target.name in target)) {
				target[move.target.name] = true;
			}
		}
		
		return {
			element,
			damage_class,
			target,
		}
	});

	const [sortBy, setSortBy] = useState<string[]>([]);

	const isHidden = useCallback((move: MoveDataRenderable) => {
		return filterType.damage_class[move.damage_class.name as keyof typeof filterType.damage_class]
				&& filterType.element[move.type.name as keyof typeof filterType.element]
				&& filterType.target[move.target.name as keyof typeof filterType.target]
	}, [filterType]);

	return (
		<div className="MovesList">
			<div>
				<h4 className="title">Moves:{' '}
					<i className="MovesList__desc">
						Describes the moves a pokemon is capable of learning.
					</i>
				</h4>
				<div style={{display: 'flex', marginBottom: '2rem'}}>
					<Sorter
						sortBy={sortBy}
						setSortBy={setSortBy}
						sortOptions={sortOptions}
					/>
					<Filter
						filterType={filterType}
						setFilterType={setFilterType}
						optionImages={{'element': typesvgs}}
					/>
				</div>
			</div>

			{(sorter(moves, sortBy)).map(move => {
				if (!move) {
					return null;
				}
				return (
					<Move key={move.id} move={move} hidden={isHidden(move)} />
				)
			})}
		</div>
	)
});

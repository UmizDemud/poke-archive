import { FC, memo, useCallback, useState } from 'react'
import { Move as M, MoveDataRenderable } from '../../../pages/pokemon/types'
import { Move } from './Move'
import './index.css';
import { damage_classes, target_types } from '../../../assets/typeVariants';
import { capitalize } from '../../../utils/capitalize';
import { sorter } from '../../../utils/sorter';
import { moveFields } from '../../../assets/moveFields';
import { sortOptions } from '../../../assets/sortOptions';
import { useAppSelector } from '../../../app/hooks';
import sorticon from "../../../assets/icons/sort_icon.svg";
import filtericon from "../../../assets/icons/filter_icon.svg";
import { typesvgs } from '../../../assets/poke-types/imports';

type Props = {
	movesArr: M[];
};

type FilterType = {
	element: {
		[key: string]: boolean;
	};
	damage_class: {
		[key: string]: boolean;
	};
	target: {
		[key: string]: boolean;
	};
};

type SortBy = (typeof sortOptions[number])[];

export const MovesList: FC<Props> = memo(({movesArr}) => {
	const moves = useAppSelector(state => {
		return movesArr.map(move => {
			const spl = move.move.url.split('/');
			return parseInt(spl[spl.length - 2]);
		}).map(id => state.pokemon.moves[id])
	})

	const [filterType, setFilterType] = useState<FilterType>(() => {
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

	const [sortBy, setSortBy] = useState<SortBy>([]);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isSortingOpen, setIsSortingOpen] = useState(false);
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
				<div style={{display: 'flex'}}>
					<div style={{marginRight: '1rem'}} className="tooltip filter-toggle-wrapper">
						<div className="tooltiptext">
							Sort
						</div>
						<button
							type="button"
							onClick={() => {
								if (!isSortingOpen && isFilterOpen) {
									setIsFilterOpen(false);
								}

								setIsSortingOpen(!isSortingOpen)
							}}
						>
							<img
								width="30"
								height="30"
								className={`filter-toggle${isSortingOpen ? ' filter-toggle--open' : ''}`}
								src={sorticon}
								alt="toggle sorting"
							/>
						</button>
						<div
							className={`MovesList__sortings${isSortingOpen ? ' MovesList__sortings--open' : ''}`}
						>
							{sortOptions.map((opt) => {
								const optAsKey = moveFields[opt] as SortBy[number];
								const selected = sortBy.includes(optAsKey);
								const i = sortBy.indexOf(optAsKey);
								return (
									<button
										key={opt}
										type="button"
										onClick={() => {
											if (selected) {
												setSortBy(prev => prev.filter(item => item !== moveFields[opt]));
											} else {
												setSortBy(prev => [...prev, optAsKey])
											}
										}}
										className={`sort-option${selected ? ' sort-option--selected' : ''}`}
									>
										<span className="sortOptOrdr">{i !== -1 ? i+1 : ''}</span>
										{opt}
									</button>
								)
							})}
						</div>
					</div>
					<div className="tooltip filter-toggle-wrapper">
						<div className="tooltiptext">
							Filter
						</div>
						<button
							type="button"
							onClick={() => {
								if (!isFilterOpen && isSortingOpen) {
									setIsSortingOpen(false);
								}

								setIsFilterOpen(!isFilterOpen)
							}}
						>
							<img
								width="30"
								height="30"
								className={`filter-toggle${isFilterOpen ? ' filter-toggle--open' : ''}`}
								src={filtericon}
								alt="toggle filters"
							/>
						</button>
					</div>
				</div>
			</div>
			<div
				className={`MovesList__filters${isFilterOpen ? ' MovesList__filters--open' : ''}`}
			>
				<h4 className="filter-title" style={{marginBottom: '1rem'}}>Elemental Classes</h4>
				<div style={{ marginBottom: '1rem' }} aria-label="list to filter upcoming moves" className="filter-list">
					{Object.keys(filterType.element).map(element => {
						const selected = filterType.element[element];
						return (
							<button
								key={element}
								type="button"
								onClick={() => {
									setFilterType(prev => ({
										...prev,
										element: {
											...prev.element,
											[element]: !selected
										},
									}))
								}}
							>
								<img
								alt={element}
								className={`filter-item${selected ? ' filter-item--selected' : ''}`}
								width="30"
								height="30"
								src={typesvgs[element as keyof typeof typesvgs]}
							/>
							</button>
						)
					})}
				</div>
				<h4 className="filter-title">Damage Classes</h4>
				<div aria-label="list to filter upcoming moves" className="filter-list filter-list--text">
					{damage_classes.map(dmg => {
						const selected = filterType.damage_class[dmg];
						return (
							<button
								type="button"
								onClick={() => {
									setFilterType(prev => ({
										...prev,
										damage_class:  {
											...prev.damage_class,
											[dmg]: !selected,
										},
									}))
								}}
								key={dmg}
								className={`filter-item--text filter-item${selected ? ' filter-item--selected' : ''}`}
							>
								{capitalize(dmg)}
							</button>
						)
					})}
				</div>
				<h4 className="filter-title">Target Classes</h4>
				<div aria-label="list to filter upcoming moves" className="filter-list filter-list--text">
					{target_types.map(trgt => {
						const selected = filterType.target[trgt];
						return (
							<button
								type="button"
								key={trgt}
								className={`filter-item--text filter-item${selected ? ' filter-item--selected' : ''}`}
								onClick={() => {
									setFilterType(prev => ({
										...prev,
										target: {
											...prev.target,
											[trgt]: !selected,
										},
									}))
								}}
							>
								{capitalize(trgt)}
							</button>
						)
					})}
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

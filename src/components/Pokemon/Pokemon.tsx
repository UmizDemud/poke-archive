import { FC, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { typeToColor } from "../../assets/typeToColor";
import { PokemonData } from "../../pages/pokemon/types";
import { capitalize } from "../../utils/capitalize";
import { AbilitiesList } from "./Abilities/AbilitiesList";
import { MovesList } from "./Moves/MovesList";

type Props = {
	pokemon: PokemonData;
}

export const Pokemon: FC<Props> = memo(({pokemon}) => {
	const color = useMemo(() => typeToColor[pokemon?.types[0].type.name as keyof typeof typeToColor], [pokemon]);

	return (
		<main id="main">
			<div className="header">
				<Link
					className="btn"
					style={{lineHeight: 0.5, backgroundImage: `radial-gradient(${color}, ${color} 63%, #fff 65%)`}}
					to={`/${pokemon.id - 1}`}
				>
					<img width="48" height="48" src="/icons/arrow-left.svg" alt="previous page" />
				</Link>

				<h1 className="pokename">{pokemon.id} - {capitalize(pokemon.name)}</h1>

				<Link
					className="btn"
					style={{lineHeight: 0.5, backgroundImage: `radial-gradient(${color}, ${color} 63%, #fff 65%)`}}
					to={`/${pokemon.id + 1}`}
				>
					<img width="48" height="48" src="/icons/arrow-right.svg" alt="next page" />
				</Link>
			</div>
			<div className="showcase-area">
				<div className="showcase-area__description">
					<div id="poke-data-table">
						<div className="row">
							<div className="head col" style={{backgroundColor: color}}>Types</div>
							<div className="col">
								{pokemon.types.map(item => (
									<img key={item.slot} className="type-img" src={`/poke-types/${item.type.name}.svg`} />
								))}
							</div>
						</div>
						<div className="row">
							<div className="head col" style={{backgroundColor: color}}>Height</div>
							<div className="col">
								{pokemon.height}
							</div>
						</div>
						<div className="row">
							<div className="head col" style={{backgroundColor: color}}>Weight</div>
							<div className="col">
								{pokemon.weight}
							</div>
						</div>
						<div className="row">
							<div className="head col" style={{backgroundColor: color}}>Base Exp</div>
							<div className="col">
								{pokemon.base_experience}
							</div>
						</div>
						<div className="row">
							<div className="head col" style={{backgroundColor: color}}>Order</div>
							<div className="col">
								{pokemon.id}
							</div>
						</div>
					</div>
				</div>
				<div className="showcase-area__visuals">
					<img
						className="poke-DW"
						src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}
						alt="pokemon"
					/>
					<Link
						className="gallery-link"
						to={`/images/${pokemon.id}`}
					>
						View Gallery
					</Link>
				</div>
			</div>
			<AbilitiesList abilitiesArr={pokemon.abilities} />
			<MovesList movesArr={pokemon.moves} />
		</main>
	)
});

import { FC, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loadMany } from "../../../features/pokemonSlice";
import { PokemonsListPlaceholder } from "./PokemonListPlaceholder";
import { PokemonRow } from "./PokemonRow";

type Props = {
	defaultOffset: number;
	defaultLimit: number;
}

export const PokemonsList: FC<Props> = ({defaultOffset, defaultLimit}) => {
	const[searchParams] = useSearchParams();
	const [ready, setReady] = useState(false);

	const offset = parseInt(searchParams.get('offset') || '') || defaultOffset;
	const limit = parseInt(searchParams.get('limit') || '') || defaultLimit;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadMany({offset, limit}))
			.finally(() => setReady(true));
	}, [offset, limit])

	let pokes = useAppSelector(state => {
		let result = [];

		for (let i = 0; i < limit; i++) {
			if (!state.pokemon.pokes[offset + i]) {
				continue;
			}
			const icon = state.pokemon.pokes[offset + i].sprites.versions["generations-viii"]?.icons.front_default
				|| state.pokemon.pokes[offset + i].sprites.versions["generation-vii"].icons.front_default;

			result.push({
				id: state.pokemon.pokes[offset + i].id,
				name: state.pokemon.pokes[offset + i].name,
				types: state.pokemon.pokes[offset + i].types.map(it => it.type.name),
				icon,
			});
		}

		return result;
	});

	if (!ready) {
		return <PokemonsListPlaceholder />;
	}

	return (
		<div className="pokedex">
			<div className="header">
				<h1 className="pokedex__title">Pokedex</h1>
				<div>
					<div>

					</div>
					<div>
						
					</div>
				</div>
			</div>
			<div id="pokedex-table">
				<div className="head">
					<div className="head st col">Order</div>
					<div className="head col">Name</div>
					<div className="head col">Types</div>
					<div className="head col">Image</div>
				</div>
				{pokes.map(poke => (
					<PokemonRow key={poke.id} poke={poke} />
				))}
			</div>
		</div>
	)
}
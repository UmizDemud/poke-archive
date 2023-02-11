import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { typeToColor } from "../../../assets/typeToColor";
import { toStrLeaves } from "../../../components/Pokemon/toStringLeaves";
import { loadPoke } from "../../../features/pokemonSlice";
import { capitalize } from "../../../utils/capitalize";

export const PokemonImages = () => {
	const { id } = useParams();
	const idx = parseInt(id || '');
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!idx) {
			return;
		}
		
		dispatch(loadPoke(idx));
	}, [idx])

	let poke = useAppSelector(state => state.pokemon.pokes[idx]);

	if (!poke) {
		return null
	}

	const color = typeToColor[poke.types[0].type.name as keyof typeof typeToColor];

	return (
		<main>
			<div style={{margin: '3rem 0', textAlign: 'center'}} className="header">
				<Link
					className="btn"
					style={{lineHeight: 0.5}}
					to={`/images/${poke.id - 1}`}
				>
					<img width="48" height="48" src="/icons/arrow-left.svg" alt="previous page" />
				</Link>

				<div>
					<Link to={`/${poke.id}`}>
						<h1 style={{color}} className="pokename poke-link">{poke.id} - {capitalize(poke.name)}</h1>
					</Link>
					<h2>Image Gallery</h2>
				</div>

				<Link
					className="btn"
					style={{lineHeight: 0.5}}
					to={`/images/${poke.id + 1}`}
				>
					<img width="48" height="48" src="/icons/arrow-right.svg" alt="next page" />
				</Link>
			</div>
			<div className="poke-gallery">
				{toStrLeaves(poke.sprites)}
			</div>
		</main>
	)
}

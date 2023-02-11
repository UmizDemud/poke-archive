import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Pokemon } from '../../../components/Pokemon';
import { PokemonPlaceholder } from '../../../components/Pokemon/PokemonPlaceholder';
import { loadPokemon } from '../../../features/pokemonSlice';

export const PokemonPage = () => {
	const { id } = useParams();
	const idx = parseInt(id || '1');
	const dispatch = useAppDispatch();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		dispatch(loadPokemon(idx))
			.finally(() => setReady(true))
	}, [id]);

	const pokemon = useAppSelector(state => {
		return state.pokemon.pokes[idx]
	});

	if (!pokemon || !ready) {
		return <PokemonPlaceholder />
	}

	return (
		<Pokemon pokemon={pokemon} />
	)
}
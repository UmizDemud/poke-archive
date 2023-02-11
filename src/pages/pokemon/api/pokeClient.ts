import { client } from '../../../api/fetchClient';
import { Data, EffectEntry, PokemonData } from '../types';

export const getManySpecies = (offset: number = 1, limit: number = 20) => {
	return client.get<{
		results: Data[],
	}>(`pokemon-species/?offset=${offset}&limit=${limit}`)
		.then(response => response.results);
}

export const getPokemonById = (id: number) => {
	return client.get<PokemonData>(`pokemon/${id}`)
}

export const getPokemonByName = (name: string) => {
	return client.get<PokemonData>(`pokemon/${name}`)
}

export const getMove = <T>(id: number) => {
	return client.get<T>(`move/${id}`);
}

export const getAbility = (id: number) => {
	return client.get<{effect_entries: EffectEntry[], id: number}>(`ability/${id}`);
}


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Abilities, MoveData, Moves, PokemonData } from '../pages/pokemon/types';
import * as PokeClient from '../pages/pokemon/api/pokeClient'

type Pokemons = {
	[key: number]: PokemonData
}

export interface PokemonState {
  pokes: Pokemons;
	moves: Moves;
  abilities: Abilities;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PokemonState = {
  pokes: {},
	moves: {},
  abilities: {},
  status: 'idle',
};

export const loadPokemon = createAsyncThunk(
  'pokemon/loadPokemon',
  async (idx: number, {getState}) => {
    const { pokemon } = getState() as {pokemon: PokemonState}
    const poke = pokemon.pokes[idx] || await PokeClient.getPokemonById(idx);
    const newMoves: Moves = {}
    let calls = []
    
    for (const move of poke.moves) {
			const spl = move.move.url.split('/');
			const id = parseInt(spl[spl.length - 2]);
			if (id in pokemon.moves) {
				continue;
			}
			calls.push(PokeClient.getMove<MoveData>(id));
		}
    
    const results = await Promise.all(calls)

    results.forEach(res => {
      newMoves[res.id] = res;
    })
    let newAbilities: Abilities = {};
    calls = [];

    for (const ability of poke.abilities) {
      const spl = ability.ability.url.split('/');
      const id = parseInt(spl[spl.length - 2]);
      if (id in pokemon.abilities) {
        continue;
      }
      newAbilities[id] = {
        name: ability.ability.name,
        slot: ability.slot,
        isHidden: ability.is_hidden,
        effect: '',
      }
      calls.push(PokeClient.getAbility(id));
    }

    Promise.all(calls)
      .then((results) => {
        results.forEach(res => {
          newAbilities = {
            ...newAbilities,
            [res.id]: {
              ...newAbilities[res.id],
              effect: res.effect_entries.find(eff => eff.language.name === 'en')?.effect || ''
            }
          };
        })
      });

    return {
      poke,
      newMoves,
      newAbilities,
    };
  }
);

export const loadPoke = createAsyncThunk(
  'pokemon/loadPoke',
  async (idx: number, {getState}) => {
    const { pokemon } = getState() as {pokemon: PokemonState}

    return pokemon.pokes[idx] || await PokeClient.getPokemonById(idx);
  },
);
export const loadMany = createAsyncThunk(
  'pokemon/loadMany',
  async (args: {offset: number, limit: number} = {offset: 0, limit: 0}, {getState}) => {
		const { pokemon } = getState() as {pokemon: PokemonState}
    const result = [];

    for (let i = args.offset; i < args.offset + args.limit; i++) {
      if (pokemon.pokes[i]) {
        continue;
      }

      const pokeData = pokemon.pokes[i] || await PokeClient.getPokemonById(i);
      result.push(pokeData);
    }

    return result;
  },
);
export const loadMoves = createAsyncThunk(
  'pokemon/loadMoves',
  async (idx: number, {getState}) => {
    const { pokemon } = getState() as {pokemon: PokemonState}
		const newMoves: Moves = {}
    const calls = []
    
    for (const move of pokemon.pokes[idx].moves) {
			const spl = move.move.url.split('/');
			const id = parseInt(spl[spl.length - 2]);
			if (id in pokemon.moves) {
				continue;
			}
			calls.push(PokeClient.getMove<MoveData>(id));
		}
    
    const results = await Promise.all(calls)
    
    results.forEach(res => {
      newMoves[res.id] = res;
    })

    return newMoves;
  }
)
export const loadAbilities = createAsyncThunk(
  'pokemon/loadAbilities',
  async (idx: number, {getState}) => {
    const { pokemon } = getState() as {pokemon: PokemonState}// <-- invoke and access state object
    let newAbilities: Abilities = {};
    let calls = [];

    for (const ability of pokemon.pokes[idx].abilities) {
      const spl = ability.ability.url.split('/');
      const id = parseInt(spl[spl.length - 2]);
      if (id in pokemon.abilities) {
        continue;
      }
      newAbilities[id] = {
        name: ability.ability.name,
        slot: ability.slot,
        isHidden: ability.is_hidden,
        effect: '',
      }
      calls.push(PokeClient.getAbility(id));
    }

    await Promise.all(calls)
      .then((results) => {
        results.forEach(res => {
          newAbilities[res.id] = {
            ...newAbilities[res.id],
            effect: res.effect_entries.find(eff => eff.language.name === 'en')?.effect || '',
          };
        })
      });

    return newAbilities;
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPoke.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPoke.fulfilled, (state, action) => {
        state.status = 'idle';
				if (!action.payload) {
					return;
				}
				state.pokes[action.payload.id] = action.payload;

      })
      .addCase(loadPoke.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadMany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMany.fulfilled, (state, action) => {
        state.status = 'idle';
				if (!action.payload) {
					return;
				}

        action.payload.forEach(item => {
          state.pokes = {
            ...state.pokes,
            [item.id]: item,
          };
        })
      })
      .addCase(loadMany.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadMoves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMoves.fulfilled, (state, action) => {
        state.status = 'idle';
				if (!action.payload) {
					return;
				}

        state.moves = {...state.moves, ...action.payload};
      })
      .addCase(loadMoves.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadAbilities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAbilities.fulfilled, (state, action) => {
        state.status = 'idle';
				if (!action.payload) {
					return;
				}
        state.abilities = {...state.abilities, ...action.payload};
      })
      .addCase(loadAbilities.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPokemon.fulfilled, (state, action) => {
        state.status = 'idle';
        state.abilities = {...state.abilities, ...action.payload.newAbilities};
        state.moves = {...state.moves, ...action.payload.newMoves};
        if (action.payload.poke) {
          state.pokes = {
            ...state.pokes,
            [action.payload.poke.id]: action.payload.poke
          };
        }
      })
      .addCase(loadPokemon.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default counterSlice.reducer;

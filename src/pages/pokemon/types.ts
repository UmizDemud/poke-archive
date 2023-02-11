export interface Data {
	name: string,
	url: string,
}

export type Ability = {
	ability: Data;
	is_hidden: boolean;
	slot: number;
};

export type GameIndex = {
	game_index: number;
	version: Data;
};

export type VersionGroupDetail = {
	level_learned_at: number;
	move_learn_method: Data;
	version_group: Data;
};

export type Move = {
	move: Data;
	version_group_details: VersionGroupDetail[];
};

export type SpritesFrontal = {
	front_default: string;
	front_female?: string;
}

export type SpritesFrontalVShiny = {
	front_default: string;
	front_female?: string;
	front_shiny: string;
	front_shiny_female?: string;
}

export type SpritesFrontNBack = {
	front_default: string;
	front_female?: string;
	front_shiny: string;
	front_shiny_female?: string;
	back_default: string;
	back_female?: string;
	back_shiny: string;
	back_shiny_female?: string;
}

export type DreamWorld = SpritesFrontal;

export type Home = SpritesFrontalVShiny;

export type OfficialArtwork = SpritesFrontal;

export type SpritesGen1 = {
	back_default: string;
	back_gray: string;
	back_transparent: string;
	front_default: string;
	front_gray: string;
	front_transparent: string;
};

export type SpritesGenCrystal = {
	back_default: string;
	back_shiny: string;
	back_shiny_transparent: string;
	back_transparent: string;
	front_default: string;
	front_shiny: string;
	front_shiny_transparent: string;
	front_transparent: string;
};

export type SpritesSilverGold = {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
	front_transparent: string;
};

export type SpritesFrontNBackVAnimated = {
	animated: SpritesFrontNBack;
	front_default: string;
	front_female?: string;
	front_shiny: string;
	front_shiny_female?: string;
	back_default: string;
	back_female?: string;
	back_shiny: string;
	back_shiny_female?: string;
};

export type Versions = {
	'generation-i': {
		'red-blue': SpritesGen1;
		yellow: SpritesGen1;
	},
	'generation-ii': {
		crystal: SpritesGenCrystal;
		gold: SpritesSilverGold;
		silver: SpritesSilverGold;
	},
	'generation-iii': {
		emerald: SpritesFrontNBack;
		'firered-leafgreen': SpritesFrontNBack;
		'ruby-sapphire': SpritesFrontNBack;
	},
	'generation-iv': {
		'diamond-pearl': SpritesFrontNBack;
		'heartgold-soulsilver': SpritesFrontNBack;
		platinum: SpritesFrontNBack;
	},
	'generation-v': {
		'black-white': SpritesFrontNBackVAnimated;
	},
	'generation-vi': {
		'omegaruby-alphasapphire': SpritesFrontalVShiny;
		'x-y': SpritesFrontalVShiny;
	},
	'generation-vii': {
		icons: SpritesFrontal;
		'ultra-sun-ultra-moon': SpritesFrontalVShiny;
	},
	'generations-viii': {
		icons: SpritesFrontal;
	},
}

export type EffectEntry = {
	effect: string;
	language: Data;
	short_effect: string;
};


export type Sprites = {
	back_default: string; // URL
	back_female?: string; // URL
	back_shiny: string; // ...
	back_shiny_female?: string;
	front_default: string;
	front_female?: string;
	front_shiny: string;
	front_shiny_female?: string;
  other: {
		dream_world: DreamWorld;
		home: Home;
		'official-artwork': OfficialArtwork;
	};
	versions: Versions;
};

export type Stat = {
	base_stat: number;
	effort: number;
	stat: Data;
};

export type Type = {
	slot: number;
	type: Data;
};

export type PokemonData = {
	abilities: Ability[];
	base_experience: number;
	game_indicies: GameIndex[];
	height: number;
	held_items: []; // TODO
	id: number;
	is_default: boolean;
	location_area_encounters: string; // URL
	moves: Move[];
	name: string;
	order: number;
	past_types: []; // TODO
	species: Data;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
	weight: number;
}

export type MoveData = {
	accuracy: null | number;
	contest_combos: null; // Todo
	contest_effect: {
		url: string;
	};
	contest_type: Data;
	damage_class: Data;
	effect_chance: number;
	effect_changes: []; // Todo
	effect_entries: EffectEntry[];
	flavor_text_entries: {
		flavor_text: string;
		language: Data;
		version_group: Data;
	}[];
	generation: Data;
	id: number;
	learned_by_pokemon: Data[];
	machines: []; // Todo
	meta: {
		ailment: Data;
		ailment_chance: number;
		category: Data;
		crit_rate: number;
		drain: number;
		flinch_chance: number;
		healing: number;
		max_hits: null; // Todo
		max_turns: null; // Todo
		min_hits: null; // Todo
		min_turns: null; // Todo
		stat_chance: number;
	};
	name: string;
	names: {
		name: string;
		language: Data;
	}[];
	past_values: []; // Todo
	power: null; // Todo
	pp: number;
	priority: number;
	stat_changes: {
		change: number;
		stat: Data;
	}[];
	super_contest_effect: {
		url: string;
	};
	target: Data;
	type: Data;
}

export type MoveDataRenderable = {
	accuracy: null | number;
	damage_class: Data;
	effect_chance: number;
	effect_changes: []; // Todo
	effect_entries: EffectEntry[];
	id: number;
	learned_by_pokemon: Data[];
	meta: {
		ailment: Data;
		ailment_chance: number;
		category: Data;
		crit_rate: number;
		drain: number;
		flinch_chance: number;
		healing: number;
		max_hits: null; // Todo
		max_turns: null; // Todo
		min_hits: null; // Todo
		min_turns: null; // Todo
		stat_chance: number;
	};
	name: string;
	power: null; // Todo
	stat_changes: {
		change: number;
		stat: Data;
	}[];
	target: Data;
	type: Data;
}

export type Moves = {
	[key: number]: MoveData
}

export type Abilities = {[key: number]: {
  name: string;
  effect: string;
  slot: number;
  isHidden: boolean;
}};

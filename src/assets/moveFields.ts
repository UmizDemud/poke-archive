import { sortOptions } from "./sortOptions";

export const moveFields: {
	[key: string]: string
} = {
	Name: 'name',
	Element: 'type/name',
	Power: 'power',
	Accuracy: 'accuracy',
	'Effect Chance': 'effect_chance',
	'Damage Class': 'damage_class/name',
	'Target Class': 'target/name'
};

/**
 * PokéAPI endpoints to fetch data and then store
 * that data at the specified destination as JSON files
 */

export const berriesLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/berry',
		destination: './out/berries/berry.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/berry-firmness',
		destination: './out/berries/berry-firmness.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/berry-flavor',
		destination: './out/berries/berry-flavor.json',
	},
];

export const contestsLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/contest-type',
		destination: './out/contests/contest-type.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/contest-effect',
		destination: './out/contests/contest-effect.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/super-contest-effect',
		destination: './out/contests/super-contest-effect.json',
	},
];

export const encountersLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/encounter-method',
		destination: './out/encounters/encounter-method.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/encounter-condition',
		destination: './out/encounters/encounter-condition.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/encounter-condition-value',
		destination: './out/encounters/encounter-condition-value.json',
	},
];

export const evolutionLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/evolution-chain',
		destination: './out/evolution/evolution-chain.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/evolution-trigger',
		destination: './out/evolution/evolution-trigger.json',
	},
];

export const gamesLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/generation',
		destination: './out/games/generation.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokedex',
		destination: './out/games/pokedex.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/version',
		destination: './out/games/version.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/version-group',
		destination: './out/games/version-group.json',
	},
];

export const itemsLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/item',
		destination: './out/items/item.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/item-attribute',
		destination: './out/items/item-attribute.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/item-category',
		destination: './out/items/item-category.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/item-fling-effect',
		destination: './out/items/item-fling-effect.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/item-pocket',
		destination: './out/items/item-pocket.json',
	},
];

export const locationsLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/location',
		destination: './out/locations/location.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/location-area',
		destination: './out/locations/location-area.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pal-park-area',
		destination: './out/locations/pal-park-area.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/region',
		destination: './out/locations/region.json',
	},
];

export const machinesLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/machine',
		destination: './out/machines/machine.json',
	},
];

export const movesLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/move',
		destination: './out/moves/move.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-ailment',
		destination: './out/moves/move-ailment.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-battle-style',
		destination: './out/moves/move-battle-style.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-category',
		destination: './out/moves/move-category.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-damage-class',
		destination: './out/moves/move-damage-class.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-learn-method',
		destination: './out/moves/move-learn-method.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/move-target',
		destination: './out/moves/move-target.json',
	},
];

export const pokemonLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/ability',
		destination: './out/pokemon/ability.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/characteristic',
		destination: './out/pokemon/characteristic.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/egg-group',
		destination: './out/pokemon/egg-group.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/gender',
		destination: './out/pokemon/gender.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/growth-rate',
		destination: './out/pokemon/growth-rate.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/nature',
		destination: './out/pokemon/nature.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokeathlon-stat',
		destination: './out/pokemon/pokeathlon-stat.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon',
		destination: './out/pokemon/pokemon.json',
		remove_keys: ['location_area_encounters'],
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon-color',
		destination: './out/pokemon/pokemon-color.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon-form',
		destination: './out/pokemon/pokemon-form.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon-habitat',
		destination: './out/pokemon/pokemon-habitat.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon-shape',
		destination: './out/pokemon/pokemon-shape.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/pokemon-species',
		destination: './out/pokemon/pokemon-species.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/stat',
		destination: './out/pokemon/stat.json',
	},
	{
		link: 'https://pokeapi.co/api/v2/type',
		destination: './out/pokemon/type.json',
	},
];

export const utilityLinksDestinations = [
	{
		link: 'https://pokeapi.co/api/v2/language',
		destination: './out/utility/language.json',
	},
];

export default [
	...berriesLinksDestinations,
	...contestsLinksDestinations,
	...encountersLinksDestinations,
	...evolutionLinksDestinations,
	...gamesLinksDestinations,
	...itemsLinksDestinations,
	...locationsLinksDestinations,
	...machinesLinksDestinations,
	...movesLinksDestinations,
	...pokemonLinksDestinations,
	...utilityLinksDestinations,
];

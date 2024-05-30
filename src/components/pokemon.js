import { typeChart } from '../utils/constants.js';

const DeterminePokemonRoles = (pokemon) => {
	const roles = [];
	const highThreshold = 110;
	const extremeThreshold = 130;

	const stats = pokemon.stats;
	const abilities = pokemon.abilities.map((ability) =>
		ability.name.toLowerCase()
	);
	const moves = pokemon.moves.map((move) => move.name.toLowerCase());

	if (stats.speed > extremeThreshold && stats.attack > highThreshold) {
		roles.push('physical-sweeper');
	}

	if (stats.speed > extremeThreshold && stats.special_attack > highThreshold) {
		roles.push('special-sweeper');
	}

	if (stats.hp > extremeThreshold && stats.defense > highThreshold) {
		roles.push('physical-tank');
	}

	if (stats.hp > extremeThreshold && stats.special_defense > highThreshold) {
		roles.push('special-tank');
	}

	if (
		abilities.includes('healer') ||
		abilities.includes('shield') ||
		abilities.includes('wish') ||
		abilities.includes('aromatherapy') ||
		moves.includes('wish') ||
		moves.includes('heal bell')
	) {
		roles.push('support');
	}

	if (stats.defense > extremeThreshold) {
		roles.push('physical-wall');
	}

	if (stats.special_defense > extremeThreshold) {
		roles.push('special-wall');
	}

	if (
		(stats.attack > extremeThreshold ||
			stats.special_attack > extremeThreshold) &&
		(moves.includes('close combat') ||
			moves.includes('flare blitz') ||
			moves.includes('focus blast') ||
			moves.includes('hyper beam') ||
			abilities.includes('sheer force') ||
			abilities.includes('reckless'))
	) {
		roles.push('wall-breaker');
	}

	if (
		abilities.includes('stall') ||
		abilities.includes('poison heal') ||
		moves.includes('toxic') ||
		moves.includes('leech seed') ||
		moves.includes('protect') ||
		moves.includes('substitute')
	) {
		roles.push('staller');
	}

	if (
		abilities.includes('stealth rock') ||
		abilities.includes('spikes') ||
		moves.includes('stealth rock') ||
		moves.includes('spikes') ||
		moves.includes('taunt') ||
		moves.includes('encore')
	) {
		roles.push('lead');
	}

	if (
		stats.speed > extremeThreshold &&
		(moves.includes('u-turn') ||
			moves.includes('volt switch') ||
			abilities.includes('regenerator'))
	) {
		roles.push('scout');
	}

	if (
		(stats.attack > extremeThreshold ||
			stats.special_attack > extremeThreshold) &&
		stats.defense < highThreshold &&
		stats.special_defense < highThreshold
	) {
		roles.push('glass-cannon');
	}

	if (
		(stats.attack > highThreshold || stats.special_attack > highThreshold) &&
		(stats.defense > highThreshold || stats.special_defense > highThreshold)
	) {
		roles.push('bulky-attacker');
	}

	if (
		abilities.includes('rapid spin') ||
		abilities.includes('defog') ||
		moves.includes('rapid spin') ||
		moves.includes('defog') ||
		moves.includes('sticky web') ||
		moves.includes('knock off')
	) {
		roles.push('utility');
	}

	return roles;
};

const AnalysePokemonTyping = (pokemon) => {
	const resistances = {};
	const weaknesses = {};

	pokemon.types.forEach((type) => {
		Object.keys(typeChart).forEach((key) => {
			if (typeChart[key][type] < 1) resistances[key] = 1;
			else if (typeChart[key][type] > 1) weaknesses[key] = 1;
		});
	});

	return { resistances, weaknesses };
};

const LastPokemonInEvolutionChain = (species, evolutionChain) => {
	const chainLinks = [evolutionChain];
	const checkedChainLinks = new Set();

	while (chainLinks.length) {
		const link = chainLinks.shift();

		if (!checkedChainLinks.has(link)) {
			checkedChainLinks.add(link);

			if (link.evolves_to.length === 0 && link.species.name === species.name)
				return true;

			for (const connectedLink of link.evolves_to) {
				chainLinks.push(connectedLink);
			}
		}
	}

	return false;
};

const FormatPokemon = (pokemon, species, evolutionChain) => {
	pokemon = {
		id: pokemon.id,
		name: pokemon.name,
		types: pokemon.types.map((type) => type.type.name),
		stats: {
			hp: pokemon.stats.find((stat) => stat.stat.name === 'hp').base_stat,
			attack: pokemon.stats.find((stat) => stat.stat.name === 'attack')
				.base_stat,
			defense: pokemon.stats.find((stat) => stat.stat.name === 'defense')
				.base_stat,
			special_attack: pokemon.stats.find(
				(stat) => stat.stat.name === 'special-attack'
			).base_stat,
			special_defense: pokemon.stats.find(
				(stat) => stat.stat.name === 'special-defense'
			).base_stat,
			speed: pokemon.stats.find((stat) => stat.stat.name === 'speed').base_stat,
			total: pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0),
		},
		abilities: pokemon.abilities.map((ability) => {
			return {
				name: ability.ability.name,
				is_hidden: ability.is_hidden,
			};
		}),
		moves: pokemon.moves.map((move) => {
			return {
				name: move.move.name,
			};
		}),
		resistances: null,
		weaknesses: null,
		roles: null,
		species: {
			id: species.id,
			name: species.name,
			is_baby: species.is_baby,
			is_fully_evolved: null,
			is_legendary: species.is_legendary,
			is_mythical: species.is_mythical,
			is_mega: pokemon.name.includes('-mega'),
			is_gmax: pokemon.name.includes('-gmax'),
			generation: species.generation.name,
		},
		sprite: pokemon.sprites.front_default,
	};

	const roles = DeterminePokemonRoles(pokemon);
	const { resistances, weaknesses } = AnalysePokemonTyping(pokemon);
	const fullyEvolved = LastPokemonInEvolutionChain(species, evolutionChain);

	pokemon.resistances = resistances;
	pokemon.weaknesses = weaknesses;
	pokemon.roles = roles;
	pokemon.species.is_fully_evolved = fullyEvolved;

	return pokemon;
};

export default FormatPokemon;

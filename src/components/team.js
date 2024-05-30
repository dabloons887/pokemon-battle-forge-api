import { typeChart, battleStyles } from './constants.js';

const DEFAULT_OPTIONS = {
	battleStyle: 'mixedOffense',
	fullyEvolved: true,
	includeLegendaries: false,
	includeMythical: false,
	includeMegas: false,
	includeGmaxed: false,
	generations: {
		'generation-i': true,
		'generation-ii': true,
		'generation-iii': true,
		'generation-iv': true,
		'generation-v': true,
		'generation-vi': true,
		'generation-vii': true,
		'generation-viii': true,
		'generation-ix': true,
	},
	blacklist: [],
	duplicates: false,
	weights: {
		typeResistance: 1,
		typeWeakness: 5,
	},
	randomFactor: 0.5,
};

const AnalyseTeamTyping = (team) => {
	const resistances = {};
	const weaknesses = {};

	team.forEach((pokemon) => {
		Object.keys(pokemon.resistances).forEach((key) => {
			resistances[key] = (resistances[key] || 0) + pokemon.resistances[key];
		});

		Object.keys(pokemon.weaknesses).forEach((key) => {
			weaknesses[key] = (weaknesses[key] || 0) + pokemon.weaknesses[key];
		});
	});

	Object.keys(typeChart).forEach((key) => {
		if (resistances[key] && weaknesses[key]) {
			const differnce = resistances[key] - weaknesses[key];
			resistances[key] = differnce;
			weaknesses[key] = -differnce;

			if (resistances[key] <= 0) delete resistances[key];
			if (weaknesses[key] <= 0) delete weaknesses[key];
		}
	});

	return { resistances, weaknesses };
};

const AnalyseTeamRoles = (team, battleStyle) => {
	const roleCounts = {
		'physical-sweeper': 0,
		'special-sweeper': 0,
		'physical-tank': 0,
		'special-tank': 0,
		support: 0,
		'physical-wall': 0,
		'special-wall': 0,
		'wall-breaker': 0,
		staller: 0,
		lead: 0,
		scout: 0,
		'glass-cannon': 0,
		'bulky-attacker': 0,
		utility: 0,
	};

	team.forEach((pokemon) => {
		pokemon.roles.forEach((role) => {
			roleCounts[role] += 1;
		});
	});

	const neededRoles = [];

	Object.entries(roleCounts).forEach(([role, count]) => {
		if (count < battleStyles[battleStyle][role]) {
			neededRoles.push(role);
		}
	});

	return neededRoles;
};

const CalculateTeamScore = (team, resistanceWeight, weaknessWeight) => {
	const { resistances, weaknesses } = AnalyseTeamTyping(team);

	let score = 0;
	resistanceWeight =
		Object.keys(weaknesses).length === 0 ? 2 : resistanceWeight;
	weaknessWeight = -weaknessWeight;

	Object.keys(typeChart).forEach((key) => {
		if (resistances[key]) score += resistances[key] * resistanceWeight;
		if (weaknesses[key]) score += weaknesses[key] * weaknessWeight;
	});

	return score;
};

const ValidatePokemon = (pokemon, options) => {
	if (options.fullyEvolved && !pokemon.species.is_fully_evolved) return false;
	if (!options.includeLegendaries && pokemon.species.is_legendary) return false;
	if (!options.includeMythical && pokemon.species.is_mythical) return false;
	if (!options.includeMegas && pokemon.species.is_mega) return false;
	if (!options.includeGmaxed && pokemon.species.is_gmax) return false;

	for (const [key, value] of Object.entries(options.generations)) {
		if (!value && key === pokemon.species.generation) {
			return false;
		}
	}

	if (options.blacklist.includes(pokemon.name)) return false;

	return true;
};

const SelectBestPokemon = (pokedex, team, options) => {
	let bestPokemon = null;
	let bestScore = -Infinity;

	const neededRoles = AnalyseTeamRoles(team, options.battleStyle);

	pokedex.forEach((pokemon) => {
		if (!team.find((teamMember) => teamMember.id === pokemon.id)) {
			let rolesFilled = 0;
			let rolePriorityScore = 0;
			const randomFactor = Math.round(
				Math.random() * 100 * options.randomFactor
			);

			const teamScore = CalculateTeamScore(
				[...team, pokemon],
				options.weights.typeResistance,
				options.weights.typeWeakness
			);

			pokemon.roles.forEach((role) => {
				if (neededRoles.includes(role)) {
					rolesFilled++;
					rolePriorityScore += neededRoles.indexOf(role) + 1;
				}
			});

			rolePriorityScore = neededRoles.length - rolePriorityScore;

			const overallScore =
				teamScore + rolesFilled * 2 + rolePriorityScore + randomFactor;

			if (overallScore > bestScore) {
				bestScore = overallScore;
				bestPokemon = pokemon;
			}
		}
	});

	return bestPokemon;
};

const GenerateTeam = (pokedex, team, options = DEFAULT_OPTIONS) => {
	const filteredPokedex = new Map();
	for (let [pokemonName, pokemonData] of pokedex) {
		if (ValidatePokemon(pokemonData, options))
			filteredPokedex.set(pokemonName, pokemonData);
	}

	if (!battleStyles[options.battleStyle]) {
		const availableBattleStyles = Object.keys(battleStyles);

		options.battleStyle =
			availableBattleStyles[
				Math.floor(Math.random() * availableBattleStyles.length)
			];
	}

	while (team.length < 6) {
		const bestPokemon = SelectBestPokemon(filteredPokedex, team, options);

		if (bestPokemon) {
			team.push(bestPokemon);
			!options.duplicates && filteredPokedex.delete(bestPokemon.name);
		} else {
			break;
		}
	}

	const { resistances, weaknesses } = AnalyseTeamTyping(team);

	return { team, resistances, weaknesses };
};

export default GenerateTeam;

import Fastify from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import GetPokedex from './components/pokedex.js';
import GenerateTeam from './components/team.js';

const fastify = Fastify({
	logger: true,
	pluginTimeout: 1000 * 60,
});

fastify.register(
	fastifyPlugin(async function (fastify, options) {
		fastify.decorate('pokedex', await GetPokedex());
		console.log('\x1b[34m%s\x1b[0m', 'Pokedex ready!');
	})
);

const schema = {
	body: {
		type: 'object',
		properties: {
			team: {
				type: 'array',
				items: { type: 'string' },
			},
			options: {
				type: 'object',
				properties: {
					battleStyle: { type: 'string' },
					fullyEvolved: { type: 'number' },
					includeLegendaries: { type: 'boolean' },
					includeMythical: { type: 'boolean' },
					includeMegas: { type: 'boolean' },
					includeGmaxed: { type: 'boolean' },
					generations: {
						type: 'object',
						patternProperties: {
							'^[a-zA-Z0-9]+$': { type: 'boolean' },
						},
					},
					blacklist: {
						type: 'array',
						items: { type: 'string' },
					},
					duplicates: { type: 'boolean' },
					weights: {
						type: 'object',
						properties: {
							typeResistance: { type: 'number' },
							typeWeakness: { type: 'number' },
						},
					},
					randomFactor: { type: 'number' },
				},
			},
		},
	},
	response: {
		200: {
			type: 'object',
			properties: {
				team: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							id: { type: 'number' },
							name: { type: 'string' },
							types: {
								type: 'array',
								items: { type: 'string' },
							},
							stats: {
								type: 'object',
								properties: {
									hp: { type: 'number' },
									attack: { type: 'number' },
									defense: { type: 'number' },
									specialAttack: { type: 'number' },
									specialDefense: { type: 'number' },
									speed: { type: 'number' },
									total: { type: 'number' },
								},
							},
							abilities: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										name: { type: 'string' },
										is_hidden: { type: 'boolean' },
									},
								},
							},
							moves: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										name: { type: 'string' },
									},
								},
							},
							resistances: {
								type: 'object',
								patternProperties: {
									'^[a-zA-Z0-9]+$': { type: 'number' },
								},
							},
							weaknesses: {
								type: 'object',
								patternProperties: {
									'^[a-zA-Z0-9]+$': { type: 'number' },
								},
							},
							roles: {
								type: 'array',
								items: { type: 'string' },
							},
							species: {
								type: 'object',
								properties: {
									id: { type: 'number' },
									name: { type: 'string' },
									is_baby: { type: 'boolean' },
									is_fully_evolved: { type: 'boolean' },
									is_legendary: { type: 'boolean' },
									is_mythical: { type: 'boolean' },
									is_mega: { type: 'boolean' },
									is_gmax: { type: 'boolean' },
									generation: { type: 'string' },
								},
							},
							sprite: { type: 'string' },
						},
					},
				},
				resistances: {
					type: 'object',
					patternProperties: {
						'^[a-zA-Z0-9]+$': { type: 'number' },
					},
				},
				weaknesses: {
					type: 'object',
					patternProperties: {
						'^[a-zA-Z0-9]+$': { type: 'number' },
					},
				},
			},
		},
	},
};

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

fastify.post('/generate-team', { schema }, function (request, reply) {
	const pokedex = fastify.pokedex;

	const team = request.body.team
		.map((pokemon) => pokedex.get(pokemon.trim().toLowerCase()))
		.filter((pokemon) => pokemon);

	const options = {
		...DEFAULT_OPTIONS,
		...request.body.options,
		generations: {
			...DEFAULT_OPTIONS.generations,
			...request.body.options.generations,
		},
		weights: {
			...DEFAULT_OPTIONS.weights,
			...request.body.options.weights,
		},
	};

	return GenerateTeam(pokedex, team, options);
});

fastify.listen({ port: 3000, host: '127.0.0.1' }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	console.log('\x1b[36m%s\x1b[0m', `Server listening on ${address}`);
});

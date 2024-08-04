import Fastify from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

import GetPokedex from './components/pokedex.js';
import GenerateTeam from './components/team.js';

import generateTeamSchema from './schemas/generate-team-schema.js';

async function init() {
	const fastify = Fastify({
		logger: true,
		pluginTimeout: 0,
	});

	await fastify.register(fastifyCors, {
		origin: '*',
	});

	fastify.register(
		fastifyPlugin(async function (fastify, _options) {
			fastify.decorate(
				'pokedex',
				await GetPokedex(
					process.env.REGENERATE_DATA || false,
					process.env.USE_BACKUP_DATA || false
				)
			);
			console.log('\x1b[34m%s\x1b[0m', 'Pokedex ready!');
		})
	);

	fastify.post(
		'/generate-team',
		{ schema: generateTeamSchema },
		function (request, reply) {
			const pokedex = fastify.pokedex;

			try {
				const team = request.body.team
					.map((pokemon) => pokedex.get(pokemon.trim().toLowerCase()))
					.filter((pokemon) => pokemon);

				return GenerateTeam(pokedex, team, request.body.options);
			} catch (err) {
				reply.code(400).send({ team: [], resistances: {}, weaknesses: {} });
			}
		}
	);

	return fastify;
}

export default init;

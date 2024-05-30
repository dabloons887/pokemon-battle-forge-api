import Fastify from 'fastify';
import GetPokedex from './components/pokedex.js';

const fastify = Fastify({
	logger: true,
	pluginTimeout: 1000 * 60,
});

fastify.register(async function (fastify, options) {
	fastify.decorate('pokedex', await GetPokedex());
	console.log('\x1b[36m%s\x1b[0m', 'Pokedex ready!');
});

fastify.get('/', function (request, reply) {
	return { msg: 'hakuna matata' };
});

fastify.listen({ port: 3000, host: '127.0.0.1' }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	console.log('\x1b[36m%s\x1b[0m', `Server listening on ${address}`);
});

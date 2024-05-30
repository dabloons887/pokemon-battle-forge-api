import path from 'path';
import fs from 'fs/promises';

import {
	evolutionLinksDestinations,
	pokemonLinksDestinations,
} from '../lib/links-destinations.js';
import { FetchData, FormatData } from '../lib/utils.js';

const GetPokedex = async (regenerateData = false) => {
	let dataFetchedSuccessfully = false;

	if (regenerateData) {
		try {
			console.log('Fetching data...');
			await FetchData([
				...evolutionLinksDestinations,
				...pokemonLinksDestinations,
			]);
			console.log('Formatting data...');
			await FormatData([
				...evolutionLinksDestinations,
				...pokemonLinksDestinations,
			]);
			dataFetchedSuccessfully = true;
		} catch (err) {
			console.log('Failed to regenerate data :(');
			console.log('Using previously generated data.');
		}
	}

	if (regenerateData && dataFetchedSuccessfully) {
		try {
			return await GeneratePokedex();
		} catch (err) {
			console.log('Something broke :(');
		}
	} else {
		try {
			return await RetrievePokedex();
		} catch (err) {
			try {
				return await GeneratePokedex();
			} catch (err) {
				console.log('Something broke :(');
			}
		}
	}
};

const GeneratePokedex = async () => {
	const pokemonFile = JSON.parse(
		await fs.readFile(path.resolve(pokemonLinksDestinations[7].destination))
	);

	const pokemonSpeciesFile = JSON.parse(
		await fs.readFile(path.resolve(pokemonLinksDestinations[12].destination))
	);

	const evolutionChainFile = JSON.parse(
		await fs.readFile(path.resolve(evolutionLinksDestinations[0].destination))
	);

	const pokemonData = new Map(
		pokemonFile
			.filter((mon) => mon.sprites.front_default)
			.map((mon) => [
				mon.name,
				null, // todo: format pokemon data
			])
	);

	await fs.writeFile(
		path.resolve('./out/data.json'),
		JSON.stringify([...pokemonData]),
		() => {}
	);

	return pokemonData;
};

const RetrievePokedex = async () => {
	return new Map(
		JSON.parse(await fs.readFile(path.resolve('./out/data.json')))
	);
};

export default GetPokedex;

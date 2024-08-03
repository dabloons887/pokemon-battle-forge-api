import path from 'path';
import fs from 'fs/promises';

import {
	evolutionLinksDestinations,
	pokemonLinksDestinations,
} from '../utils/links-destinations.js';
import { FetchData, FormatData } from '../utils/helpers.js';

import FormatPokemon from './pokemon.js';

const DATA_LOCATION = path.resolve('./out/data.json');
const BACKUP_DATA_LOCATION = path.resolve('./backup_data.json');

async function GetPokedex(regenerateData = false, useBackupData = false) {
	let dataExists = false;

	if (useBackupData) {
		try {
			console.log('Using backup data.');
			return await RetrievePokedex(BACKUP_DATA_LOCATION);
		} catch (err) {
			console.log('Something broke :(');
		}
	}

	try {
		await fs.access(path.dirname(DATA_LOCATION));
		dataExists = true;
	} catch (error) {
		dataExists = false;
	}

	if (regenerateData) {
		try {
			await FetchAndFormatData();
			return await GeneratePokedex();
		} catch (err) {
			console.log('Something broke :(');
			console.log('Using previously generated data.');
		}
	}

	if (dataExists) {
		try {
			return await RetrievePokedex();
		} catch (err) {
			try {
				return await GeneratePokedex();
			} catch (err) {
				console.log('Something broke :(');
			}
		}
	} else {
		try {
			await FetchAndFormatData();
			return await GeneratePokedex();
		} catch (err) {
			console.log('Something broke :(');
		}
	}

	try {
		console.log('Using backup data.');
		return await RetrievePokedex(BACKUP_DATA_LOCATION);
	} catch (err) {
		console.log('Something broke :(');
	}
}

async function FetchAndFormatData() {
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
	} catch (err) {
		console.log('Failed to regenerate data :(');
	}
}

async function GeneratePokedex() {
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
				FormatPokemon(
					mon,
					pokemonSpeciesFile[mon.species.id - 1],
					evolutionChainFile.find(
						(chain) =>
							chain.id ==
							pokemonSpeciesFile[mon.species.id - 1].evolution_chain.id
					).chain
				),
			])
	);

	await fs.writeFile(DATA_LOCATION, JSON.stringify([...pokemonData]));

	return pokemonData;
}

async function RetrievePokedex(path = DATA_LOCATION) {
	return new Map(JSON.parse(await fs.readFile(path)));
}

export default GetPokedex;

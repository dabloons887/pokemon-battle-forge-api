import path from 'path';
import fs from 'fs/promises';

import axios from 'axios';

async function GeneratePath(filePath) {
	const dir = path.dirname(filePath);
	await fs.mkdir(dir, { recursive: true });
}

function ExtractUrlId(url) {
	return url.match(/(\d+)(?=\/?$)/)[0];
}

function ReplaceUrls(obj) {
	if (obj === null || typeof obj !== 'object') return;

	if (obj.url !== undefined) {
		obj.id = ExtractUrlId(obj.url);
		delete obj.url;
	}

	for (let key in obj) if (typeof obj[key] === 'object') ReplaceUrls(obj[key]);
}

function RemoveKeys(obj, keys) {
	obj.forEach((el) => {
		keys.forEach((key) => {
			delete el[key];
		});
	});
}

export async function FetchData(
	linksDestinations,
	offset = 0,
	limit = 1000000
) {
	await Promise.all(
		linksDestinations.map(async (linkDestination) => {
			const destination = path.resolve(linkDestination.destination);

			let result = await axios(
				`${linkDestination.link}?offset=${offset}&limit=${limit}`
			);

			result = await Promise.all(
				result.data.results.map(async (url) => await axios(url))
			);

			result = result.map((promise) => promise.data);

			if (linkDestination.remove_keys !== undefined) {
				RemoveKeys(result, linkDestination.remove_keys);
			}

			await GeneratePath(destination);

			await fs.writeFile(destination, JSON.stringify(result), () => {});
		})
	);
}

export async function FormatData(linksDestinations) {
	await Promise.all(
		linksDestinations.map(async (linkDestination) => {
			const destination = path.resolve(linkDestination.destination);

			const data = JSON.parse(await fs.readFile(destination));

			ReplaceUrls(data);

			await fs.writeFile(destination, JSON.stringify(data), () => {});
		})
	);
}

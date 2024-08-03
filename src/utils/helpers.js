/**
 * Helper functions.
 * Most are used to fetch and format data.
 */

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

function Delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function AxiosWithRetry(url, retries = 3, timeout = 10000) {
	for (let i = 0; i < retries; i++) {
		try {
			const response = await axios.get(url, { timeout });
			if (response.status !== 200) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.data;
		} catch (error) {
			if (i === retries - 1) throw error;
			await Delay(1000 * (i + 1));
		}
	}
}

export async function FetchData(
	linksDestinations,
	offset = 0,
	limit = 1000000
) {
	const results = await Promise.all(
		linksDestinations.map(async (linkDestination) => {
			const destination = path.resolve(linkDestination.destination);
			const url = `${linkDestination.link}?offset=${offset}&limit=${limit}`;

			const listData = await AxiosWithRetry(url);

			if (!listData.results || listData.results.length === 0) {
				return null;
			}

			const detailedData = await Promise.all(
				listData.results.map(async ({ url }, index) => {
					await Delay(index * 100);
					const data = await AxiosWithRetry(url);
					return data;
				})
			);

			let result = detailedData.filter((item) => item !== null);

			if (linkDestination.remove_keys !== undefined) {
				RemoveKeys(result, linkDestination.remove_keys);
			}

			await GeneratePath(destination);
			await fs.writeFile(destination, JSON.stringify(result));

			return { destination, result };
		})
	);

	return results.filter((result) => result !== null);
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

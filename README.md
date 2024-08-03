# Pokémon Battle Forge API

This API allows you to generate Pokémon teams for battles, making it easier to plan and strategize your Pokémon battles.

> Built using Fastify.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- Generate random Pokémon teams based on specific criteria
- Customize team generation with various parameters

## Installation

To set up and run Pokémon Battle Forge API, follow these steps:

1. Clone the repository:
   `git clone https://github.com/speedyibbi/pokemon-battle-forge-api.git`
   `cd pokemon-battle-forge-api`

2. Install dependencies: `npm install`

3. Start the development environment: `npm run dev`

4. Start the production environment: `npm start`

> A Docker file is also provided for containerization.

## Endpoints

### Generate Team

- **Endpoint**: `POST /generate-team`
- **Description**: Generates a Pokémon team based on the provided criteria. The request body should include a list of Pokémon names and various options to customize the team generation.

#### Request

**Content-Type**: `application/json`

**Body**:

```json
{
	"team": ["charizard"],
	"options": {
		"battleStyle": "mixedOffense",
		"fullyEvolved": true,
		"includeLegendaries": false,
		"includeMythical": false,
		"includeMegas": false,
		"includeGmaxed": false,
		"generations": {
			"generation-i": true,
			"generation-ii": true,
			"generation-iii": true,
			"generation-iv": true,
			"generation-v": true,
			"generation-vi": true,
			"generation-vii": true,
			"generation-viii": true,
			"generation-ix": true
		},
		"blacklist": [],
		"duplicates": false,
		"weights": {
			"typeResistance": 1,
			"typeWeakness": 5
		},
		"randomFactor": 0.5
	}
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

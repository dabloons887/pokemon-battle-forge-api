export default {
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

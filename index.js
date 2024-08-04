import awsLambdaFastify from '@fastify/aws-lambda';
import init from './src/index.js';

const proxy = awsLambdaFastify(await init());

export const handler = proxy;

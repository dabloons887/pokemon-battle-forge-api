import awsLambdaFastify from '@fastify/aws-lambda';
import init from './src/index.js';

const proxy = awsLambdaFastify(init());

export const handler = proxy;

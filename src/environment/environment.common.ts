import { Environment } from './environment.d';

//const baseUrl: string = 'http://localhost:8089';
const baseUrl: string = 'http://42.192.52.209:8089';

export const environment: Environment = {
	baseUrl,
	userBaseUrl: `${baseUrl}/api/users`,
	roleBaseUrl: `${baseUrl}/api/roles`,
	securityBaseUrl: `${baseUrl}/api/security`,
};

import * as service from './service';
import { environment } from '../environment/environment';


export async function fakeAccountLogin(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/user/login`, payload);
}

export async function GetGurisdiction(id: any): Promise<any> {
	return await service.get(`${environment.baseUrl}/user/getGurisdiction?id=${id}`);
}
 
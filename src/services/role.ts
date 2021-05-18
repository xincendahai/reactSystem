import { environment } from './../environment/environment';
import * as service from './service';

export async function RoleType(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/role/roleClassification`, payload);
}

export async function DeleteRole(id: any): Promise<any> {
	return await service.get(`${environment.baseUrl}/role/deleteRole?id=${id}`);
}
export async function ModifyRole(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/role/mobifyRoleMenu`, payload);
}
export async function AddRole(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/role/addRoleMenu`, payload);
}
export async function QueryRoleList(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/role/roleData`, payload);
}

export async function QueryMenuAll(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/menu/queryMenuAll`, payload);
}


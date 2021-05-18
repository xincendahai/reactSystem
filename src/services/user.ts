import request from '@/utils/request';
import { environment } from './../environment/environment';

import * as service from './service';

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}


export async function QueryUserList(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/user/queryUsersAllList`, payload);
}
export async function AddUser(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/user/addUser`, payload);
}
export async function ModifyUser(payload: any): Promise<any> {
	return await service.post(`${environment.baseUrl}/user/modifyUserData`, payload);
}
export async function DeleteUser(id: any): Promise<any> {
	return await service.get(`${environment.baseUrl}/user/deleteUser?id=${id}`);
}
export async function Export(payload: any): Promise<any> {
	return await service.get(`${environment.baseUrl}/user/export`, payload);
}

import type { Effect, Reducer } from 'umi';
import { QueryUserList , AddUser , ModifyUser , DeleteUser , Export } from '@/services/user';
import { fakeAccountLogin } from '@/services/login';
import { message } from 'antd';



export interface StateType {
	items: User[];
	total: number;
	currentItem?: User;
}

export interface ModelType {
	namespace: string;
	state: StateType;
	effects: BasicEffect;
	reducers: {
		save: Reducer<StateType>;
	};
}


const UserModel: ModelType = {
	namespace: 'userManagement',
	state: {
		rows: [],
		total: 0,
	},
	effects: {
		*fetch({ payload }, { call, put }) {
      const response = yield call(QueryUserList, payload);
			const data = response.data;
			yield put({
				type: 'save',
				payload: data,
			});
		},
    
	},
	reducers: {
	  save(state, { payload }) {
        return {
          ...state,
          rows: payload.rows || [],
          total: payload.records,
         };
		},
	},
};

export default UserModel;

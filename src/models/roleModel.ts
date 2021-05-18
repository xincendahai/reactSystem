import type { Effect, Reducer } from 'umi';
import { RoleType , QueryMenuAll } from '@/services/role';
import { fakeAccountLogin } from '@/services/login';



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


const RoleModel: ModelType = {
	namespace: 'roleManagement',
	state: {
		menuArr:[],
    roles:[]
	},
	effects: {
    *roleTypeData({ payload }, { call, put }) {
      const response = yield call(RoleType, payload);
			const data = response.data;
			yield put({
				type: 'role',
				payload: data,
			});
		},
    *MenuData({ payload }, { call, put }) {
      const response = yield call(QueryMenuAll, payload);
			const data = response.data;
			yield put({
				type: 'menu',
				payload: data,
			});
		},
	},
	reducers: {
		role(state, { payload }) {
      return {
        ...state,
        roles: payload || {},
      };
		},
    menu(state, { payload }) {
      return {
        ...state,
        menuArr: payload || {},
      };
    },

	},
};

export default RoleModel;

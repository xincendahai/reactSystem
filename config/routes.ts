export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/SystemManagement/User',
              },
              {
                path: '/SystemManagement',
                name: '系统管理',
                icon: 'smile',
                routes: [
                  {
                    path: '/SystemManagement/User',
                    name: '用户管理',
                    icon: 'smile',
                    component: './SystemManagement/User/index.tsx',
                  },
                  {
                    path: '/SystemManagement/Role',
                    name: '角色管理',
                    icon: 'smile',
                    component: './SystemManagement/Role/index.tsx',
                  }
                ],
              },
              {
                path: '/DataCenter/DataCenter',
                name: '数据中心',
                component: './DataCenter/index.tsx',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

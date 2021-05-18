// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/xiangmingxin/Wicrecend/henrui/node_modules/_@umijs_runtime@3.4.11@@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Users/xiangmingxin/Wicrecend/henrui/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/xiangmingxin/Wicrecend/henrui/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/xiangmingxin/Wicrecend/henrui/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/xiangmingxin/Wicrecend/henrui/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/",
                "redirect": "/SystemManagement/User",
                "exact": true
              },
              {
                "path": "/SystemManagement",
                "name": "系统管理",
                "icon": "smile",
                "routes": [
                  {
                    "path": "/SystemManagement/User",
                    "name": "用户管理",
                    "icon": "smile",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SystemManagement__User__index' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/SystemManagement/User/index.tsx'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/SystemManagement/Role",
                    "name": "角色管理",
                    "icon": "smile",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SystemManagement__Role__index' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/SystemManagement/Role/index.tsx'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/DataCenter/DataCenter",
                "name": "数据中心",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__DataCenter__index' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/DataCenter/index.tsx'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/xiangmingxin/Wicrecend/henrui/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}


import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import {  FormattedMessage } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
// import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import { UserOutlined , SettingOutlined } from '@ant-design/icons';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
const iconE = {
   user:<UserOutlined />,
   SettingOutlined:<SettingOutlined />,
};

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 恒瑞医药版权所有`}
    links={[
    	   {
    		    key: '京ICP备20200213231d号',
    		    title: '京ICP备2020041601号',
    	      href: 'https://beian.miit.gov.cn',
    	      blankTarget: true,
    	   }
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  let dataMenu = []
  if(JSON.parse(sessionStorage.getItem("menuList")) != null){
     let data = JSON.parse(sessionStorage.getItem("menuList"))
     if(data.length > 0 ){
          data.map((item,index)=>{
             if(item.name === "SystemManagement"){
             			item.icon = iconE.user
             }else{
             		 item.icon = iconE.SettingOutlined
             }
             item.name =  <FormattedMessage  id={'component.menu.'+`${item.name}`}  />

             if(item.children.length > 0){
                item.children.map((val,key)=>{
                     val.name =  <FormattedMessage  id={'component.menu.'+`${val.name}`}  />
                })
             }
          })
     }
    dataMenu = data
  }
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // const authorized = useMemo(
  //   () =>
  //     getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
  //       authority: undefined,
  //     },
  //   [location.pathname],
  // );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}
      // formatMessage={formatMessage}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => {
        if (settings.footerRender || settings.footerRender === undefined) {
          return defaultFooterDom;
        }
        return null;
      }}
      menuDataRender={()=>dataMenu}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
     {/* <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized> */}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);

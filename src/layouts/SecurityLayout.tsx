import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {


  componentDidMount() {
    // this.setState({
    //   isReady: true,
    // });
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
  }

  render() {
    const { children } = this.props;
    // let isLogin = true
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    if (sessionStorage.getItem("isLogin") == null || sessionStorage.getItem("isLogin") == false ) {
      return <Redirect to={`/user/login`} />;
    }
    return children;
  }
}

export default SecurityLayout;

import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin ,Modal , Form ,Input } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';
import type { ConnectProps } from 'umi';
import { history, connect , Redirect} from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import UserForm from './userForm'
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
} & Partial<ConnectProps>;
// const intl = useIntl();
class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
      status:1,
      data:{},
      userData:{},
      icon:'http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_8_qAIlFXAAAcIhVPdSg994.png'
    }
  }
  componentDidMount = () => {
      this.setState({userData:JSON.parse(localStorage.getItem("userData"))})
  };
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    if (key === 'logout') {
      sessionStorage.setItem("isLogin",false);
      history.replace({
        pathname: '/user/login',
      });
      return;
    }
    if (key === 'center') {
      this.setState({onEdit:true})
      return;
    }
  };

  onCancel = () => {
  	this.setState({ onEdit: false });
  };

  onSubmit = (user) => {
      this.setState({ onEdit: false });
  };
  render(): React.ReactNode {
    const {
      menu,
    } = this.props;
     const { onEdit , status , data } = this.state;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <UserOutlined />
            退出登录
        </Menu.Item>
		   <Menu.Item key="center">
       <SettingOutlined />
            个人中心
       </Menu.Item>
      </Menu>
    );
    const { userData } = this.state
    return (
    <div>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={this.state.icon} alt="avatar" />
          <span className={`${styles.name} anticon`}>{ userData.username}</span>
        </span>
      </HeaderDropdown>
      <UserForm
        visible={onEdit}
        status={status}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        data={userData}/>
      </div>
      )
  }
}

export default AvatarDropdown;

import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Form, Input, Button, Checkbox, Divider,Table ,Popover , Popconfirm ,message} from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { StateType } from './userModel';
import { AddUser , ModifyUser , DeleteUser , QueryUserList } from '@/services/user';
import SearchForm from './components/SearchForm';
import ModuleForm from './components/ModuleForm';
import Breadcrumb from '@/components/Globle/breadcrumb.js';

import Box from '@/components/ComponentContainer';

import { connect, ConnectProps,  FormattedMessage, Dispatch,  history } from 'umi';
const paginations = {
  page: 1,
  pageSize: 10,
  showTotal: total => `总共 ${total} 条`
}
class User extends React.Component{
  constructor(props) {
  	super(props);
    this.state = {
      onEdit: false,
      pagination: {
        page: 1,
        pageSize: 10,
        showTotal: total => `总共 ${total} 条`
      },
      status:1,
      data:{},
      searchFormData:{},
      dataList:[],
      loading: true,
    }
  }
  componentDidMount = () => {
  	 this.getData()
  };

  /* 获取初使数据 */
  getData = () =>{
    QueryUserList({ page: 1, pageSize: 10 }).then((res)=>{
        if(res.status == 200){
            let pagination  = this.state.pagination
            pagination.total = res.data.records
            this.setState({pagination,dataList:res.data.rows,loading:false})
         }else{
            message.error(res.msg);
            this.setState({loading:false})
        }
    })
  }
  /* 搜索、 清空 */
  getResetState = (values) =>{
      QueryUserList(values).then((res)=>{
          if(res.status == 200){
              let pagination  = this.state.pagination
              pagination.total = res.data.records
              this.setState({pagination,dataList:res.data.rows,loading:false})
           }else{
              message.error(res.msg);
              this.setState({loading:false})
          }
      })
  }

  /* 删除 */
  delete = (id) =>{
    DeleteUser(id).then((res)=>{
        if(res.status == 200){
           this.getResetState(paginations)
           message.success('修改数据成功！');
        }else{
           message.error(res.msg);
        }
    })
  }

  onSubmit = (user) => {
      let param = Object.assign(this.state.pagination, this.state.searchFormData)
      if(user.id > 0){
        ModifyUser(user).then((res)=>{
            if(res.status == 200){
               this.getResetState(param)
               message.success('修改数据成功!');
            }else{
               message.error(res.msg);
            }
        })
      }else{
        AddUser(user).then((res)=>{
            if(res.status == 200){
               this.getResetState(param)
               message.success('新增数据成功！');
            }else{
               message.error(res.msg);
            }
        })
      }
      this.setState({ onEdit: false });
  };

  /* 关闭弹框 */
  onCancel = () => {
  	this.setState({ onEdit: false });
  };

  modifyData = (record) =>{
    this.props.dispatch({
    	type: 'roleManagement/roleTypeData',
    	payload: {},
    });
    this.setState({ onEdit: true , status : 0 ,data:record})
  }

  onChange = (pagination) => {
    let paginations = this.state.pagination
    paginations.page = pagination.current
    paginations.total = pagination.total
    this.setState({ pagination:paginations}, () => {
      let param = Object.assign(this.state.pagination, this.state.searchFormData)
      this.getResetState(param)
    });
  }

  render() {
    const { roles } = this.props;
    const { onEdit , pagination , status , data , dataList , loading} = this.state;
     const columns  = [
    	{
    		title: (
    		<FormattedMessage
    			id={'pages.user.username'}
    		/>
    		),
    		dataIndex: 'username',
    		key: 'username',
    	},
    	{
    		title: (
    			<FormattedMessage
    				id={'pages.user.email'}
    			/>
    		),
    		dataIndex: 'email',
    		key: 'email',
    	},
    	{
    		title: (
    			<FormattedMessage
    				id={'pages.user.mobile'}
    			/>
    		),
    		dataIndex: 'mobile',
    		key: 'mobile',
    	},
      {
      	title: (
      		<FormattedMessage
      			id={'pages.user.rolename'}
      		/>
      	),
      	dataIndex: 'roleName',
      	key: 'roleName',
        render: (text, record, idx) => (
          <span style={{color:"#1A90FF"}}>
           {record.roles.roleName}
          </span>
        ),
      },
      {
      	title: (
      		<FormattedMessage
      			id={'component.search.operation'}
      		/>
      	),
      	dataIndex: 'operation',
      	key: 'operation',
        width: '150px',
        render: (text, record, idx) => (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Popover content={<FormattedMessage
      			id={'component.modal.modify'}
      		/>} trigger="hover">
              <Button
                style={{ marginLeft: 5 }}
                icon={<EditOutlined />}
                type="primary"
                onClick={() =>
                  this.modifyData(record)
                }
              />
            </Popover>
            <Popover content={
            <FormattedMessage id={'component.btn.delete'}/>}
             trigger="hover">
              <Popconfirm
                title={
                <FormattedMessage
      			    id={'component.tip.isDelete'}
      		       />}
                onConfirm={() => this.delete(record.id)}
                okText={<FormattedMessage id={'component.tip.yes'}/>}
                cancelText={<FormattedMessage id={'component.tip.no'}/>}
              >
                <Button icon={<DeleteOutlined />} type="primary"/>
              </Popconfirm>
            </Popover>
          </div>
        ),
      }
    ];
     return (
       <div>
          <Breadcrumb/>
          <Box style={{background:"white",margin: '10px 0px'}}>
          <SearchForm
          onReset={() => {
            this.setState({searchFormData:{} })
            this.getResetState({page:1,pageSize:10})
          }}
          onSearch={(payload: any) => {
             this.setState({searchFormData:payload ,pagination:paginations})
             this.getResetState(Object.assign( paginations, payload))
          }}/>
          </Box>
          <Box style={{ margin: '10px 0px'}}>
          	<Button type="primary" onClick={()=>{
              this.props.dispatch({
              	type: 'roleManagement/roleTypeData',
              	payload: {},
              });
              this.setState({ onEdit: true , status : 1 });
            }}>
          		<FormattedMessage
          			id={'component.modal.add'}
          		/>
          	</Button>
          </Box>
          <Box style={{ margin: '10px 0px'}}>
            <Table
            	rowKey={(record) => record.id}
            	columns={columns}
            	dataSource={dataList}
              pagination={pagination}
              onChange={this.onChange}
              loading={loading}
            />
          </Box>
          <ModuleForm
            visible={onEdit}
            status={status}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            roles={roles}
            data={data}
          />
       </div>
     )
  }
}


 export default connect(({ roleManagement }) => ({
   roles : roleManagement.roles,
}))(User);

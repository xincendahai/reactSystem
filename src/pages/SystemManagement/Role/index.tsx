import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Form, Input, Button, Checkbox, Divider,Table ,Popover , Popconfirm ,message} from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { StateType } from './userModel';
import moment from 'moment';
import { AddRole , ModifyRole , DeleteRole , QueryRoleList } from '@/services/role';
import SearchForm from './components/SearchForm';
import ModuleForm from './components/ModuleForm';
import Box from '@/components/ComponentContainer';
import Breadcrumb from '@/components/Globle/breadcrumb.js';
import { connect, ConnectProps,  FormattedMessage, Dispatch,  history } from 'umi';
const paginations = {
  page: 1,
  pageSize: 10,
  showTotal: total => `总共 ${total} 条`
}
class Role extends React.Component{
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
    QueryRoleList({ page: 1, pageSize: 10 }).then((res)=>{
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
      QueryRoleList(values).then((res)=>{
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
    DeleteRole(id).then((res)=>{
        if(res.status == 200){
           this.getResetState(paginations)
           message.success('修改数据成功！');
        }else{
           message.error(res.msg);
        }
    })
  }

  onSubmit = (role) => {
      let param = Object.assign(this.state.pagination, this.state.searchFormData)
      if(role.id > 0){
        ModifyRole(role).then((res)=>{
            if(res.status == 200){
               this.getResetState(param)
               message.success('修改数据成功!');
            }else{
               message.error(res.msg);
            }
        })
      }else{
        AddRole(role).then((res)=>{
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
    	type: 'roleManagement/MenuData',
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
    const { roles , menuArr } = this.props;
    const { onEdit , pagination , status , data , dataList , loading} = this.state;
     const columns  = [
    	{
    		title: (
    		<FormattedMessage
    			id={'pages.role.rolename'}
    		/>
    		),
    		dataIndex: 'roleName',
    		key: 'roleName',
    	},
    	{
    		title: (
    			<FormattedMessage
    				id={'pages.role.describe'}
    			/>
    		),
    		dataIndex: 'description',
    		key: 'description',
    	},
    	{
    		title: (
    			<FormattedMessage
    				id={'pages.role.createTime'}
    			/>
    		),
    		dataIndex: 'createTime',
    		key: 'createTime',
        render: (text, record, idx) => (
            <div>{moment(record.createTime).format('YYYY-MM-DD')}</div>
        )
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
              	type: 'roleManagement/MenuData',
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
              expandIconAsCell={false}
              expandIconColumnIndex={-1}
            />
          </Box>
          <ModuleForm
              visible={onEdit}
              status={status}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              data={data}
              menuArr={menuArr}
          />
       </div>
     )
  }
}


 export default connect(({ roleManagement }) => ({
   roles : roleManagement.roles,
   menuArr : roleManagement.menuArr,
}))(Role);

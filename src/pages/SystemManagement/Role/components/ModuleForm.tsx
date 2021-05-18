import { useIntl , FormattedMessage } from 'umi';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Input, Modal, Select ,Tree } from 'antd';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const RoleForm = (props) => {
	const intl = useIntl();
	const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [checkedValue, setCheckedValue] = useState<React.Key[]>([]);
  let menu = []
  if(props.menuArr.length > 0){
    let treeData = props.menuArr
    treeData.map((item,index)=>{
          treeData[index].key = item.id
          treeData[index].title = <FormattedMessage  id={'component.menu.'+`${item.name}`}  />
          if(item.children.length > 0){
              item.children.map((val1,key1)=>{
                  treeData[index].children[key1].title = <FormattedMessage  id={'component.menu.'+`${val1.name}`}  />
                  treeData[index].children[key1].key = val1.id
              })
          }
      })
      menu = treeData;
  }
  let checkedArr = []
  if(props.status == 0){
      form.setFieldsValue({
        roleName: props.data.roleName,
        description : props.data.description,
      })
      props.data.children.map((item,index)=>{
         checkedArr.push(item.id)
      })
   }else{
     form.resetFields();
   }


   const onCheck = (checkedKeysValue) => {
       setCheckedKeys(checkedKeysValue);
   };
	return (
		<Modal
		 visible={props.visible}
     title={props.status == 1 ?
        <FormattedMessage
					id={'component.modal.add'}
				/>
        :
        <FormattedMessage
					id={'component.modal.modify'}
				/>}
		 onCancel={() => {
				props.onCancel();
				form.resetFields();
		 }}
		 onOk={() => {
				form.submit();
		 }}
		>
			<Form
				form={form}
        {...layout} 
				onFinish={(values: any) => {
          values.id = props.status == 0 ? props.data.id : 0
          values.menuArr = checkedKeys
					props.onSubmit(values);
				}}
			>
				<Form.Item
					label={intl.formatMessage({
						id: 'pages.role.rolename',
					})}
					name="roleName"
					rules={[{ required: true, message: intl.formatMessage({
							id: 'pages.role.roleNameRequired',
							})
						}]}
				>
				<Input />
			</Form.Item>

				<Form.Item
					label={intl.formatMessage({
						id: 'pages.role.describe',
					})}
					name="description"
					rules={[{ required: true, message: intl.formatMessage({
										id: 'pages.role.describeRequired',
								})
					}]}
				>
					<TextArea rows={4} />
				</Form.Item>
        <Form.Item
        	label={intl.formatMessage({
        		id: 'pages.role.jurisdiction',
        	})}
        >
        	<Tree
        	      checkable
        	      onCheck={onCheck}
        	      checkedKeys={checkedKeys}
        	      treeData={menu}
        	    />
        </Form.Item>

			</Form>
		</Modal>
	);
};


export default RoleForm;

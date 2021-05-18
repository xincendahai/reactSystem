import { useIntl , FormattedMessage } from 'umi';
import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const UserForm = (props) => {
	const intl = useIntl();
	const [form] = Form.useForm();
  if(props.status == 0){
     const roleNameList = props.roles.filter(item => item.value == props.data.roles.roleName)
      form.setFieldsValue({
        username: props.data.username,
        email : props.data.email,
        mobile : props.data.mobile,
        roleId : roleNameList.length > 0 ? roleNameList[0].id : null
      })
   }else{
     form.resetFields();
   }
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
        {...layout}
				form={form}
				onFinish={(values: any) => {
          values.id = props.status == 0 ? props.data.id : 0
					props.onSubmit(values);
				}}
			>
				<Form.Item
					label={intl.formatMessage({
						id: 'pages.user.username',
					})}
					name="username"
					rules={[{ required: true, message: intl.formatMessage({
							id: 'pages.user.usernameRequired',
							})
						}]}
				>
				<Input />
			</Form.Item>
       {
        props.status == 1 ?
        <Form.Item
        		label={intl.formatMessage({
        			id: 'pages.user.password',
        		})}
        		name="password"
        		rules={[{ required: true, message: intl.formatMessage({
        				id: 'pages.user.passwordRequired',
        				})
        			}]}
        	>
        	<Input.Password />
        </Form.Item>:null
        }
				<Form.Item
					label={intl.formatMessage({
						id: 'pages.user.email',
					})}
					name="email"
					rules={[{ required: true, message: intl.formatMessage({
										id: 'pages.user.emailRequired',
								})
					},{ type: 'email' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={intl.formatMessage({
						id: 'pages.user.mobile'
					})}
					name="mobile"
					rules={[{ required: true, message: intl.formatMessage({
										id: 'pages.user.mobileRequired'
								})
						}]}
				>
					<Input />
				</Form.Item>
				<Form.Item label={intl.formatMessage({
						id: 'pages.user.rolename',
					})}
					name="roleId">
				   <Select mode="multiple">
						{props.roles &&
							props.roles.map((role) => (
								<Select.Option key={role.id} value={role.id}>
									{role.value}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UserForm;

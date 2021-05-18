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
  form.setFieldsValue({
    username: props.data.username,
    email : props.data.email,
    mobile : props.data.mobile,
    password : props.data.password
  })
	return (
		<Modal
		 visible={props.visible}
     title={<FormattedMessage
     	id={'component.userInfo.message'}
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
				  <Form.Item
				  		label={intl.formatMessage({
				  			id: 'pages.user.email',
				  		})}
				  		name="email"
				  		rules={[{ required: true, message: intl.formatMessage({
				  				id: 'pages.user.emailRequired',
				  				})
				  			}]}
				  	>
				  	<Input />
				  </Form.Item>
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
				  	<Input />
				  </Form.Item>
				  <Form.Item
				  		label={intl.formatMessage({
				  			id: 'pages.user.mobile',
				  		})}
				  		name="mobile"
				  		rules={[{ required: true, message: intl.formatMessage({
				  				id: 'pages.user.mobileRequired',
				  				})
				  			}]}
				  	>
				  	<Input />
				  </Form.Item>
			</Form>
		</Modal>
	);
};

export default UserForm;

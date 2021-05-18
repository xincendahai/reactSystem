import React, { useEffect } from 'react';

import { useIntl } from 'umi';
import { Form, Input, Button, Row, Col } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import ResetIcon from '../../../../components/Icons/Reset';

const SearchForm: React.FC<SearchFormProps<any>> = (props) => {
	const intl = useIntl();
  const [form] = Form.useForm();
	const { onReset, onSearch } = props;

  const Reset = (values: any) => {
       form.resetFields();
       onReset()
    };

	return (
		<>
			<Form
        form={form}
				onFinish={(values: any) => {
					if (typeof onSearch === 'function') {
						onSearch(values);
					}
				}}
			>
				<Row gutter={24}>
					<Col span={6}>
						<Form.Item
							name="roleName"
							label={intl.formatMessage({ id: 'pages.role.rolename' })}
						>
							<Input />
						</Form.Item>
					</Col>
          <Col span={6}>
          	<Form.Item
          		name="describe"
          		label={intl.formatMessage({ id: 'pages.role.describe' })}>
          		 <Input />
          	</Form.Item>
          </Col>
          <Col span={6}>
          <Form.Item style={{ textAlign: 'right' }}>
          	<Button
              onClick={Reset}
          		shape="circle"
          		style={{ marginRight: 15 }}
              icon={
              	<ResetIcon style={{ width: 16, height: 16, fill: '#1A90FF' }} />
              }
              placeholder={intl.formatMessage({
              	id: 'component.search.empty',
              })}
          	/>
          	<Button
          		type="primary"
          		htmlType="submit"
          		shape="circle"
          		icon={<SearchOutlined />}
              placeholder={intl.formatMessage({
               	id: 'component.search.search',
               })}
          	/>
          </Form.Item>
          </Col>
				</Row>
			</Form>
		</>
	);
};

export default SearchForm;

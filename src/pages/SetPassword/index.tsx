import { useState, useContext } from 'react';
import { Card, Row, Form, Input, Button, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { AuthContext, IChangePassword } from 'contexts/Auth';

const { Title, Text, Paragraph } = Typography;
const { useForm } = Form;

interface IPasswordValidator {
  passwordLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
  symbol: boolean;
}

const initValidator = {
  passwordLength: false,
  uppercase: false,
  lowercase: false,
  digit: false,
  symbol: false,
};

export default function SetPasswordPage() {
  const authContext = useContext(AuthContext);
  const [form] = useForm();
  const [validator, setValidator] = useState<IPasswordValidator>(initValidator);

  const onFinish = (values: IChangePassword) => {
    if (!Object.values(validator).some((e) => e === false)) {
      authContext.changePassword(values);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        width: '100vw',
        height: '100vh',
        background: '#001529',
      }}
    >
      <Card style={{ width: 400 }}>
        <Row justify="center" align="middle">
          <Title level={2}>Set password</Title>
        </Row>
        <Paragraph type="secondary">
          You need to update your password because this is the first time you are signing in
        </Paragraph>
        <Form
          form={form}
          name="basic"
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Current Password"
            name="password"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password
              onChange={(e) => {
                setValidator({
                  passwordLength: e.target.value.length > 4,
                  uppercase: /[A-Z]/.test(e.target.value),
                  lowercase: /[a-z]/.test(e.target.value),
                  digit: /[0-9]/.test(e.target.value),
                  symbol: /[^a-zA-Z0-9]/.test(e.target.value),
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Text type={validator.passwordLength ? 'success' : 'danger'}>
              {validator.passwordLength ? <CheckOutlined /> : <CloseOutlined />} Passwords must be at least 4 characters
              long.
            </Text>
            <br />
            <Text type={validator.uppercase ? 'success' : 'danger'}>
              {validator.uppercase ? <CheckOutlined /> : <CloseOutlined />} Uppercase characters (A-Z).
            </Text>
            <br />
            <Text type={validator.lowercase ? 'success' : 'danger'}>
              {validator.lowercase ? <CheckOutlined /> : <CloseOutlined />} Lowercase characters (a-z).
            </Text>
            <br />
            <Text type={validator.digit ? 'success' : 'danger'}>
              {validator.digit ? <CheckOutlined /> : <CloseOutlined />} Digits (0-9).
            </Text>
            <br />
            <Text type={validator.symbol ? 'success' : 'danger'}>
              {validator.symbol ? <CheckOutlined /> : <CloseOutlined />} Special characters.
            </Text>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={Object.values(validator).some((e) => e === false)}
            >
              Set password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

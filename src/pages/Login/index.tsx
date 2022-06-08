import { useContext } from 'react';
import { Card, Row, Form, Input, Checkbox, Button, Typography } from 'antd';

import { AuthContext } from 'contexts/Auth';

const { Title } = Typography;

interface ILogin {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const authContext = useContext(AuthContext);

  const onFinish = (values: ILogin) => {
    authContext.login(values);
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
      <Card style={{ width: 300 }}>
        <Row justify="center" align="middle">
          <Title level={2}>Login</Title>
        </Row>
        <Form
          name="basic"
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

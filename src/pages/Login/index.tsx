import { useContext } from 'react';
import { Card, Row, Form, Input, Checkbox, Button, Typography, Col, Divider, Image } from 'antd';

import { AuthContext } from 'contexts/Auth';
import { Link } from 'react-router-dom';
import { getRandomInt } from 'utils/mathUtils';
import { useForm } from 'antd/lib/form/Form';

const { Title, Text } = Typography;

interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [form] = useForm();
  const authContext = useContext(AuthContext);

  const onFinish = async (values: ILogin) => {
    form.validateFields();
    await authContext.login(values);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        width: '100vw',
        height: '100vh',
        background: '#fff',
      }}
    >
      <Row style={{ width: '100%', height: '100%' }}>
        <Col span={16} style={{ paddingTop: 100, left: '10%' }}>
          <div style={{ position: 'absolute', left: -55, top: -20 }}>
            <Text style={{ fontSize: 200, margin: 0, fontFamily: 'auto', color: 'rgba(200, 200, 200, 0.2)' }}>❝</Text>
          </div>
          <div style={{ position: 'absolute' }}>
            <Title style={{ margin: 0, color: 'rgba(90, 90, 90, 1)' }}>Pets also the medicine for the soul,</Title>
            <Title style={{ margin: 0, color: 'rgba(90, 90, 90, 1)' }}>let's share together</Title>
          </div>
        </Col>
        <Col span={8}>
          <Card style={{ width: 400, height: '100vh', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 3px 3px' }}>
            <Row justify="center" align="middle" style={{ marginBottom: 20 }}>
              <Col span={24}>
                <Title level={2} style={{ marginBottom: 5 }}>
                  Login
                </Title>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Enter your email address and password to access.
                </Text>
              </Col>
            </Row>
            <Form
              form={form}
              name="basic"
              layout={'vertical'}
              initialValues={{ remember: true, email: localStorage.getItem('email') }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { type: 'email', message: 'Email format incorrect!'}
                ]}
              >
                <Input style={{ borderRadius: '20px', height: 40 }} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password style={{ borderRadius: '20px', height: 40 }} />
              </Form.Item>
              <Row justify="space-between" align="middle">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ margin: 0 }}>
                    <Button shape="round" type="primary" htmlType="submit" style={{ width: 150, height: 35 }}>
                      Login
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Divider type="horizontal" />
            Don't have an account? <Link to={'/sign-up'}>Sign up</Link>
          </Card>
        </Col>
      </Row>
      <div
        className={'naughty-cats'}
        style={{ position: 'absolute', left: `${getRandomInt(30) + 10}%`, top: `${getRandomInt(40) + 20}%` }}
      >
        <Image src={`/images/random/cat${getRandomInt(7)}.png`} preview={false} />
      </div>
    </Row>
  );
}

import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const InputStyle: any = { borderRadius: '20px', height: 40 };

const ChangePasswordForm = () => {
  const [form] = useForm();

  const SubmitHandler = async (values: any) => {
    await form.validateFields();
    console.log(values);
  };

  return (
    <Form {...formLayout} form={form} onFinish={SubmitHandler}>
      <Form.Item
        label="Current password"
        name="currentPassword"
        rules={[{ required: true, message: 'Please input your current password!' }]}
      >
        <Input.Password style={{ ...InputStyle }} />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password style={{ ...InputStyle }} />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please retype new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password style={{ ...InputStyle }} />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Space>
          <Button shape="round" type="primary" htmlType="submit" style={{ padding: '0 30px', height: 35 }}>
            Change Password
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;

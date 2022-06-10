import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const InputStyle: any = { borderRadius: '20px', height: 40 };

const EditProfileForm = () => {
  const [form] = useForm();

  const SubmitHandler = async (values: any) => {
    await form.validateFields();
    console.log(values);
  };

  return (
    <Form {...formLayout} form={form} onFinish={SubmitHandler}>
      <Row justify="space-between">
        <Col>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input style={{ ...InputStyle }} />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: 'Please input your user name!' }]}
          >
            <Input style={{ ...InputStyle }} />
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please input your gender!' }]}>
            <Select size="large" placeholder="Select gender">
              <Select.Option value="Nam">Male</Select.Option>
              <Select.Option value="Nu">Female</Select.Option>
              <Select.Option value="Khac">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Marital Status" name="maritalStatus">
            <Select size="large" placeholder="Select marital status">
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="married">Married</Select.Option>
              <Select.Option value="widowed">Widowed</Select.Option>
              <Select.Option value="divorced">Divorced</Select.Option>
              <Select.Option value="separated">Separated</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input style={{ ...InputStyle }} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input style={{ ...InputStyle }} />
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please input your birthday!' }]}
          >
            <DatePicker style={{ ...InputStyle, width: '100%' }} />
          </Form.Item>
          <Form.Item label="Age" name="ageRange" rules={[{ required: true, message: 'Please input your age range!' }]}>
            <Select size="large" placeholder="Select age range">
              <Select.Option value="children">Children (3-14 years old)</Select.Option>
              <Select.Option value="youth">Youth (15-24 years old)</Select.Option>
              <Select.Option value="adults">Adults (25-64 years old)</Select.Option>
              <Select.Option value="seniors">Seniors (over 65 years old )</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please input your country!' }]}>
            <Input style={{ ...InputStyle }} />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input style={{ ...InputStyle }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Address" name="address">
            <Input.TextArea
              autoSize={{
                minRows: 2,
              }}
              style={{ ...InputStyle }}
            />
          </Form.Item>
        </Col>
        <Row style={{ width: '100%' }} justify="end">
          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button shape="round" style={{ padding: '0 30px', height: 35 }} onClick={() => form.resetFields()}>
                Cancel
              </Button>
              <Button shape="round" type="primary" htmlType="submit" style={{ padding: '0 30px', height: 35 }}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Row>
      </Row>
    </Form>
  );
};

export default EditProfileForm;

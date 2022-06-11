import {
  SendOutlined,
  PictureOutlined,
  UserAddOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Comment, Form, Image, Input, message, Row, Space, Tooltip, Typography, Upload, UploadProps } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

const uploadProps: UploadProps = {
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CreatePostCard = () => {
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className="create-post-card">
      <Card
        title={'Create Post'}
        bordered={false}
        style={{ borderRadius: 12 }}
        extra={
          isWriting ? (
            <Button icon={<CloseOutlined />} type="text" shape="circle" onClick={() => setIsWriting(false)} />
          ) : null
        }
      >
        <Row gutter={16}>
          <Col flex="42px">
            <Avatar src="https://i.pravatar.cc/300" size={42} />
          </Col>
          <Col flex="auto" onFocus={() => setIsWriting(true)}>
            <Form>
              <Form.Item name={"content"}>
                <Input.TextArea
                  style={{ borderRadius: 12 }}
                  placeholder={'Write something...'}
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
              {isWriting && (
                <Row justify="space-between" style={{ marginTop: '12px' }}>
                  <Col>
                    <Space>
                      {/* <Upload {...uploadProps} multiple={true} maxCount={10}> */}
                        <Button type="ghost" icon={<PictureOutlined />} shape="round">
                          Add images
                        </Button>
                      {/* </Upload> */}
                      <Button type="ghost" icon={<UserAddOutlined />} shape="round">
                        Tag friend
                      </Button>
                    </Space>
                  </Col>
                  <Col>
                    <Button type="primary" style={{ width: 100 }} icon={<SendOutlined />} shape="round">
                      Post
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreatePostCard;

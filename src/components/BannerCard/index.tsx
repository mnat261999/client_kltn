import {
  CameraOutlined,
  FacebookFilled,
  FileImageOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, message, Modal, Row, Typography, Upload, UploadProps } from 'antd';
import { useState } from 'react';

const { Text } = Typography;
const { Dragger } = Upload;

const BannerCard = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const uploadImageProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className="banner-card">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Image src="https://picsum.photos/id/1000/5626/3635" style={{ borderRadius: '12px 12px 0 0' }} />
        <Row justify="space-between" style={{ width: '100%', padding: 16, zIndex: 10 }}>
          <Col style={{ fontSize: 30 }}>
            <FacebookFilled style={{ marginLeft: 16 }} />
            <InstagramOutlined style={{ marginLeft: 16 }} />
            <TwitterOutlined style={{ marginLeft: 16 }} />
            <YoutubeOutlined style={{ marginLeft: 16 }} />
          </Col>
          <Col>
            <Row gutter={16}>
              <Col style={{ textAlign: 'center' }}>
                <div>Posts</div>
                <div>132</div>
              </Col>
              <Col style={{ textAlign: 'center' }}>
                <div>Followers</div>
                <div>120K</div>
              </Col>
              <Col style={{ textAlign: 'center' }}>
                <div>Following</div>
                <div>12</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', paddingBottom: 10 }}>
          <Row justify="center" style={{ width: 130 }}>
            <Col span={24}>
              <Avatar src="https://i.pravatar.cc/300" size={130} />
              <Button
                type="primary"
                shape="circle"
                style={{ position: 'absolute', bottom: 0, right: 0 }}
                icon={<CameraOutlined />}
                onClick={() => setIsUploadingImage(true)}
              />
            </Col>
            <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <Text>Lorem Ipsum</Text>
            </Col>
          </Row>
        </div>
        <Modal visible={isUploadingImage} onCancel={() => setIsUploadingImage(false)} title="Upload your avatar">
          <Dragger {...uploadImageProps}>
            <p className="ant-upload-drag-icon">
              <FileImageOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to this area</p>
            <p className="ant-upload-hint">Choose a good image for a great avatar</p>
          </Dragger>
        </Modal>
      </Card>
    </div>
  );
};

export default BannerCard;

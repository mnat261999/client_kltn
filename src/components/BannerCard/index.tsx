import {
  CameraOutlined,
  FacebookFilled,
  FileImageOutlined,
  InstagramOutlined,
  LoadingOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  message,
  Modal,
  notification,
  Row,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;
const { Dragger } = Upload;

const getBase64 = (img: any, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const BannerCard = () => {
  const [uploadedImage, setUploadedImage] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setUploadedImage(undefined);
    }
  }, [visible]);

  const uploadImageProps: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: ({ file, onSuccess }: any) => {
      setTimeout(() => {
        onSuccess('ok');
      }, 0);
    },
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url: any) => {
          setLoading(false);
          setUploadedImage(url);
        });
      }

      if (info.file.status === 'error') {
        setLoading(false);
        notification.error({
          message: 'Upload avatar failed!',
          description: 'Upload avatar failed, please try again!',
        });
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
                onClick={() => setVisible(true)}
              />
            </Col>
            <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <Text>Lorem Ipsum</Text>
            </Col>
          </Row>
        </div>
        <Modal
          destroyOnClose
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Upload your avatar"
          cancelButtonProps={{
            shape: 'round',
            style: { padding: '0 30px', height: 35 },
          }}
          okText={'Upload'}
          okButtonProps={{
            style: { padding: '0 30px', height: 35 },
            shape: 'round',
            onClick: () => {
              console.log('base64', uploadedImage);
              setVisible(false);
            },
          }}
        >
          {uploadedImage ? (
            <Row justify="center" style={{ textAlign: 'center', width: '100%' }}>
              <Image src={uploadedImage} preview={false} />
            </Row>
          ) : (
            <Dragger {...uploadImageProps} disabled={loading}>
              <p className="ant-upload-drag-icon">{loading ? <LoadingOutlined /> : <FileImageOutlined />}</p>
              <p className="ant-upload-text">Click or drag image to this area</p>
              <p className="ant-upload-hint">Choose a good image for a great avatar</p>
            </Dragger>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default BannerCard;

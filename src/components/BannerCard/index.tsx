import {
  FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Image, Row, Typography } from 'antd';

const {Text} = Typography;

const BannerCard = () => {
  return (
    <div className="banner-card">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Image src="https://picsum.photos/id/1000/5626/3635" style={{ borderRadius: "12px 12px 0 0" }} />
        <Row justify='space-between' style={{ width: "100%", padding: 16, zIndex: 10  }}>
          <Col style={{ fontSize: 30 }}>
            <FacebookFilled style={{ marginLeft: 16 }}/>
            <InstagramOutlined style={{ marginLeft: 16 }} />
            <TwitterOutlined style={{ marginLeft: 16 }} />
            <YoutubeOutlined style={{ marginLeft: 16 }} />
          </Col>
          <Col>
            <Row gutter={16}>
              <Col style={{textAlign: 'center'}}>
                <div>Posts</div>
                <div>132</div>
              </Col>
              <Col style={{textAlign: 'center'}}>
                <div>Followers</div>
                <div>120K</div>
              </Col>
              <Col style={{textAlign: 'center'}}>
                <div>Following</div>
                <div>12</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{position: 'absolute', bottom: 0, width: "100%", paddingBottom: 10}}>
          <Row justify='center' style={{width: 130}}>
            <Col span={24}>
              <Avatar src="https://i.pravatar.cc/300" size={130} />
            </Col>
            <Col span={24} style={{textAlign: 'center', fontWeight: 'bold'}}>
              <Text>Lorem Ipsum</Text>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default BannerCard;

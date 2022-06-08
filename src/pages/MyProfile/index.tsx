import { Card, Col, Row } from "antd";
import BannerCard from "components/BannerCard";
import PostCard from "components/PostCard";

export default function MyProfile() {
  return (
    <div className="main-container">
      <Row align='top' justify="center" gutter={16}>
        <Col span={24}>
          <BannerCard />
        </Col>
        <Col span={24} className="post-area">
          <PostCard />
          <PostCard />
        </Col>
      </Row>
    </div>
  );
}

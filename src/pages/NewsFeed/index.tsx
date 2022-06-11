import { Col, Row } from "antd";
import CreatePostCard from "components/CreatePostCard";
import PostCard from "components/PostCard";
import SideContactList from "components/SideContactList";

export default function NewsFeed() {
  return (
    <div className="main-container">
      <Row align='top' justify="center" gutter={16}>
        <Col className="post-area">
          <CreatePostCard />
          <PostCard />
        </Col>
      </Row>
      <SideContactList />
    </div>
  );
}

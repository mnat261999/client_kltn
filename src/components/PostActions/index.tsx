import { LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

const { Text } = Typography;

export interface IImageContentProps {
  postId: string;
  numberOfLikes: number;
  numberOfComments: number;
  numberOfShares: number;
}

const PostActions = ({ postId, numberOfLikes, numberOfComments, numberOfShares }: IImageContentProps) => {
  return (
    <Row justify="space-between">
      <Col>
        <Space direction="horizontal" size={16}>
          <Button shape="circle" type="primary" icon={<LikeOutlined />} />
          <Text type="secondary">{numberOfLikes} Likes</Text>
          <Text type="secondary">{numberOfComments} Comments</Text>
        </Space>
      </Col>
      <Col>
        <Button type="link" icon={<ShareAltOutlined />}>
          {numberOfShares} Shares
        </Button>
      </Col>
    </Row>
  )
};

export default PostActions
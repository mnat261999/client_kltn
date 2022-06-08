import { Avatar, Button, Col, Row, Typography } from 'antd';

const { Text } = Typography;

export interface IComment {
  id: string;
  content: string;
  numberOfLike: number;
}

const Comment = ({ id, content, numberOfLike }: IComment) => {
  return (
    <Row gutter={16} align="top">
      <Col flex="42px">
        <Avatar src={'https://i.pravatar.cc/300'} size={42} />
      </Col>
      <Col flex="auto" style={{width: 'calc(100% - 100px'}}>
        <Row style={{paddingBottom: 10}}>
          <Col span={24}>
            <Text style={{ wordBreak: 'break-all' }}>
              {content}
            </Text>
          </Col>
          <Col span={24}>
            <Text>
              <Button type="link" style={{ paddingLeft: 0 }} onClick={() => console.log(`comment/${id}`)}>
                Like
              </Button>
              <Text type='secondary'>{numberOfLike} Likes</Text>
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

export default Comment
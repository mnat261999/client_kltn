import { LinkOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';

const CommentInput = () => {
  return (
    <Row gutter={16}>
      <Col flex="42px">
        <Avatar src={'https://i.pravatar.cc/300'} size={42} />
      </Col>
      <Col flex="auto">
        <Input
          placeholder='Write something...'
          suffix={
            <>
              <Button type="text" shape="circle" icon={<LinkOutlined />} />
              <Button type="text" shape="circle" icon={<SmileOutlined />} />
              <Button type="text" shape="circle" icon={<SendOutlined />} />
            </>
          }
        />
      </Col>
    </Row>
  )
};

export default CommentInput
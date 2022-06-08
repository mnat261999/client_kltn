import { Avatar, Col, Row, Typography } from 'antd';

import "./index.scss"

const { Text } = Typography;

export interface IUserBarProps {
  avatar: string,
  name: string,
}

export default function UserBar({ avatar, name }: IUserBarProps) {
  return (
    <Row className="user-bar" align="middle" gutter={8}>
      <Col flex="40px">
        <Avatar src={avatar} size={40} />
      </Col>
      <Col flex="auto">
        <Text ellipsis>{name}</Text>
      </Col>
    </Row>
  );
}

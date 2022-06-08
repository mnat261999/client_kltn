import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

export interface ICardTitleProps {
  title: string;
  extra: React.ReactType;
}

export default function CardTitle(props: ICardTitleProps) {
  const { title, extra: Extra } = props;

  return (
    <Row align="middle" justify="space-between" className="card-title">
      <Col>
        <Title level={3}>{title}</Title>
      </Col>
      <Col>
        <Extra />
      </Col>
    </Row>
  );
}

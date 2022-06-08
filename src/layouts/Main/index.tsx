import { ReactNode, useContext } from 'react';
import { Layout, Card, Row, Col, Space } from 'antd';

import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from 'contexts/Auth';
import HeaderMenu from 'components/HeaderMenu';
import SideContactList from 'components/SideContactList';

type Props = {
  children?: ReactNode;
};

const { Header, Content, Footer } = Layout;

export default function MainLayout(props: Props) {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  return (
    <Layout className="main-layout">
      <Header>
        <Row style={{ width: '100%' }} justify="space-between" align='middle'>
          <Col style={{ width: 160 }}>
            <Link to={'/'}>
              <img className="logo" src={process.env.PUBLIC_URL + '/images/logo.png'} />
            </Link>
          </Col>
          <Col>
            <HeaderMenu />
          </Col>
        </Row>
      </Header>
      <Content>
        {props?.children}
      </Content>
      {/* <Footer></Footer> */}
    </Layout>
  );
}

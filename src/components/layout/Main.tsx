import {Outlet} from 'react-router-dom';
import {Layout, Typography, Space, Row, Col} from 'antd';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const Main: React.FC = () => {
  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Row style={{marginBottom: 60, marginTop: 40}}>
          <Col
            sm={{flex: '40px'}}
            md={{span: 0}}
          />
          <Col
            sm={{flex: '1'}}
            md={{span: 18, offset: 3}}
          >
            <ScrollToTop />
            <Outlet />
          </Col>
          <Col
            sm={{flex: '40px'}}
            md={{span: 0}}
          />
        </Row>
      </Layout.Content>
      <Layout.Footer>
        <Space direction="vertical">
          <Typography.Text>
            © 2025 Chenuin. All rights reserved.
          </Typography.Text>
          <Typography.Text type="secondary">
            This project uses the TMDB API but is not endorsed or certified by TMDB.
          </Typography.Text>
        </Space>
      </Layout.Footer>
    </Layout>
  );
};

export default Main;

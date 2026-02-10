import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const { Header, Content } = Layout;

const routes = [
  { title: 'Login', path: '/login', description: 'Authentication entry point route.' },
  { title: 'Forgot Password', path: '/forgot-password', description: 'Request password reset email.' },
  { title: 'Reset Password', path: '/reset-password', description: 'Submit uid, token and new password.' },
];

export default function DashboardPage() {
  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          LogiDesk Admin Dashboard
        </Typography.Title>
        <Button danger onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Header>
      <Content style={{ padding: 24 }}>
        <Card>
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Typography.Text type="secondary">
              You are authenticated with JWT access token and can navigate through linked routes below.
            </Typography.Text>
            <Row gutter={[16, 16]}>
              {routes.map((route) => (
                <Col xs={24} md={12} lg={8} key={route.path}>
                  <Card title={route.title} variant="outlined">
                    <Typography.Paragraph>{route.description}</Typography.Paragraph>
                    <Link to={route.path}>Open {route.title}</Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

import { Layout, Typography } from 'antd';

const { Content } = Layout;

const wrapperStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)',
};

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Layout style={wrapperStyle}>
      <Content style={{ width: '100%', maxWidth: 480 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 16px 48px rgba(15, 23, 42, 0.12)',
            padding: 32,
          }}
        >
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
          <div style={{ marginTop: 24 }}>{children}</div>
        </div>
      </Content>
    </Layout>
  );
}

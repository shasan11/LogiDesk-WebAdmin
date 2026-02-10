import React from 'react';
import { AppstoreOutlined, HomeOutlined, LogoutOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 260;

const topMenuItems = [
  { key: '/dashboard/profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
];

const sideMenuItems = [
  {
    key: '/dashboard/home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: '/dashboard/shipment',
    icon: <TruckOutlined />,
    label: 'Shipment',
  },
  {
    key: 'accounting',
    icon: <AppstoreOutlined />,
    label: 'Accounting',
    children: [
      { key: '/dashboard/accounting/chart-of-accounts', label: 'Chart of Accounts' },
      { key: '/dashboard/accounting/bank-accounts', label: 'Bank Accounts' },
      { key: '/dashboard/accounting/cheque-register', label: 'Cheque Register' },
      { key: '/dashboard/accounting/cash-transfer', label: 'Cash Transfer' },
      { key: '/dashboard/accounting/journal-voucher', label: 'Journal Voucher' },
    ],
  },
];

const DashboardPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onTopMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/login', { replace: true });
      return;
    }

    navigate(key);
  };

  const onSideMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 20,
        }}
      >
        <Text style={{ color: '#fff', marginBottom: 0 }} strong>
          LogiDesk Admin
        </Text>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={topMenuItems}
          onClick={onTopMenuClick}
          style={{ minWidth: 220, justifyContent: 'flex-end', flex: '0 0 auto' }}
        />
      </Header>

      <Layout style={{ marginTop: HEADER_HEIGHT }}>
        <Sider
          width={SIDEBAR_WIDTH}
          style={{
            position: 'fixed',
            left: 0,
            top: HEADER_HEIGHT,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            background: colorBgContainer,
            overflow: 'auto',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <Menu
            mode="inline"
            items={sideMenuItems}
            onClick={onSideMenuClick}
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['accounting']}
            style={{ height: '100%', borderInlineEnd: 0 }}
          />
        </Sider>

        <Layout style={{ marginLeft: SIDEBAR_WIDTH }}>
          <Content
            style={{
              minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
              overflow: 'auto',
              background: '#edf2f7',
              padding: 24,
            }}
          >
            <div style={{ background: '#fff', borderRadius: 8, minHeight: '100%', padding: 24 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;

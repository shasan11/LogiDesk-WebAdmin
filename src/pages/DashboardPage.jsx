import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 190;

const items1 = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 20 }).map((_, j) => ({
      key: `${index}-${j}`,
      label: `option ${j + 1}`,
    })),
  };
});

const DashboardPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      {/* FIXED HEADER */}
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          
        }}
        className='bg-dark w-100'
      >
        <Menu
          theme="dark"
          className='w-100'
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1 }}
        />
      </Header>

      <Layout style={{ marginTop: HEADER_HEIGHT }}>
        {/* FIXED SIDEBAR */}
        <Sider
          width={SIDEBAR_WIDTH}
          style={{
            position: 'fixed',
            left: 0,
            top: HEADER_HEIGHT,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            background: colorBgContainer,
            overflow: 'hidden',
            backgroundColor:"#00000"
          }}
        >
          <div className="sidebar-scroll">
            <Menu
              mode="inline"
               style={{ borderInlineEnd: 0 }}
              items={items2}
            />
          </div>
        </Sider>

        {/* CONTENT AREA */}
        <Layout style={{ marginLeft: SIDEBAR_WIDTH }}>
          <Content
            style={{
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              overflow: 'auto',
               
              background: colorBgContainer,
            }}
          >
            

            <div
              style={{
                minHeight: 1200,
                background: '#edf2f7',
                borderRadius: borderRadiusLG,
                padding: 24,
              }}
            >
              Scrollable Content Area
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;

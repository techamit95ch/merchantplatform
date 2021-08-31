import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './layout.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
type Props = { children: React.ReactNode; page: string };

const LayoutView: React.FC<Props> = ({ children, page }) => {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          // backgroundColor: 'white',
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          <Menu.Item key="1">
            <Link to="/add">Add</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/view">View</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {page ? (
            <Breadcrumb.Item>
              <Link to={page === 'Add Product' ? '/add' : page}>{page}</Link>
            </Breadcrumb.Item>
          ) : (
            <></>
          )}
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 470,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Designed By Amit</Footer>
    </Layout>
  );
};

export default LayoutView;

import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader, Button, Card } from 'antd';
import SignFrom from '../components/Auth/SignFrom';
const { Header, Content, Footer } = Layout;
function Signin() {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          backgroundColor: 'white',
        }}
      ></Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          backgroundColor: 'white',
        }}
      >
        <SignFrom />
      </Content>
    </Layout>
  );
}

export default Signin;

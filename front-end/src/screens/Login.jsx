import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Layout, Menu, Breadcrumb, PageHeader, Button } from 'antd';
const { Header, Content, Footer } = Layout;

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const handleSubmit = async () => {};
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
        // className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          backgroundColor: 'white',
        }}
      >
        <LoginForm setUser={setUser} user={user} handleSubmit={handleSubmit} />
      </Content>
    </Layout>
  );
}

export default Login;

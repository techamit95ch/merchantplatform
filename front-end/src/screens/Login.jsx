import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Layout, Menu, Breadcrumb, PageHeader, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { loginPost } from './../actions/auth';

const { Header, Content, Footer } = Layout;

function Login() {
  const history = useHistory();
  const [spinning, setSpinning] = React.useState(0);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const handleSubmit = async () => {
    await dispatch(loginPost(user));
    await setTimeout(async () => {
      if (auth.success) {
        await setSpinning(2);

        await setTimeout(async () => {
          await setSpinning(0);
          await history.push('/');
        }, 2500);
      } else {
        await setSpinning(3);
        await setTimeout(async () => {
          await setSpinning(0);
        }, 2500);
      }
    }, 2000);
  };
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
        {spinning === 1 && (
          <>
            <Spin tip="Submitting..." delay={300} size="large"></Spin>
          </>
        )}
        {spinning === 0 && (
          <LoginForm
            setUser={setUser}
            user={user}
            handleSubmit={handleSubmit}
          />
        )}
        {spinning === 2 && (
          <>
            <Alert
              message="Success"
              description="Your data is submitted Successfully!"
              type="success"
              showIcon
            />
          </>
        )}
        {spinning === 3 && (
          <>
            <Alert
              message="Error"
              description={` Your data is not submitted Successfully! \n ${auth.message}`}
              type="Error"
              showIcon
            />
          </>
        )}
      </Content>
    </Layout>
  );
}

export default Login;

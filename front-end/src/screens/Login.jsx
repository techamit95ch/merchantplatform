import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Layout, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { loginPost } from './../actions/auth';

const { Header, Content, Footer } = Layout;

function Login() {
  const history = useHistory();
  const [spinning, setSpinning] = useState(0);
  const [error, setError]= useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  React.useEffect(() =>{}, [user])
  const handleSubmit = async () => {
    setSpinning(1);
    await dispatch(loginPost(user));
    setTimeout(() => {
      if (auth.success===true) {
        setSpinning(2);
        message.success('Login Successfully!');
        setTimeout(() => {
          setSpinning(0);
          setUser({ email: '', password: '' });
          history.push('/');
          window.location.href = '/';
        }, 1000);
      } else {
        // setError(JSON.stringify(auth.message));
        // setSpinning(2);
        message.error(JSON.stringify(auth.message));
        setTimeout(() => {
          setSpinning(0);
        }, 1000);
        console.log(auth);
        // setError(JSON.stringify(auth.message));

      }
    }, 1000);
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
              message={error?'Error':'Success'}
              description={error?auth.message:"Login Successfully!"}
              type={error?'error':'success'}
              showIcon
            />
          </>
        )}
        
      </Content>
    </Layout>
  );
}

export default Login;

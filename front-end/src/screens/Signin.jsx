import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader, Button, Card ,message} from 'antd';
import SignFrom from '../components/Auth/SignFrom';
import { signInPost } from '../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spin, Alert } from 'antd';

const { Header, Content, Footer } = Layout;

function Signin() {
  const history = useHistory();
  const [spinning, setSpinning] = React.useState(0);
  const [error, setError]= React.useState('');

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    img: null,
  });
  React.useEffect(() =>{}, [user])

  const handleSignIn = async () => {
    setSpinning(1);

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);
    formData.append('img', user.img);
    await dispatch(signInPost(formData));
    await setTimeout(async () => {
      if (auth.success) {
        setUser({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          img: null,
        });
        await setSpinning(2);
        message.success('Your data is submitted Successfully!');
        await setTimeout(async () => {
          await setSpinning(0);
          // await history.push('/');
          window.location.href="/";

        }, 2500);
      } else {
        // setError(JSON.stringify(auth.message));
        message.error(JSON.stringify(auth.message));
        // await setSpinning(2);
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
        {spinning === 1 && (
          <>
            <Spin tip="Submitting..." delay={300} size="large"></Spin>
          </>
        )}
        {spinning === 0 && (
          <>
            <SignFrom
              setUser={setUser}
              user={user}
              handleSignIn={handleSignIn}
            />{' '}
          </>
        )}
        {spinning === 2 && (
          <>
            <Alert
              message={error?'Error':'Success'}
              description={error?auth.message:"Your data is submitted Successfully!"}
              type={error?'error':'success'}
              showIcon
            />
          </>
        )}
        
      </Content>
    </Layout>
  );
}

export default Signin;

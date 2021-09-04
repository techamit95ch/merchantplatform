import React from 'react';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LoginForm({ handleSubmit, user, setUser }) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Card title="Login" bordered={false} style={{ width: 600 }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          hasFeedback
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            label="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ marginLeft: 10 }}>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="#">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ margin: 10 }}
          >
            Log in
          </Button>
          Or{' '}
          <Link to="/signin" style={{ margin: 10 }}>
            {' '}
            register now!
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LoginForm;

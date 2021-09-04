import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Upload,
  message,
  Modal,
  Card,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function SignFrom({ handleSignIn, user, setUser }) {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState('');
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });
  const onChange = (newFileList) => {
    // checkEmpty();
    if (newFileList.file.status !== 'uploading') {
      // console.log(newFileList.file);
    }
    if (newFileList.file.status === 'done') {
      message.success(`${newFileList.file.name} file uploaded successfully`);
      //   setMediaFile(newFileList.file.originFileObj);
      setFileList(newFileList.file);
      setUser({ ...user, img: newFileList.file.originFileObj });
    } else if (newFileList.file.status === 'error') {
      message.error(`${newFileList.file.name} file upload failed.`);
    }
    // setFileList(newFileList.file);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      previewVisible: true,
    });
  };
  const onBeforeLoad = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(`${file.name} is not a JPG/PNG file`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    file = null;
    return isJpgOrPng === true && isLt2M === true ? true : Upload.LIST_IGNORE;
  };

  const props = {
    headers: {
      authorization: 'authorization-text',
    },
    uploading: false,
    // name: 'file',
    maxCount: 1,

    openFileDialogOnClick: true,
    onError: (file) => {
      console.log(file);
    },
    method: 'get',
    data: fileList,
    multiple: false,
    onStart: (newfileList) => {
      setFileList(newfileList.file);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    // action: 'localhost:3000/postfiles/',
  };
  return (
    <Card title="Sign In" bordered={false} style={{ width: 600 }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleSignIn}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <ImgCrop
            rotate
            beforeCrop={(file) => {
              const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';
              if (!isJpgOrPng) {
                message.error(`${file.name} is not a JPG/PNG file`);
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
              }
              file = null;
              return isJpgOrPng === true && isLt2M === true
                ? true
                : Upload.LIST_IGNORE;
            }}
          >
            <Upload
              listType="picture-card"
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={onBeforeLoad}
              {...props}
            >
              <UploadOutlined />
              <Modal
                visible={state.previewVisible}
                title={state.previewTitle}
                footer={null}
                onCancel={() => {
                  setState({ ...state, previewVisible: false });
                }}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={state.previewImage}
                />
              </Modal>
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
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
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setUser({ ...user, confirmPassword: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <Link to="#">agreement</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
            Register
          </Button>
          or
          <Link to="/login" style={{ marginHorizontal: 20 }}>
            {' '}
            Already have an account?
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignFrom;

import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Upload,
  message,
  Space,
  Typography,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import ImgCrop from 'antd-img-crop';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import AvatarImage from './Media.jsx';
import Variant from './Variant.jsx';
import { Function } from '@babel/types';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const AddForm = ({
  setTitle,
  setDescription,
  description,
  setMediaFile,
  setSeoTitle,
  setSeoDescription,
  handleSubmit,
  checkEmpty,
  isEmpty,
  varCount,
  setVarCount,
  setVariantImg,
  setVariantDetails,
  variantImg,
  variantDetails,
}) => {
  const [requiredMark, setRequiredMarkType] = useState(true);

  const [convertedText, setConvertedText] = useState('Some default content');

  return (
    <Card title="Add Product" bordered={false} style={{ width: 600 }}>
      <Form
        layout="vertical"
        onFieldsChange={checkEmpty}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Product Title"
          required
          tooltip="This is a required field"
        >
          <Input
            placeholder="Product Title"
            onChange={(e) => {
              setTitle(e.target.value);
              checkEmpty();
            }}
          />
        </Form.Item>
        <Form.Item
          label="Product Description"
          required
          tooltip="This is a required field"
        >
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(e) => {
              setDescription(e);
              checkEmpty();
            }}
            style={{
              height: 120,

              marginBottom: 30,
            }}
          />
        </Form.Item>
        <Form.Item
          label={<Typography style={{ marginTop: 50 }}>Upload</Typography>}
        >
          <AvatarImage setMediaFile={setMediaFile} checkEmpty={checkEmpty} />
        </Form.Item>
        <Form.Item
          label="Product Variants"
          required
          tooltip="This is a required field"
        >
          <Variant
            varCount={varCount}
            setVarCount={setVarCount}
            setVariantImg={setVariantImg}
            setVariantDetails={setVariantDetails}
            variantImg={variantImg}
            variantDetails={variantDetails}
            checkEmpty={checkEmpty}
          />
        </Form.Item>

        <Form.Item
          label="SEO Meta Details"
          required
          tooltip="This is a required field"
        >
          <Input
            placeholder="SEO Title"
            onChange={(e) => {
              setSeoTitle(e.target.value);
              checkEmpty();
            }}
          />

          <Input.TextArea
            placeholder="SEO Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
            style={{ marginTop: 8 }}
            onChange={(e) => {
              setSeoDescription(e.target.value);
              checkEmpty();
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            block
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;

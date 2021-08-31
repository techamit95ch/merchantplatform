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
type RequiredMark = boolean | 'optional';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function beforeUpload(file: any) {
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
type Props = {
  setTitle: any;
  isEmpty: any;
  checkEmpty: any;
  setDescription: any;
  description: any;
  setMediaFile: any;
  setVariant: any;
  setSeoTitle: any;
  setSeoDescription: any;
  handleSubmit: any;
  varCount: any;
  setVarCount: any;
};

const AddForm: React.FC<Props> = ({
  setTitle,
  setDescription,
  description,
  setMediaFile,
  setVariant,
  setSeoTitle,
  setSeoDescription,
  handleSubmit,
  checkEmpty,
  isEmpty,
  varCount,
  setVarCount,
}) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>(true);

  const [convertedText, setConvertedText] = useState('Some default content');

  return (
    <Card title="Add Product" bordered={false} style={{ width: 600 }}>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{ requiredMarkValue: requiredMark }}
        requiredMark={requiredMark}
      >
        <Form.Item
          label="Product Title"
          required
          tooltip="This is a required field"
        >
          <Input
            placeholder="input placeholder"
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
            style={{ height: 200, minHeight: 220, marginBottom: 30 }}
          />
        </Form.Item>
        <Form.Item
          label="Upload Media"
          required
          tooltip="This is a required field"
        >
          <AvatarImage setMediaFile={setMediaFile} checkEmpty={checkEmpty} />
        </Form.Item>
        <Form.Item
          label="Product Variants"
          required
          tooltip="This is a required field"
        >
          <Variant
            setVariant={setVariant}
            varCount={varCount}
            setVarCount={setVarCount}
          />
        </Form.Item>

        <Form.Item
          label="SEO Meta Details"
          required
          tooltip="This is a required field"
        >
          <Input placeholder="SEO Title" />

          <Input.TextArea
            placeholder="SEO Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
            style={{ marginTop: 8 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            block
            loading={isEmpty}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;

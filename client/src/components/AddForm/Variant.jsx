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
import ImgCrop from 'antd-img-crop';

import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export default function ({ setVariant, varCount, setVarCount }) {
  return (
    <Form.List name="variants">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', marginBottom: 4 }}
              align="baseline"
            >
              <Form.Item
                required
                {...restField}
                name={[name, 'first']}
                fieldKey={[fieldKey, 'first']}
                rules={[{ required: true, message: 'Details Missing' }]}
              >
                <Input placeholder="Variant Details" />
              </Form.Item>
              <Form.Item
                required
                {...restField}
                name={[name, 'last']}
                fieldKey={[fieldKey, 'last']}
                rules={[{ required: true, message: 'Image' }]}
                // name: 'file',
                maxCount={1}
              >
                <ImgCrop>
                  <Upload
                    name="logo"
                    listType="picture"
                    method="get"
                    multiple={false}
                    maxCount={1}
                    onError={() => {}}
                    beforeUpload={(file) => {
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
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <MinusCircleOutlined
                onClick={() => remove(name)}
                // spin={true}
                style={{ color: '#B22222' }}
              />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              size="small"
              style={{ color: '#228B22' }}
              onClick={() => add()}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

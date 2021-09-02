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

export default function ({
  varCount,
  setVarCount,
  setVariantImg,
  setVariantDetails,
  variantImg,
  variantDetails,
  checkEmpty,
}) {
  const [data, setData] = useState({ descripton: '', img: '' });
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
                <Input
                  placeholder="Variant Details"
                  onChange={(e) => {
                    let vari = variantDetails;
                    vari[name] = e.target.value;
                    setVariantDetails(vari);
                    checkEmpty();
                  }}
                />
              </Form.Item>
              <Form.Item required {...restField}>
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
                    onChange={(file) => {
                      if (file.file.status === 'done') {
                        let vari = variantImg;
                        vari[name] = file.file.originFileObj;
                        setVariantImg(vari);
                        checkEmpty();
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <MinusCircleOutlined
                onClick={() => {
                  remove(name);
                  setVarCount(varCount - 1);
                  variantImg.splice(name, 1);
                  variantDetails.splice(name, 1);
                }}
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
              onClick={() => {
                // setVarCount(varCount + 1);
                add();
              }}
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

import React, { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';

const { Dragger } = Upload;

export default function ({ setMediaFile, checkEmpty }) {
  //
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
      setMediaFile(newFileList.file.originFileObj);
      setFileList(newFileList.file);
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
      <Dragger
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
      </Dragger>
    </ImgCrop>
  );
}

import React, { useState } from 'react';
import AddForm from '../components/AddForm/AddForm';
import LayoutView from '../components/Layout/LayoutView';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from '../actions/products';
import _ from 'lodash';
import { Spin, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState('');
  const [variantDetails, setVariantDetails] = useState([]);
  const [variantImg, setVariantImg] = useState([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [varCount, setVarCount] = useState(-1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const [spinning, setSpinning] = useState(0);
  const history = useHistory();
  const checkEmpty = () => {
    // console.log(variantDetails );
    if (
      title === '' ||
      description === '' ||
      mediaFile === '' ||
      variantImg.length === 0 ||
      variantDetails.length === 0 ||
      variantDetails.length !== variantImg.length ||
      seoTitle === '' ||
      seoDescription === ''
    ) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  };
  const handleSubmit = async () => {
    // // if (!isEmpty) {
    setSpinning(1);
    const form_Data = new FormData();

    form_Data.append('title', title);
    form_Data.append('description', description);
    form_Data.append('mediaFile', mediaFile);
    // console.log(form_Data);

    _.forEach(variantImg, (file) => {
      form_Data.append('variantImg', file);
    });
    _.forEach(variantDetails, (details) => {
      form_Data.append('variantDetails[]', details);
    });
    form_Data.append('seoTitle', seoTitle);
    form_Data.append('seoDescription', seoDescription);
    await dispatch(saveProduct(form_Data));
    // await console.log(product);

    await setTimeout(async () => {
      if (product.success) {
        await setSpinning(2);

        await setTimeout(async () => {
          await setSpinning(0);
          await history.push('/view');
        }, 2500);
      } else {
        await setSpinning(3);
        await setTimeout(async () => {
          await setSpinning(0);
        }, 2500);
      }
    }, 2000);

    // }
  };
  return (
    <LayoutView page={'Add Product'}>
      {spinning === 1 && (
        <>
          <Spin tip="Submitting..." delay={300} size="large"></Spin>
        </>
      )}
      {spinning === 0 && (
        <>
          <AddForm
            setTitle={setTitle}
            setDescription={setDescription}
            description={description}
            setMediaFile={setMediaFile}
            setSeoTitle={setSeoTitle}
            setSeoDescription={setSeoDescription}
            handleSubmit={handleSubmit}
            checkEmpty={checkEmpty}
            isEmpty={isEmpty}
            varCount={varCount}
            setVarCount={setVarCount}
            setVariantImg={setVariantImg}
            setVariantDetails={setVariantDetails}
            variantImg={variantImg}
            variantDetails={variantDetails}
          />
        </>
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
            description={` Your data is not submitted Successfully! \n ${product.message}`}
            type="Error"
            showIcon
          />
        </>
      )}
    </LayoutView>
  );
};

export default AddProduct;

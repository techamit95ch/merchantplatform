import React, { useState } from 'react';
import AddForm from '../components/AddForm/AddForm';
import LayoutView from './../components/Layout/LayoutView';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [variant, setVariant] = useState([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [varCount, setVarCount] = useState(0);
  const checkEmpty = () => {
    if (
      title === '' ||
      description === '' ||
      mediaFile === null ||
      variant.length === 0 ||
      seoTitle === '' ||
      seoDescription === ''
    ) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  };
  const handleSubmit = (event: Event) => {
    event.preventDefault();
  };
  return (
    <LayoutView page={'Add Product'}>
      <AddForm
        setTitle={setTitle}
        setDescription={setDescription}
        description={description}
        setMediaFile={setMediaFile}
        setVariant={setVariant}
        setSeoTitle={setSeoTitle}
        setSeoDescription={setSeoDescription}
        handleSubmit={handleSubmit}
        checkEmpty={checkEmpty}
        isEmpty={isEmpty}
        varCount={varCount}
        setVarCount={setVarCount}
      />
    </LayoutView>
  );
};

export default AddProduct;

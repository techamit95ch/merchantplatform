import React from 'react';
import LayoutView from './../components/Layout/LayoutView';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import ProductComponent from '../components/ProductComponet/ProductComponent';
function Product() {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.data.filter((product) => product._id === productId)
  );
  //   console.log(product);
  return (
    <LayoutView page={'View Products'} product={product[0]}>
      <ProductComponent product={product[0]} />
    </LayoutView>
  );
}

export default Product;

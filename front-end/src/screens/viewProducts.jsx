import React, { useState, useEffect } from 'react';
import LayoutView from '../components/Layout/LayoutView';
import { useDispatch, useSelector } from 'react-redux';

function viewProducts() {
  return <LayoutView page={'View Products'}>View</LayoutView>;
}

export default viewProducts;

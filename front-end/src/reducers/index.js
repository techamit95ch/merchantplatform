import { combineReducers } from 'redux';

import products from './products';
import auth from './auth';
import cart from './cart';
export const reducers = combineReducers({ products, auth, cart });

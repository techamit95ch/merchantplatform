import * as api from '../api/index';
export const getAllCart = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCarts({
      email: localStorage.getItem('email'),
    });
    console.log(data);
    dispatch({ type: 'FETCH_ALL_CART', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = (post) => async (dispatch) => {
  try {
    const { data } = await api.addToCart({
      email: localStorage.getItem('email'),
      product: post,
    });
    console.log('from add to cart', data);
    dispatch({ type: 'ADD_TO_CART', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const removeFromCart = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCart(id);
    // console.log(data);

    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const orderAllCart = (id) => async (dispatch) => {
  try {
    await api.orderAll({
      email: localStorage.getItem('email'),
    });
    dispatch({ type: 'ORDERED_ALL' });
  } catch (error) {
    console.log(error.message);
  }
};

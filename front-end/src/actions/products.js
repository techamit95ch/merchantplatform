import * as api from '../api/index';
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    // console.log(data);
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: { success: false, message: error.message },
    });
    console.log(error.message);
  }
};

export const saveProduct = (post) => async (dispatch) => {
  try {
    // console.log('form save product', post);
    // const response = await api.createProduct(post);
    const { data } = await api.createProduct(post);
    // console.log(data);
    if (data.success === true) {
      dispatch({ type: 'CREATE', payload: data });
    } else {
      dispatch({ type: 'ERROR', payload: data });
    }
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: { success: false, message: error.message },
    });

    console.log(error);
  }
};

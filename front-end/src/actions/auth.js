import * as api from '../api/index';
import { useCookies } from 'react-cookie';

export const loginPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.loginAuth(post);
    if (data.success === true) {
      localStorage.clear();

      localStorage.setItem('email', data.data.email);
      localStorage.setItem('img', data.data.img);
      localStorage.setItem('name', data.data.name);
      dispatch({ type: 'LOGIN', payload: data });
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: data });
    }
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
      payload: { success: false, message: error.message },
    });
    console.log(error);
  }
};
export const signInPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.signInAuth(post);
    localStorage.clear();

    if (data.success === true) {
      // localStorage.setItem('iv', data.randomString.iv);
      // localStorage.setItem('encryptedData', data.randomString.encryptedData);
      // localStorage.setItem('randomString', JSON.stringify(data.randomString));
      localStorage.setItem('img', data.data.img);
      localStorage.setItem('name', data.data.name);
      localStorage.setItem('email', data.data.email);
      // console.log('From Sign In Post');
      // console.log({
      //   iv: localStorage.getItem('iv'),
      //   encryptedData: localStorage['encryptedData'],
      // });
      // console.log(data.randomString);

      dispatch({ type: 'SIGNIN', payload: data });
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: data });
    }
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
      payload: { success: false, message: error.message },
    });
    console.log(error);
  }
};

export const isLoggedIn = () => async (dispatch) => {
  try {
    // console.log({
    //   iv: localStorage.getItem('iv'),
    //   encryptedData: localStorage['encryptedData'],
    // });
    if (localStorage.getItem('email') === null) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: { success: false, message: 'No Data Found' },
      });
    } else {
      // console.log('form else Part');
      // console.log({
      //   iv: localStorage.getItem('iv'),
      //   encryptedData: localStorage['encryptedData'],
      // });
      /* const { data } = await api.isLoggedInAuth({
        // randomString: {
        iv: localStorage.getItem('iv'),
        encryptedData: localStorage['encryptedData'],
        // },
      }); */
      const { data } = await api.isLoggedInAuth({
        email: localStorage.getItem('email'),
      });
      console.log(data);
      dispatch({
        type: 'IS_SIGNIN',
        payload: data,
      });
      /* if (data.success === true) {
        dispatch({
          type: 'IS_SIGNIN',
          payload: { success: true },
        });
      } else {
        dispatch({
          type: 'AUTH_ERROR',
          payload: { success: false, message: 'user Not Logged In' },
        });
      } */
    }
  } catch (error) {
    console.log(error);
  }
};
export const logOut = () => async (dispatch) => {
  const { data } = await api.logOutAuth({
    email: localStorage.getItem('email'),
  });
  if (data.logOut === true) {
    // logOut
    localStorage.clear();
    dispatch({
      type: 'LOGOUT',
      payload: { success: false },
    });
  }
};

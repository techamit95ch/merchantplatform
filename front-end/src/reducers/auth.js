// eslint-disable-next-line import/no-anonymous-default-export
export default (auth = { success: false, data: {}, message: '' }, action) => {
  switch (action.type) {
    case 'LOGIN':
      auth.data = action.payload;
      return auth;

    case 'SIGNIN':
      auth.data = action.payload.data;
      auth.success = action.payload.success;
      return auth;
    case 'AUTH_ERROR':
      auth.success = action.payload.success;
      auth.message = action.payload.message;
      return auth;

    default:
      return auth;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  auth = { success: false, data: {}, message: '', ready: false },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      auth.data = action.payload;
      auth.success = action.payload.success;
      auth.ready = true;

      return auth;

    case 'SIGNIN':
      auth.data = action.payload.data;
      auth.success = action.payload.success;
      auth.ready = true;
      return auth;
    case 'IS_SIGNIN':
      auth.success = action.payload.success;
      auth.ready = true;

      return auth;
    case 'LOGOUT':
      auth.success = action.payload.success;
      auth.ready = true;

      return auth;
    case 'AUTH_ERROR':
      auth.success = action.payload.success;
      auth.message = action.payload.message;
      auth.ready = false;

      return auth;

    default:
      return auth;
  }
};

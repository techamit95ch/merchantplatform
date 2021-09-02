// eslint-disable-next-line import/no-anonymous-default-export
export default (
  products = { success: false, data: [], message: '' },
  action
) => {
  switch (action.type) {
    case 'FETCH_ALL':
      products.data = action.payload;
      return products;

    case 'CREATE':
      const data = [...products.data, action.payload.data];
      products.data = data;
      products.success = action.payload.success;
      return products;
    case 'ERROR':
      products.success = action.payload.success;
      products.message = action.payload.message;
      return products;

    default:
      return products;
  }
};

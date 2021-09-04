// eslint-disable-next-line import/no-anonymous-default-export
export default (cart = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_CART':
      return action.payload;

    case 'ADD_TO_CART':
      return [...cart, action.payload.data];
    case 'REMOVE_FROM_CART':
      return cart.filter((item) => item._id !== action.payload._id);
    case 'ORDERED_ALL':
      return [];
    default:
      return cart;
  }
};

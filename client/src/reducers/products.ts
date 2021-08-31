
// eslint-disable-next-line import/no-anonymous-default-export
export default (products: any[] = [], action:any) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    
    case "CREATE":
      return [...products, action.payload];
    
    default:
      return products;
  }
};
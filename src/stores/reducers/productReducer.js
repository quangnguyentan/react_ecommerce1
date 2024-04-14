import actionType from "../actions/actionType";

const initState = {
  newData: null,
  categories: null,
  errorMessage: "",
};
const productReducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT:
      return {
        ...state,
        newData: action.data || {},
      };
    case actionType.GET_PRODUCT_BY_ID:
      return {
        ...state,
        data: action?.data || {},
      };
    case actionType.GET_PRODUCT_BY_OID:
      return {
        ...state,
        data: action?.data || {},
      };

    default:
      return state;
  }
};
export default productReducers;

import actionType from "../actions/actionType";
const initState = {
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  current: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.data ? true : false,
        token: action?.data?.access,
        refreshToken: action?.data?.refresh,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};
export default authReducer;

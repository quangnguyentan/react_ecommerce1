import { apiLoginSuccess } from "../../services/authService";
import actionType from "./actionType";
export const loginSuccessAction = (payload) => async (dispatch) => {
  try {
    let response = await apiLoginSuccess(payload);
    if (response.status === 200) {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        data: response.data,
      });
    } else {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      data: null,
    });
  }
};
export const logout = () => ({
  type: actionType.LOGOUT,
});

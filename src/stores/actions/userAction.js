// import {} from "../../services/userService";
import { apigetCurrent } from "../../services/userService";
import actionType from "./actionType";

export const getCurrent = () => async (dispatch) => {
  try {
    let response = await apigetCurrent();
    if (response?.status === 200) {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: response?.data?.data,
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT,
      currentData: null,
      msg: error,
    });
  }
};

import {
  apiGetOrderDetailByOidDetal,
  apiGetOrderDetailByPidAndOid,
  apiGetProduct,
  apiGetProductById,
} from "../../services/productService";
import actionType from "./actionType";

export const apiGetProductAction = () => async (dispatch) => {
  try {
    const response = await apiGetProduct();
    console.log(response);
    if (response?.status === "Success") {
      dispatch({
        type: actionType.GET_PRODUCT,
        data: response?.data,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT,
      data: null,
    });
  }
};

export const getProductByPidAndOid = (oid, pid) => async (dispatch) => {
  try {
    const response = await apiGetOrderDetailByPidAndOid(oid, pid);
    console.log(response);
    if (response?.success) {
      dispatch({
        type: actionType.GET_PRODUCT_BY_ID,
        data: response?.productDatas,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_BY_ID,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_BY_ID,
      data: null,
    });
  }
};
export const getProductByOidDetail = (oid, pid) => async (dispatch) => {
  try {
    const response = await apiGetOrderDetailByOidDetal(oid);
    if (response?.status === "Success") {
      dispatch({
        type: actionType.GET_PRODUCT_BY_OID,
        data: response?.data,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_BY_OID,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_BY_OID,
      data: null,
    });
  }
};

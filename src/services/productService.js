import axiosConfig from "../axios";

export const apiGetProduct = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/product/",
        params,
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });

export const apiGetBanner = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/upload-images/",
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get banner", error);
    }
  });
export const apiGetCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/category/",
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get category", error);
    }
  });
export const apiOrdersProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/orders/",
        data,
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get category", error);
    }
  });
export const apiGetProductById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/product/${id}/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetCategoryById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/category/${id}/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetOrderProduct = (oid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/orders/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetOrderDetailByOidDetal = (oid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/orders/${oid}/detail/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetOrderDetailByPidAndOid = (oid, pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/orders/${oid}/detail/${pid}/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiUpdateOrderDetailByPidAndOid = (oid, pid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/orders/${oid}/detail/${pid}/`,
        data,

        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiCreateOrderDetailByPidAndOid = (oid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/orders/${oid}/detail/`,
        data,

        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      });
      resolve(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiCreateProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/product/",
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiDeleteProduct = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: "/product/" + id,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiCreateOrder = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/order/",
        data,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetOrders = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/order/admin",
        params,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });
export const apiGetUserOrders = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/order/",
        params,
      });
      resolve(response);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  });

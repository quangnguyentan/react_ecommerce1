import authReducers from "./authReducer";
import productReducers from "./productReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from "redux";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token", "refreshToken"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducers),
  user: userReducer,
  product: productReducers,
});

export default rootReducer;

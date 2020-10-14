import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import vehicleReducer from "./vehicleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import cartItemsReducer from "./cartItemsReducer";
import transReducer from "./transReducer";
import checkoutReducer from "./checkoutReducer";
export default combineReducers({
  items: itemsReducer,
  vehicles: vehicleReducer,
  error: errorReducer,
  auth: authReducer,
  cartItems: cartItemsReducer,
  trans: transReducer,
  checkout: checkoutReducer
});

import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import cartItemsReducer from "./cartItemsReducer";
import transReducer from "./transReducer";
import checkoutReducer from "./checkoutReducer";
export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
  auth: authReducer,
  cartItems: cartItemsReducer,
  trans: transReducer,
  checkout: checkoutReducer
});

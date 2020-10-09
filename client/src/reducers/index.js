import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import bookReducer from "./booksReducer";
import cartReducer from "./cartReducer";
import transReducer from './transReducer'
import checkoutReducer from './checkoutReducer'
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
  trans:transReducer,
  checkout: checkoutReducer,
});

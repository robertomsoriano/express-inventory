import {
  SET_CART,
  EMPTY_CART,
  CART_LOADING,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM
} from "../actions/types";
import Swal from "sweetalert2";

const initialState = {
  cart: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART_ITEM:
      if (window.location.pathname !== "/cart") {
        Swal.fire({
          position: "top-end",
          title: "Success",
          text: "Book added to cart!",
          showConfirmButton: false,
          timer: 1200,
          icon: "success",
          footer: '<a href="/cart">Go to cart</a>'
        });
      }
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    case DELETE_CART_ITEM:
      if (window.location.pathname === "/cart") {
        Swal.fire({
          title: "Removed",
          text: "Book removed!",
          showConfirmButton: false,
          timer: 1000,
          icon: "info",
          footer: '<a href="/books">Go to books</a>'
        });
      }
      return {
        ...state,
        cart: action.payload,
        loading: false
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
        loading: false
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

import axios from "axios";
import {
  SET_CART,
  SET_CART_AMOUNT,
  EMPTY_CART,
  CART_LOADING,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM
} from "../actions/types";
import { tokenConfig } from "./authActions";
import { returnErrors
  // ,clearErrors
   } from "./errorActions";

export const setCart = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .get("/api/cart", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SET_CART,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const increaseQuantity = item => (dispatch, getState) => {
  dispatch(setCartLoading());
  Object.assign(item, { book_id: item._id });
  axios
    .put(`/api/cart`, { book: item }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const decreaseQuantity = item => (dispatch, getState) => {
  dispatch(setCartLoading());
  Object.assign(item, { book_id: item._id });
  axios
    .put(`/api/cart/decrease`, { book: item }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = item => (dispatch, getState) => {
  dispatch(setCartLoading());
  Object.assign(item, { book_id: item._id });
  axios
    .put(`/api/cart/delete-item`, { book: item }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_CART_ITEM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cartTotal = () => (dispatch, getState) => {
  // dispatch(setCartLoading());
  const items = getState().cart.cart;
  if (!items) {
    return 1;
  } else if (items.length > 0) {
    let quant = items.map(book => book.item_total);
    quant = quant.reduce((acc, curr) => acc + curr);
    let result = Math.round(quant * 100) / 100;
    dispatch({
      type: SET_CART_AMOUNT,
      payload: result
    });
    return;
  } else {
    return 1;
  }
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .post(`/api/cart/empty`,{action: 'empty cart'}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EMPTY_CART,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => dispatch => {
  return dispatch({
    type: CART_LOADING
  });
};

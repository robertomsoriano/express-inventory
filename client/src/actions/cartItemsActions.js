import axios from "axios";
import {
  SET_CART, SET_CART_VEHICLE,
  EMPTY_CART,
  CART_LOADING,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM,
  DELETE_CART_VEHICLE
} from "../actions/types";
import { tokenConfig } from "./authActions";
import {
  returnErrors, clearErrors
  // ,clearErrors
} from "./errorActions";

// Cart Vehicle
export const setCartVehicle = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .get("/api/cart-items/vehicle", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SET_CART_VEHICLE,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const postVehicleForCart = (vehicle) => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .post(`/api/cart-items/vehicle`, vehicle, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SET_CART_VEHICLE,
        payload: res.data
      });
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteCartVehicle = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .delete(`/api/cart-items/vehicle`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_CART_VEHICLE,
        payload: res.data
      });
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// End cart Vehicle

export const setCart = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .get("/api/cart-items", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const increaseQuantity = (item) => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .put(`/api/cart-items/add`, { item }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const decreaseQuantity = (item) => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .put(
      `/api/cart-items/decrease`,
      { item: item },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (item) => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .put(`/api/cart-items/delete-item/${item._id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_CART_ITEM,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const emptyCart = () => (dispatch, getState) => {
  dispatch(setCartLoading());
  axios
    .post(
      `/api/cart-item/empty`,
      { action: "empty cart" },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EMPTY_CART,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => (dispatch) => {
  return dispatch({
    type: CART_LOADING
  });
};

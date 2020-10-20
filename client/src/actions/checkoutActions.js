import axios from "axios";
import {
  POST_TRANSACTION,
  SET_CHECKOUT_LOADING,
  SET_INVOICE,
  CLEAR_INVOICE
} from "../actions/types";
import { tokenConfig } from "./authActions";
import {
  returnErrors
  // ,clearErrors
} from "./errorActions";
import Swal from 'sweetalert2'
export const postTransaction = (data) => (dispatch, getState) => {
  console.log(data)
  dispatch(setCheckoutLoading());
  axios
    .post("/api/item-checkout", data, tokenConfig(getState))
    .then(res => dispatch({
      type: POST_TRANSACTION,
      payload: res.data
    }))
    .catch(err => {
      Swal.fire({
        title: 'Could not complete Transaction',
        text: err.response.data.msg,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        footer: '<a href="/">Check inventory</a>'
      })
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const setInvoice = (trans) => dispatch => {
  dispatch(setCheckoutLoading(trans));
  return dispatch({
    type: SET_INVOICE,
    payload: trans
  });
}
export const clearInvoice = () => dispatch => {
  dispatch(setCheckoutLoading());
  return dispatch({
    type: CLEAR_INVOICE
  });
}


export const setCheckoutLoading = () => dispatch => {
  return dispatch({
    type: SET_CHECKOUT_LOADING
  });
};

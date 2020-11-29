import axios from "axios";
import {
  GET_TRANS,
  SET_TRANS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import {
  returnErrors
  // , clearErrors 
} from "./errorActions";

export const getTrans = () => (dispatch, getState) => {
  dispatch(setTransLoading());
  axios
    .get("/api/item-checkout", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TRANS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTransLoading = () => {
  return {
    type: SET_TRANS_LOADING
  };
};

import {
    GET_TRANS,
    SET_TRANS_LOADING
  } from "../actions/types";
  
  const initialState = {
    trans: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_TRANS:
        return {
          ...state,
          trans: action.payload,
          loading: false
        };
      case SET_TRANS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  
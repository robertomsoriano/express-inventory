import {
  SET_CHECKOUT_LOADING,
  POST_TRANSACTION,
  SET_INVOICE,
  CLEAR_INVOICE
} from "../actions/types";


const initialState = {
  invoice: null,
  loading: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_TRANSACTION:
      return {
        ...state,
        invoice: action.payload,
        loading: false
      };
    case SET_CHECKOUT_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_INVOICE:
      return {
        ...state,
        invoice: action.payload,
        loading: false
      }
    case CLEAR_INVOICE:
      return {
        ...state,
        invoice: null,
        loading: false
      }
    default:
      return state;
  }
}

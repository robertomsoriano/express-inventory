import axios from "axios";
import {
  GET_BOOKS,
  ADD_BOOK,
  PUT_BOOK,
  DELETE_BOOK,
  BOOKS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors, clearErrors } from "./errorActions";

export const getBooks = () => (dispatch, getState)=> {
  dispatch(setBooksLoading());
  axios
    .get("/api/books", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBook = book => (dispatch, getState) => {
  dispatch(setBooksLoading());
  axios
    .post("/api/books", book, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
      dispatch(getBooks());
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateBook = ({ id, book }) => (dispatch, getState) => {
  dispatch(setBooksLoading());
  axios
    .put(`/api/books/${id}`, book, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PUT_BOOK,
        payload: res.data
      });
      dispatch(getBooks());
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteBook = id => (dispatch, getState) => {
  dispatch(setBooksLoading());
  axios
    .delete(`/api/books/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_BOOK,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setBooksLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};

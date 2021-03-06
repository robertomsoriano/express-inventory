import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors, clearErrors } from './errorActions';

export const setItemsLoading = () => dispatch => {
    dispatch({
        type: ITEMS_LOADING
    })
    return
};


export const getItems = () => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addItem = item => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const updateItem = item => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .put(`/api/items/edit/${item.id}`, item, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_ITEM,
                payload: res.data
            }); dispatch(clearErrors())
        }
        )

        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


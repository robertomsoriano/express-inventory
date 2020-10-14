import axios from "axios";
import {
    GET_VEHICLES,
    ADD_VEHICLE, EDIT_VEHICLE, DELETE_VEHICLE, VEHICLES_LOADING
} from "../actions/types";
import { tokenConfig } from "./authActions";
import {
    returnErrors
    , clearErrors
} from "./errorActions";
// import Swal from 'sweetalert2'

export const setItemsLoading = () => dispatch => {
    dispatch({
        type: VEHICLES_LOADING
    })
    return
};

export const getVehicles = () => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .get('/api/vehicles', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_VEHICLES,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addVehicle = item => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .post('/api/vehicles', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_VEHICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const updateVehicle = item => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .put(`/api/vehicles/update/${item.id}`, item, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_VEHICLE,
                payload: res.data
            }); dispatch(clearErrors())
        }
        )

        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteVehicle = id => (dispatch, getState) => {
    axios
        .delete(`/api/vehicles/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_VEHICLE,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
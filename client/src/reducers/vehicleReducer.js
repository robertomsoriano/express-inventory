import {
    GET_VEHICLES,
    ADD_VEHICLE,
    EDIT_VEHICLE,
    DELETE_VEHICLE,
    VEHICLES_LOADING
} from '../actions/types';

const initialState = {
    vehicles: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VEHICLES:
            return {
                ...state,
                vehicles: action.payload,
                loading: false
            };
        case DELETE_VEHICLE:
            return {
                ...state,
                vehicles: state.vehicles.filter(veh => veh._id !== action.payload)
            };
        case ADD_VEHICLE:
        case EDIT_VEHICLE:
            return {
                ...state,
                vehicles: [action.payload, ...state.vehicles],
                loading: false
            };
        case VEHICLES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
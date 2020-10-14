import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getVehicles } from "../../actions/vehicleActions";
import AddVehicleModal from "./AddVehicleModal";

const VehicleList = (props) => {
    const state = useSelector(state => state)
    const vehicles = state.vehicles
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVehicles())
    }, [])
    useEffect(() => {
        console.log(vehicles)
    }, [vehicles])
    return (
        <div>
            <AddVehicleModal />
        </div>
    )
}

export default withRouter(VehicleList)
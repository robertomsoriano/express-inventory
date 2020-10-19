import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateVehicle, deleteVehicle } from '../../actions/vehicleActions'
import { clearErrors } from "../../actions/errorActions";
import axios from "axios";
import { ListGroupItem, Button, ButtonGroup, Input, Alert, Spinner } from "reactstrap";

import Swal from "sweetalert2";

const EditVehicle = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const vehicleID = props.match.params.id;
    const [vehicle, setVehicle] = useState({
        vehicle_type: "van",
        vehicle_name: "SUV Roja",
        vehicle_number: "342dk",
        vehicle_make: "Ford",
        vehicle_model: "Explorer",
        vehicle_year: "2020",
        vehicle_mileage: "1000",
        vehicle_state: "MA",
        vehicle_desc: "Explorer Roja",
        vehicle_image: "https://shop.ford.com/content/dam/shop_ford/en_us/common/resources/common/nameplate/2020/explorer/assetChoosePathLeft.png",
    });
    const [newType, setNewType] = useState(vehicle.vehicle_type);
    const [newName, setNewName] = useState(vehicle.vehicle_name);
    const [newNumber, setNewNumber] = useState(vehicle.vehicle_number);
    const [newMake, setNewMake] = useState(vehicle.vehicle_make);
    const [newModel, setNewModel] = useState(vehicle.vehicle_model);
    const [newYear, setNewYear] = useState(vehicle.vehicle_year);
    const [newMileage, setNewMileage] = useState(vehicle.vehicle_mileage);
    const [newState, setNewState] = useState(vehicle.vehicle_state);
    const [newDescription, setNewDescription] = useState(vehicle.vehicle_desc);
    const [newPic, setNewPic] = useState(vehicle.vehicle_image);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(`/api/vehicles/single/${vehicleID}`);
            if (result.data !== null) {
                await setVehicle(result.data);
                await setNewType(vehicle.vehicle_type)
                await setNewName(vehicle.vehicle_name);
                await setNewNumber(vehicle.vehicle_number)
                await setNewMake(vehicle.vehicle_make)
                await setNewModel(vehicle.vehicle_model);
                await setNewYear(vehicle.vehicle_year)
                await setNewMileage(vehicle.vehicle_mileage);
                await setNewState(vehicle.vehicle_state)
                await setNewDescription(vehicle.vehicle_desc);
                await setNewPic(vehicle.vehicle_image);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [vehicle.vehicle_type, vehicle.vehicle_name, vehicle.vehicle_number, vehicle.vehicle_make,
    vehicle.vehicle_model,
    vehicle.vehicle_year,
    vehicle.vehicle_mileage,
    vehicle.vehicle_state, vehicle.vehicle_desc, vehicle.vehicle_image]);

    const handleUpdate = (e, vehicleId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this vehicle?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.value) {
                dispatch(updateVehicle({
                    id: vehicleId,
                    vehicle: {
                        vehicle_type: newType,
                        vehicle_name: newName,
                        vehicle_number: newNumber,
                        vehicle_make: newMake,
                        vehicle_model: newModel,
                        vehicle_year: newYear,
                        vehicle_mileage: newMileage,
                        vehicle_state: newState,
                        vehicle_desc: newDescription,
                        vehicle_image: newPic
                    }
                }));
            }
        })
    };

    const handleDelete = (e, vehicleId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete Vehicle permanently?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.value) {
                dispatch(deleteVehicle(vehicleID))
                props.history.push('/')
            }
            else {
                Swal.fire({
                    title: 'Please contact admin',
                    text: "Deleting item was not allowed.",
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            }
        })

    };

    useEffect(() => {
        clearErrors()
    }, [state.error]);

    if (!vehicleID || (vehicle._id !== vehicleID)) {
        return (
            <Suspense fallback={<Spinner color="dark" />}>
                <Spinner color="dark" />
            </Suspense>
        )
    }
    return (
        <Suspense fallback={<Spinner color="dark" />}>
            <>

                <div className="edit-container" style={{ margin: "3rem" }}>
                    <div className="form-group edit-container-form">
                        {state.error.msg !== null && (
                            <Alert color="danger">{state.error.msg.msg}</Alert>
                        )}
                        <h2 className="edit-header">{newName}</h2>
                        <ListGroupItem>
                            <h5>Type of Vehicle</h5>
                            <ButtonGroup size="sm">
                                <Button onClick={() => setNewType('van')} style={newType === 'van' ? { backgroundColor: 'coral' } : {}}>Van</Button>
                                <Button onClick={() => setNewType('car')} style={newType === 'car' ? { backgroundColor: 'coral' } : {}}>Car</Button>
                                <Button onClick={() => setNewType('bus')} style={newType === 'bus' ? { backgroundColor: 'coral' } : {}}>Bus</Button>
                            </ButtonGroup>
                            <h5>Vehicle Name</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Name"
                                value={`${newName}`}
                                onChange={e => setNewName(e.target.value)}
                            />
                            <h5>Vehicle Plate</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Plate"
                                value={`${newNumber}`}
                                onChange={e => setNewNumber(e.target.value)}
                            />
                            <h5>Vehicle Make</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Make"
                                value={`${newMake}`}
                                onChange={e => setNewMake(e.target.value)}
                            />
                            <h5>Vehicle Model</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Model"
                                value={`${newModel}`}
                                onChange={e => setNewModel(e.target.value)}
                            />
                            <h5>Vehicle Year</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Year"
                                value={`${newYear}`}
                                onChange={e => setNewYear(e.target.value)}
                            />
                            <h5>Vehicle Mileage</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle Mileage"
                                value={`${newMileage}`}
                                onChange={e => setNewMileage(e.target.value)}
                            />
                            <h5>Vehicle State</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="Update Vehicle State"
                                value={`${newState}`}
                                onChange={e => setNewState(e.target.value)}
                            />
                            <h5>Description</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Vehicle description"
                                value={`${newDescription}`}
                                onChange={e => setNewDescription(e.target.value)}
                            />

                            <h5>Image</h5>
                            <Input
                                required
                                className=" form-control col-xs-2"
                                placeholder="update Vehicle image"
                                value={`${newPic}`}
                                onChange={e => setNewPic(e.target.value)}
                            />
                            <br />
                            <Button
                                color="secondary"
                                outline
                                size="sm"
                                onClick={e => handleUpdate(e, vehicle._id)}
                            >
                                Update Vehicle
            </Button>
                            <Button
                                color="secondary"
                                outline
                                size="sm"
                                onClick={e => handleDelete(e, vehicle._id)}
                            >
                                Delete Vehicle
            </Button>
                        </ListGroupItem>
                    </div>
                    <div className="edit-container-img">
                        <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
                        <div className="edit-container-link" style={{ marginTop: "1rem" }}>
                            <Button color="dark" href="/" block>
                                Go Back to Vehicle List
            </Button>
                        </div>
                    </div>
                </div>
            </>
        </Suspense>
    )
}

export default withRouter(EditVehicle)
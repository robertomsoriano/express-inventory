import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux";
import { addVehicle } from "../../actions/vehicleActions"
import { clearErrors } from "../../actions/errorActions";
//components
import {
    Alert, ListGroupItem, Button, ButtonGroup, Input, Spinner,
    Modal, ModalHeader, ModalBody, Form, FormGroup
} from "reactstrap";
const AddVehicleModal = (props) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(modal => !modal);
    };

    const [vehicle, setvehicle] = useState({
        vehicle_type: "van",
        vehicle_name: "",
        vehicle_number: "",
        vehicle_make: "",
        vehicle_model: "",
        vehicle_year: "",
        vehicle_mileage: "",
        vehicle_state: "",
        vehicle_desc: "",
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
    const onSubmit = e => {
        clearErrors();
        e.preventDefault();
        dispatch(addVehicle({
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
        }));
    };
    useEffect(() => {
        setNewType("van")
        setNewName("");
        setNewNumber("")
        setNewMake("")
        setNewModel("");
        setNewYear("")
        setNewMileage("");
        setNewState("MA")
        setNewDescription("");
        setNewPic("https://shop.ford.com/content/dam/shop_ford/en_us/common/resources/common/nameplate/2020/explorer/assetChoosePathLeft.png");
        setModal(false);
    }, [state.vehicles.vehicles.length]);


    useEffect(() => {
        clearErrors()
        // eslint-disable-next-line
    }, [state.errors]);

    return (
        <Suspense fallback={<Spinner color="dark" />}>
            <>
                <Button
                    className="btn-block"
                    color="dark"
                    style={{ marginBottom: "2rem", padding: ".6rem" }}
                    onClick={() => toggle()}>
                    Add New Vehicle
                </Button>
                <Modal isOpen={modal} toggle={() => toggle()}>
                    <ModalHeader toggle={() => toggle()}>Add New Vehicle</ModalHeader>
                    <ModalBody>
                        {state.error.msg !== null && (
                            <Alert color="danger">{state.error.msg.msg}</Alert>
                        )}
                        <div className="container" style={{ margin: ".2rem" }}>
                            <div className="form-group edit-container-form">
                                <Form onSubmit={(e) => onSubmit(e)}>
                                    <FormGroup>
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
                                                placeholder="Enter Vehicle name"
                                                value={`${newName}`}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                            <h5>Vehicle Plate</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle Plate"
                                                value={`${newNumber}`}
                                                onChange={e => setNewNumber(e.target.value)}
                                            />
                                            <h5>Vehicle Make</h5>
                                            <Input
                                                required
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle Make"
                                                value={`${newMake}`}
                                                onChange={e => setNewMake(e.target.value)}
                                            />
                                            <h5>Vehicle Model</h5>
                                            <Input
                                                required
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle Model"
                                                value={`${newModel}`}
                                                onChange={e => setNewModel(e.target.value)}
                                            />
                                            <h5>Vehicle Year</h5>
                                            <Input
                                                required
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle Year"
                                                value={`${newYear}`}
                                                onChange={e => setNewYear(e.target.value)}
                                            />
                                            <h5>Vehicle Mileage</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle Mileage"
                                                value={`${newMileage}`}
                                                onChange={e => setNewMileage(e.target.value)}
                                            />
                                            <h5>Vehicle State</h5>
                                            <Input
                                                required
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle State"
                                                value={`${newState}`}
                                                onChange={e => setNewState(e.target.value)}
                                            />
                                            <h5>Description</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle description"
                                                value={`${newDescription}`}
                                                onChange={e => setNewDescription(e.target.value)}
                                            />
                                            <h5>Image</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Vehicle image"
                                                value={`${newPic}`}
                                                onChange={e => setNewPic(e.target.value)}
                                            />
                                            <br />

                                        </ListGroupItem>
                                        <Button color="dark" style={{ marginTop: "2rem" }} block >
                                            Add Vehicle
                                         </Button>
                                    </FormGroup>
                                </Form>
                            </div>

                            <div className="edit-container-img">
                                <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </>
        </Suspense>
    )
}
export default withRouter(AddVehicleModal)
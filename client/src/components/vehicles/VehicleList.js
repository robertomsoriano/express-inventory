import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getVehicles, increaseQuantity } from "../../actions/vehicleActions";
import AddVehicleModal from "./AddVehicleModal";
// Components
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Table
    // Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Swal from "sweetalert2";


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
        <>

            {
                <Container style={{ marginTop: "5rem" }}>
                    <h2>{`Vehicle List`}</h2>
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            <CSSTransition timeout={0} classNames="fade">
                                <ListGroupItem>
                                    <Table
                                        hover
                                        responsive
                                        borderless
                                        style={{ overflowX: "auto" }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                {/* <th>Image</th> */}
                                            </tr>
                                        </thead>

                                        {vehicles.vehicles.length > 0 &&
                                            vehicles.vehicles.map((vehicle) => (
                                                <tbody
                                                    key={vehicle._id}
                                                    // bgcolor={vehicle.vehicle_quantity <= 0 ? "coral" : "white"}
                                                    style={{
                                                        backgroundColor: null
                                                    }}
                                                >
                                                    <tr>
                                                        <th scope="row">
                                                            {state.auth.isAuthenticated && (
                                                                <>
                                                                    <Link
                                                                        to={{
                                                                            pathname: `/vehicle/edit/${vehicle._id}`,
                                                                            state: { vehicle }
                                                                        }}
                                                                    >
                                                                        <Button className="edit-btn" outline>
                                                                            View/Edit
                                    </Button>
                                                                    </Link>
                                                                    <Button
                                                                        className="edit-btn"
                                                                        outline
                                                                    >
                                                                        Use Vehicle
                                  </Button>
                                                                </>
                                                            )}
                                                        </th>
                                                        <td>{vehicle.vehicle_name}</td>
                                                        <td>{vehicle.vehicle_desc}</td>
                                                        <td>
                                                            <img
                                                                src={`${vehicle.vehicle_image}`}
                                                                alt={vehicle.vehicle_name}
                                                                width="100px"
                                                                height="100px"
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                    </Table>
                                </ListGroupItem>
                            </CSSTransition>
                        </TransitionGroup>
                    </ListGroup>
                </Container>
            }
            <AddVehicleModal />
        </>
    )
}

export default withRouter(VehicleList)
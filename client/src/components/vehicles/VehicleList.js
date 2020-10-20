import React, { useEffect, Suspense } from "react";
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
    Table,
    Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Swal from "sweetalert2";
import { postVehicleForCart, deleteCartVehicle } from "../../actions/cartItemsActions";


const VehicleList = (props) => {
    const state = useSelector(state => state)
    const vehicles = state.vehicles
    const cartItems = state.cartItems
    const vehicleInCart = cartItems.vehicle ? cartItems.vehicle : null
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVehicles())
    }, [])
    useEffect(() => {
    }, [vehicles, vehicleInCart])
    const addVehicleToCart = (vehicleToAdd) => {
        dispatch(postVehicleForCart(vehicleToAdd))
    }
    const checkVehicleID = (vehID) => {
        if (vehicleInCart) {
            if (vehicleInCart._id === vehID) { return true }
        }
    }

    if (vehicleInCart) {
        return (
            <>
                <Suspense fallback={<Spinner color="dark" />}>
                    {

                        <Container style={{ marginTop: "5rem" }}>

                            <h2>{`Vehicle In Use For the Transaction`}</h2>
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
                                                        <th></th>
                                                        <th>Vehicle Plate</th>

                                                    </tr>
                                                </thead>
                                                <tbody
                                                    key={vehicleInCart._id}
                                                    style={{
                                                        backgroundColor: null
                                                    }}
                                                >
                                                    <tr>
                                                        <th scope="row">
                                                            {state.auth.isAuthenticated && (
                                                                <>
                                                                    <Link
                                                                        to={`/cart`}
                                                                    >
                                                                        <Button className="edit-btn" outline>
                                                                            Go to Cart
                                    </Button>
                                                                    </Link>
                                                                    <Button
                                                                        className="edit-btn"
                                                                        outline
                                                                        onClick={() => dispatch(deleteCartVehicle())}
                                                                    >
                                                                        Delete from Cart
                                                                </Button>
                                                                </>
                                                            )}
                                                        </th>
                                                        <td>{vehicleInCart.vehicle_number}</td>
                                                        <td>
                                                            <img
                                                                src={`${vehicleInCart.vehicle_image}`}
                                                                alt={vehicleInCart.vehicle_name}
                                                                width="100px"
                                                                height="100px"
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                {/* ))} */}
                                            </Table>
                                        </ListGroupItem>
                                    </CSSTransition>
                                </TransitionGroup>
                            </ListGroup>
                        </Container>
                    }
                    {/* <AddVehicleModal /> */}
                </Suspense>
            </>
        )
    }
    return (
        <>
            <Suspense fallback={<Spinner color="dark" />}>
                {

                    <Container style={{ marginTop: "5rem" }}>
                        {/* <Button
                            className="edit-btn"
                            outline
                            onClick={() => dispatch(deleteCartVehicle())}
                        >
                            Delete
                        </Button> */}
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
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Plate</th>
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
                                                                            style={vehicleInCart && checkVehicleID(vehicle._id) && { backgroundColor: 'coral' }}
                                                                            onClick={() => addVehicleToCart(vehicle)}
                                                                        >
                                                                            Use Vehicle
                                  </Button>
                                                                    </>
                                                                )}
                                                            </th>
                                                            <td>{vehicle.vehicle_name}</td>
                                                            <td>{vehicle.vehicle_number}</td>
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
            </Suspense>
        </>
    )
}

export default withRouter(VehicleList)
import React, { useEffect } from 'react'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
// import store from "./store";
import { loadUser } from "./actions/authActions";
import { setCart, setCartVehicle } from "./actions/cartItemsActions";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import "./components/invoice/invoice.css";

// Components
import MyNavbar from "./components/MyNavbar";
import { Container } from "reactstrap";
import { Spinner } from "react-bootstrap";
import ItemsList from "./components/items/ItemsList";
import EditItem from './components/items/EditItem';
import EditVehicle from './components/vehicles/EditVehicle';
import { Cart } from './components/cartItems/Cart';
import ShowInvoice from './components/invoice/ShowInvoice';
// import TransactionSearch from './components/search/TransactionSearch';
import TransSearch from './components/search/TransSearch';
import { getTrans } from './actions/transActions';
import { getVehicles } from './actions/vehicleActions';
export const App = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const state = useSelector((state) => state);
    let cart = state.cartItems.cart
    useEffect(() => {
        dispatch(loadUser())
        dispatch(setCart())
        dispatch(setCartVehicle())
        dispatch(getTrans())
        dispatch(getVehicles())
    }, [])

    if (!auth.isAuthenticated) {
        return (<><Router>
            <MyNavbar />
            <div className="spinner">
                <Spinner animation="grow" variant="info" />
            </div>
        </Router>
        </>)
    }

    if (auth.isLoading) {
        return (<><Router>
            <MyNavbar />
            <div className="spinner">
                <Spinner animation="grow" variant="info" />
            </div>
        </Router>
        </>)
    }

    return (
        <Router>
            <div className="App">
                <MyNavbar />
                <Container>
                    <Switch>
                        <Route path="/" exact render={() => <ItemsList cart={cart} />} />
                        <Route
                            path="/vehicle/edit/:id"
                            exact
                            render={(props) => <EditVehicle {...props} />}
                        />
                        <Route
                            path="/item/edit/:id"
                            exact
                            render={(props) => <EditItem {...props} />}
                        />
                        <Route
                            path="/cart"
                            exact
                            render={(props) => <Cart {...props} />}
                        />
                        <Route
                            path="/dashboard"
                            exact
                            render={(props) => <TransSearch {...props} />}
                        />
                        <Route
                            path="/invoice"
                            exact
                            render={(props) => <ShowInvoice {...props} />}
                        />
                    </Switch>
                </Container>
            </div>
        </Router>
    )
}

export default App
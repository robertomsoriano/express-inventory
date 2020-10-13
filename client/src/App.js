import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
// import store from "./store";
import { loadUser } from "./actions/authActions";
import { setCart } from "./actions/cartItemsActions";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import "./components/checkout/invoice.css";

// Components
import MyNavbar from "./components/MyNavbar";
import BooksSearch from "./components/books/BooksSearch";
import ItemsList from "./components/items/ItemsList";
import { Container } from "reactstrap";
import { Spinner } from "react-bootstrap";

export const App = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(loadUser())
        dispatch(setCart())
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
                        <Route path="/" exact render={() => <ItemsList />} />
                    </Switch>
                </Container>
            </div>
        </Router>
    )
}

export default App
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import { Container } from "reactstrap";

import { connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import "./components/checkout/invoice.css";
import BooksList from "./components/books/BooksList";
import EditBook from "./components/books/EditBook";
import Cart from "./components/cart/Cart";
// import CheckOut from "./components/checkout/CheckOut";
import NewCheckout from "./components/checkout/NewCheckout";
import Dashboard from "./components/dashboard/Dashboard";
import { Spinner } from "react-bootstrap";
import BooksSearch from "./components/books/BooksSearch";
import SearchBar from "./components/search/SearchBar";
import LandingPage from "./components/auth/LandingPage";
import SingleInvoice from "./components/dashboard/SingleInvoice";
class App extends Component {
  state = {
    user: null
  }
  componentDidMount() {
    store.dispatch(loadUser())

  }

  render() {
    let loading =
      store.getState().auth.isLoading && store.getState().book.loading && store.getState().trans.loading

    if (this.props.auth.loading === true || loading) {
      return (
        <>
          <div className="spinner">
            <Spinner animation="grow" variant="info" />
          </div>
        </>
      )
    }
    return (
      <>
        {loading && (
          <>
            <div className="spinner">
              <Spinner animation="grow" variant="info" />
            </div>
          </>
        )}
        {!loading && (
          <Router>
            <div className="App">
              <AppNavbar />
              <Container>
                <Switch>

                  {this.props.auth.isAuthenticated && (
                    <>
                      <Route path="/" exact render={() => this.props.auth.isAuthenticated ? <BooksSearch /> : <BooksList />} />
                      <Route path="/books" exact render={() => <SearchBar />} />
                      <Route
                        path="/edit/:id"
                        exact
                        render={(props) => <EditBook {...props} />}
                      />
                      <Route path="/dashboard" component={Dashboard} />
                      <Route path="/cart" exact component={Cart} />
                      <Route path="/checkout" component={NewCheckout} />
                      <Route path="/invoice" component={SingleInvoice} />

                    </>
                  )}
                  {!this.props.auth.isAuthenticated && <Route path="/" render={(props) => <LandingPage />} />}

                </Switch>
              </Container>
            </div>
          </Router>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  null,
)(App);
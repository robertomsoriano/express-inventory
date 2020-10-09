import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setCart, emptyCart } from "../../actions/cartActions";
import CartItems from "./CartItems";
import {Button} from 'reactstrap'

const Cart = props => {
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    props.setCart();
    // eslint-disable-next-line
  }, []);

  return cart.cart.length < 1 ? (
    <>
      <div>Cart is Empty</div>
        <Button className='my-4' color="primary" outline href="/books">
              Go Back to Book List
         </Button>
    </>
  ) : (
    <>
      <button onClick={() => props.emptyCart()}>Empty</button>
      <CartItems books={props.cart.cart} />
    </>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setCart, emptyCart }
)(Cart);

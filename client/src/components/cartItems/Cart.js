import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import CheckoutTransac from './CheckoutTransac';
import CartItems from './CartItems';

export const Cart = () => {
    return (
        <div>
            <CartItems />
            <CheckoutTransac />
        </div>
    )
}

export default withRouter(Cart)
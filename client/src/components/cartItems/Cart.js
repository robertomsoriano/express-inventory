import React, { useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
// Redux
import { useSelector, useDispatch } from "react-redux";
import CheckoutTransac from './CheckoutTransac';
import CartItems from './CartItems';

export const Cart = () => {
    const dispatch = useDispatch()
    const checkout = useSelector(state => state.checkout)
    useEffect(() => {
        console.log(checkout)
    }, [checkout])
    return (
        <div>
            <CartItems />
            <CheckoutTransac />
        </div>
    )
}

export default withRouter(Cart)
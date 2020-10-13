import { useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2'
const useCheckStock = (itemRequested) => {
    const [values, setValues] = useState();
    const state = useSelector(state => state.state)
    const itemInCart = state.cartItems.cart.filter(item => item._id === itemRequested._id)
    let inQuestion = state.items.filter(item => item._id === itemRequested._id)
    if ((itemInCart[0].item_quantity + 1) > inQuestion[0].item_quantity) {
        return Swal.fire({
            title: 'Could not add more items',
            text: "There are not enough items in stock to complete your order",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            footer: '<a href="/items">Check inventory</a>'
        })
    }
    console.log(itemRequested)
    return ["valid"]
};
export default useCheckStock
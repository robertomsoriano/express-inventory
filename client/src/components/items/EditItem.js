import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateItem, deleteItem } from '../../actions/itemsActions'
import { clearErrors } from "../../actions/errorActions";
import axios from "axios";
import { ListGroupItem, Button, Input, Alert, Spinner } from "reactstrap";

import Swal from "sweetalert2";

const EditItem = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const itemID = props.match.params.id;
    const [item, setItem] = useState({
        item_type: "l",
        item_name: "l",
        item_number: "l",
        item_desc: "l",
        item_price: "l",
        item_quantity: "l",
        item_image: "l",
        _id: "l"
    });
    const [newType, setNewType] = useState(item.item_type);
    const [newName, setNewName] = useState(item.name);
    const [newNumber, setNewNumber] = useState(item.item_number);
    const [newDescription, setNewDescription] = useState(item.item_desc);
    const [newPrice, setNewPrice] = useState(item.item_price);
    const [newQuantity, setNewQuantity] = useState(item.item_quantity);
    const [newPic, setNewPic] = useState(item.item_image);
    const [newID, setNewID] = useState(item._id);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(`/api/items/single/${itemID}`);
            if (result.data !== null) {
                await setItem(result.data);
                await setNewType(item.item_type)
                await setNewName(item.item_name)
                await setNewNumber(item.item_number)
                await setNewDescription(item.item_desc)
                await setNewPrice(item.item_price)
                await setNewQuantity(item.item_quantity)
                await setNewPic(item.item_image)
                await setNewID(item._id)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [item.item_type, item.item_name, item.item_number, item.item_desc, item.item_price, item.item_quantity, item.item_image]);

    const handleUpdate = (e, itemId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this item?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.value) {
                dispatch(updateItem({
                    id: itemId,
                    item: {
                        item_type: newType,
                        item_name: newName,
                        item_number: newNumber,
                        item_desc: newDescription,
                        item_price: newPrice,
                        item_quantity: newQuantity,
                        item_image: newPic
                    }
                }));
            }
        })
    };

    const handleDelete = (e, itemId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete item permanently?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.value) {
                dispatch(deleteItem(newID))
                props.history.push('/')
            }
            else {
                Swal.fire({
                    title: 'Please contact admin',
                    text: "Deleting item was not allowed.",
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                })
            }
        })

    };

    useEffect(() => {
        clearErrors()
    }, [state.error]);

    if (!itemID || (item._id !== itemID)) {
        return (
            <Suspense fallback={<Spinner color="dark" />}>
                <Spinner color="dark" />
            </Suspense>
        )
    }
    return (
        <Suspense fallback={<Spinner color="dark" />}>
            <>

                <div className="edit-container" style={{ margin: "3rem" }}>
                    <div className="form-group edit-container-form">
                        {state.error.msg !== null && (
                            <Alert color="danger">{state.error.msg.msg}</Alert>
                        )}
                        <h2 className="edit-header">{newName}</h2>
                        <ListGroupItem>
                            <h5>Type of Item</h5>
                            <Input
                                type="select"
                                className=" form-control col-xs-2"
                                placeholder="update Item Type"
                                value={`${newType}`}
                                onChange={e => setNewType(e.target.value)}
                            >
                                <option>part</option>
                                <option>service</option>
                            </Input>
                            <h5>Item Name</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Item Name"
                                value={`${newName}`}
                                onChange={e => setNewName(e.target.value)}
                            />
                            <h5>Item Number</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Item Name"
                                value={`${newNumber}`}
                                onChange={e => setNewNumber(e.target.value)}
                            />
                            <h5>Description</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Item description"
                                value={`${newDescription}`}
                                onChange={e => setNewDescription(e.target.value)}
                            />
                            <h5>Price</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Item price"
                                type="text"
                                value={`${newPrice}`}
                                onChange={e => setNewPrice(e.target.value)}
                            />

                            <h5>Quantity</h5>
                            <button
                                className="minus btn btn-info outline"
                                onClick={e => setNewQuantity(newQuantity => newQuantity - 1)}
                            >
                                -
            </button>
                            <input type="text" value={`${newQuantity}`} readOnly />
                            <button
                                className="plus btn btn-info outline"
                                onClick={e => setNewQuantity(newQuantity => newQuantity + 1)}
                            >
                                +
            </button>
                            <h5>Image</h5>
                            <Input
                                className=" form-control col-xs-2"
                                placeholder="update Item image"
                                value={`${newPic}`}
                                onChange={e => setNewPic(e.target.value)}
                            />
                            <br />
                            <Button
                                color="secondary"
                                outline
                                size="sm"
                                onClick={e => handleUpdate(e, item._id)}
                            >
                                Update Item
            </Button>
                            <Button
                                color="secondary"
                                outline
                                size="sm"
                                onClick={e => handleDelete(e, item._id)}
                            >
                                Delete Item
            </Button>
                        </ListGroupItem>
                    </div>
                    <div className="edit-container-img">
                        <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
                        <div className="edit-container-link" style={{ marginTop: "1rem" }}>
                            <Button color="dark" href="/" block>
                                Go Back to Item List
            </Button>
                        </div>
                    </div>
                </div>
            </>
        </Suspense>
    )
}

export default withRouter(EditItem)
import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../actions/itemsActions"
import { clearErrors } from "../../actions/errorActions";
//components
import {
    Alert, ListGroupItem, Button, ButtonGroup, Input, Spinner,
    Modal, ModalHeader, ModalBody, Form, FormGroup
} from "reactstrap";
const AddItem = (props) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(modal => !modal);
    };

    const [item, setItem] = useState({
        item_type: "part",
        item_name: "",
        item_number: "",
        item_desc: "",
        item_price: "99.99",
        item_quantity: "1",
        item_image: "https://contentinfo.autozone.com/znetcs/product-info/es/MX/rch/RS999935/image/10/",
    });
    const [newType, setNewType] = useState(item.item_type);
    const [newName, setNewName] = useState(item.item_name);
    const [newNumber, setNewNumber] = useState(item.item_number);
    const [newDescription, setNewDescription] = useState(item.item_desc);
    const [newPrice, setNewPrice] = useState(item.item_price);
    const [newQuantity, setNewQuantity] = useState(item.item_quantity);
    const [newPic, setNewPic] = useState(item.item_image);
    const onSubmit = e => {
        clearErrors();
        e.preventDefault();
        dispatch(addItem({
            item_type: newType,
            item_name: newName,
            item_number: newNumber,
            item_desc: newDescription,
            item_price: newPrice,
            item_quantity: newQuantity,
            item_image: newPic
        }));
    };
    useEffect(() => {
        setNewType("part")
        setNewName("");
        setNewNumber("")
        setNewDescription("");
        setNewPrice("99");
        setNewQuantity("1");
        setNewPic("https://contentinfo.autozone.com/znetcs/product-info/es/MX/rch/RS999935/image/10/");
        setModal(false);
    }, [state.items.items.length]);


    useEffect(() => {
        clearErrors()
        // eslint-disable-next-line
    }, [state.errors]);

    return (
        <Suspense fallback={<Spinner color="dark" />}>
            <>
                <Button
                    className="btn-block"
                    color="dark"
                    style={{ marginBottom: "2rem", padding: ".6rem" }}
                    onClick={() => toggle()}>
                    Add New Item
                </Button>
                <Modal isOpen={modal} toggle={() => toggle()}>
                    <ModalHeader toggle={() => toggle()}>Add New Item</ModalHeader>
                    <ModalBody>
                        {state.error.msg !== null && (
                            <Alert color="danger">{state.error.msg.msg}</Alert>
                        )}
                        <div className="container" style={{ margin: ".2rem" }}>
                            <div className="form-group edit-container-form">
                                <Form onSubmit={(e) => onSubmit(e)}>
                                    <FormGroup>
                                        <h2 className="edit-header">{newName}</h2>
                                        <ListGroupItem>
                                            <h5>Type of Item</h5>
                                            <ButtonGroup size="sm">
                                                <Button onClick={() => setNewType('part')} style={newType === 'part' ? { backgroundColor: 'coral' } : {}}>Part</Button>
                                                <Button onClick={() => setNewType('service')} style={newType === 'service' ? { backgroundColor: 'coral' } : {}}>Service</Button>
                                            </ButtonGroup>
                                            <h5>Name</h5>
                                            <Input
                                                required
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Item name"
                                                value={`${newName}`}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                            <h5>Item Number</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Item number"
                                                value={`${newNumber}`}
                                                onChange={e => setNewNumber(e.target.value)}
                                            />
                                            <h5>Description</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Item description"
                                                value={`${newDescription}`}
                                                onChange={e => setNewDescription(e.target.value)}
                                            />
                                            <h5>Price</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Item price"
                                                type="text"
                                                value={`${newPrice}`}
                                                onChange={e => setNewPrice(e.target.value)}
                                            />

                                            <h5>Quantity</h5>
                                            <Input
                                                type="text"
                                                name="quantity"
                                                id="quantity"
                                                value={newQuantity}
                                                placeholder="Add quantity"
                                                onChange={e => setNewQuantity(e.target.value)}
                                                required
                                            />
                                            <h5>Image</h5>
                                            <Input
                                                className=" form-control col-xs-2"
                                                placeholder="Enter Item image"
                                                value={`${newPic}`}
                                                onChange={e => setNewPic(e.target.value)}
                                            />
                                            <br />

                                        </ListGroupItem>
                                        <Button color="dark" style={{ marginTop: "2rem" }} block >
                                            Add Item
                                         </Button>
                                    </FormGroup>
                                </Form>
                            </div>

                            <div className="edit-container-img">
                                <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </>
        </Suspense>
    )
}
export default withRouter(AddItem)
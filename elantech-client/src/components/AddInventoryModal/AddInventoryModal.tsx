import axios from "axios";
import moment from "moment";
import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";
import IInventory from "../../types/IInventory";
import IProduct from "../../types/IProduct";

interface AddInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedProduct: IProduct;
    // modalSwitch: Number;
}
const AddInventoryComponent: FunctionComponent<AddInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [radioSwitch, setRadioSwitch] = useState(false);
    const [inventoryObj, setInventoryObj] = useState<IInventory>({
        id: 0,
        productId: props.selectedProduct.id,
        removedId: 0,
        poId: undefined,
        serialNumber: '',
        condition: '',
        warrantyExpiration: '',
        isTested: false,
        dateTested: '',
        comment: '',
        location: '',
    });
    const [inventoryList, setInventoryList] = useState<IInventory[]>([]);

    const finish = async () => {
        // setInventoryObj({ ...inventoryObj, productId: props.selectedProduct.id });
        // inventoryList.push(inventoryObj);
        // setIsSaving(true);
        setTimeout(() => {
            axios.post(`${BASE_API_URL}inventory`, inventoryObj, { withCredentials: true })
                .then((response) => {
                    setIsSaving(false);
                    // props.getAllInventory();
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 400);
    };
    const addInventory = () => {
        // setInventoryObj({ ...inventoryObj, productId: props.selectedProduct.id });
        // inventoryList.push(inventoryObj);
        // // setInventoryObj(INVENTORY);
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Add Inventory </h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter inventory information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' >
                                <ul>
                                    <li key='1' style={{ listStyle: 'none' }}>
                                        <Spinner animation="border" role="status" />
                                    </li>
                                    <li key='2' style={{ listStyle: 'none' }}>
                                        <label>Loading...</label>
                                    </li>
                                </ul>
                            </div>
                            :
                            <Form className="container d-grid" >
                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <div key={`inline-radio`} className="mb-3">
                                            <Form.Check
                                                inline
                                                defaultChecked
                                                label="Generated Sku's"
                                                name='group1'
                                                type={'radio'}
                                                id={'inline-radio-2'}
                                                onClick={() => {
                                                    setRadioSwitch(false)
                                                    // Clear Serial Number Text Field
                                                }}
                                            />
                                            <Form.Check
                                                inline
                                                label="Unique Sku's"
                                                name='group1'
                                                type={'radio'}
                                                id={'inline-radio-1'}
                                                onClick={() => {
                                                    setRadioSwitch(true)
                                                    // Clear Quantity Field
                                                }}
                                            />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                                {
                                    radioSwitch ?
                                        <Form.Group className="mb-3">
                                            <Form.Label>Serial Number</Form.Label>
                                            <Form.Control
                                                id="serialNumber" type="text" placeholder="Serial Number"
                                                value={inventoryObj.serialNumber}
                                                onChange={(e) => setInventoryObj({ ...inventoryObj, serialNumber: (e.target.value) })}
                                            />
                                        </Form.Group>
                                        :
                                        <Form.Group className="mb-3">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                id="quantity" type="text" placeholder="Quantity"
                                            />
                                        </Form.Group>
                                }
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={inventoryObj.condition}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, condition: (e.target.value) })}
                                    >
                                        <option>Choose Condition</option>
                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                        <option value="New Opened Box">New Opened Box</option>
                                        <option value="Renew">Renew</option>
                                        <option value="Used">Used</option>
                                        <option value="Damaged">Damaged</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Warranty Expiration</Form.Label>
                                    <Form.Control id="orderNumber" type="date"
                                        value={inventoryObj.warrantyExpiration}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, warrantyExpiration: moment(e.target.value).format('YYYY-MM-DD') })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Tested</Form.Label>
                                    <Form.Control id="dateTested" type="date"
                                        value={inventoryObj.dateTested}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, dateTested: moment(e.target.value).format('YYYY-MM-DD') })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tested</Form.Label>
                                    <InputGroup>
                                        <div key={`inline-radio-2`}>
                                            <Form.Check
                                                inline
                                                defaultChecked
                                                label="Tested"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-3'}
                                                onClick={() => {
                                                    setInventoryObj({ ...inventoryObj, isTested: (true) })
                                                }}
                                            />
                                            <Form.Check
                                                inline
                                                label="Not Tested"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-4'}
                                                onClick={() => {
                                                    setInventoryObj({ ...inventoryObj, isTested: (false) })
                                                }}
                                            />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments" type="text" placeholder="Comments"
                                        value={inventoryObj.comment}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, comment: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        id="location" type="text" placeholder="Location"
                                        value={inventoryObj.location}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, location: (e.target.value) })}
                                    />
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={() => {
                                finish();
                            }}>
                            Finish
                        </Button>
                        <Button
                            variant="dark"
                            onClick={() => {
                                addInventory();
                            }}>
                            Add Next
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddInventoryModal = withRouter(AddInventoryComponent);
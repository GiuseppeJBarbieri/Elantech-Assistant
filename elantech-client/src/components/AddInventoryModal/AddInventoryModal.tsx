import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface AddInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const AddInventoryComponent: FunctionComponent<AddInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [radioSwitch, setRadioSwitch] = useState(false);

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
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Choose Condition</option>
                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                        <option value="New Opened Box">New Opened Box</option>
                                        <option value="Renew">Renew</option>
                                        <option value="Used">Used</option>
                                        <option value="Damaged">Damaged</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seller</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Choose Seller</option>
                                        <option value="New Factory Sealed">Ebay</option>
                                        <option value="New Opened Box">Company 1</option>
                                        <option value="Renew">Company 2</option>
                                        <option value="Used">Company 3</option>
                                        <option value="Damaged">Company 4</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Order Number</Form.Label>
                                    <Form.Control
                                        id="orderNumber" type="text" placeholder="Order Number"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Received</Form.Label>
                                    <Form.Control id="orderNumber" type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Warranty Expiration</Form.Label>
                                    <Form.Control id="orderNumber" type="date"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments" type="text" placeholder="Comments"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        id="location" type="text" placeholder="Location"
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
                                                    console.log('Not Tested');
                                                }}
                                            />
                                            <Form.Check
                                                inline
                                                label="Not Tested"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-4'}
                                                onClick={() => {
                                                    console.log('Not Tested');
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
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('')
                            }}>
                            Finish
                        </Button>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('')
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
import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IInventory from "../../types/IInventory";

interface EditInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedInventory: IInventory | undefined;
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const EditInventoryComponent: FunctionComponent<EditInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [editInventory, setEditInventory] = useState<IInventory>(
        {
            serial_number: props.selectedInventory?.serial_number,
            condition: props.selectedInventory?.condition,
            seller_name: props.selectedInventory?.seller_name,
            order_number: props.selectedInventory?.order_number,
            date_received: props.selectedInventory?.date_received,
            warranty_expiration: props.selectedInventory?.warranty_expiration,
            tested: props.selectedInventory?.tested,
            comment: props.selectedInventory?.comment,
            location: props.selectedInventory?.location,
            reserved: props.selectedInventory?.reserved
        },
    )
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
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control
                                        id="serialNumber" type="text" placeholder="Serial Number"
                                        value={editInventory.serial_number}
                                        onChange={(e) => setEditInventory({ ...editInventory, serial_number: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={editInventory.condition}
                                        onChange={(e) => setEditInventory({ ...editInventory, condition: (e.target.value) })}
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
                                    <Form.Label>Seller</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Choose Seller</option>
                                        <option value="Ebay">Ebay</option>
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
                                        value={editInventory.order_number}
                                        onChange={(e) => setEditInventory({ ...editInventory, order_number: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Received</Form.Label>
                                    <Form.Control id="orderNumber" type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Warranty Expiration</Form.Label>
                                    <Form.Control id="orderNumber" type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments" type="text" placeholder="Comments"
                                        value={editInventory.comment}
                                        onChange={(e) => setEditInventory({ ...editInventory, comment: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        id="location" type="text" placeholder="Location"
                                        value={editInventory.location}
                                        onChange={(e) => setEditInventory({ ...editInventory, location: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tested</Form.Label>
                                    <Form.Control
                                        id="tested" type="text" placeholder="Tested"
                                        value={editInventory.tested}
                                        onChange={(e) => setEditInventory({ ...editInventory, tested: (e.target.value) })}
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
                            onClick={async () => {
                                console.log('')
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditInventoryModal = withRouter(EditInventoryComponent);
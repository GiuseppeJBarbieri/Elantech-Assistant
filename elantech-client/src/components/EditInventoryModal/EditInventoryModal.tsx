import axios from "axios";
import moment from "moment";
import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";
import IInventory from "../../types/IInventory";

interface EditInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedInventory: IInventory;
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const EditInventoryComponent: FunctionComponent<EditInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [inventoryObj, setInventoryObj] = useState<IInventory>(props.selectedInventory);
    const finished = () => {
        setIsSaving(true);
        setTimeout(() => {
            axios.put(`${BASE_API_URL}inventory`, inventoryObj, { withCredentials: true })
                .then((response) => {
                    setIsSaving(false);
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 500);
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Edit Inventory </h2>
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
                                        value={inventoryObj.serialNumber}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, serialNumber: (e.target.value) })}
                                    />
                                </Form.Group>
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
                    <Button
                        variant="dark"
                        onClick={() => {
                            finished();
                        }}>
                        Finish
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditInventoryModal = withRouter(EditInventoryComponent);
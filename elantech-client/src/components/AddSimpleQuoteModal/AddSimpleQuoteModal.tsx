import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface AddSimpleQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const AddSimpleQuoteModalComponent: FunctionComponent<AddSimpleQuoteModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Simple Quote </h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter quote information.</p>
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
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Choose Company</option>
                                        <option value="New Factory Sealed">Company A</option>
                                        <option value="New Opened Box">Company B</option>
                                        <option value="Renew">Company C</option>
                                        <option value="Used">Company D</option>
                                        <option value="Damaged">Company E</option>
                                    </Form.Select>
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
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        id="sellerName" type="text" placeholder="Quantity"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        id="orderNumber" type="text" placeholder="Price"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control id="orderNumber" type="date" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sold</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Did it sell?</option>
                                        <option value="Sold">Sold</option>
                                        <option value="Not Sold">Not Sold</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="warrantyExpiration" as="textarea" placeholder="Comments"
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

export const AddSimpleQuoteModal = withRouter(AddSimpleQuoteModalComponent);
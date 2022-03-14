import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IProduct from "../../types/IProduct";

import './AddProductModal.css'

interface AddProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    edit_product?: IProduct;
}

const AddProductModalComponent: FunctionComponent<AddProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)'}} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Create Product </h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter product information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: '#2c3034', color: 'white'}}>
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
                                    <Form.Label>Product Number</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Product Number"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Control
                                        id="town" type="text" placeholder="Product Type"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        id="orderNumber" type="text" placeholder="Brand"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Related Tags</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Related Tags"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Description"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Website Link"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ebay Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Ebay Link"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Related Tags</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Quick Specs"
                                    />
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left'}}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('')
                            }}>
                            Add Time Frame
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddProductModal = withRouter(AddProductModalComponent);
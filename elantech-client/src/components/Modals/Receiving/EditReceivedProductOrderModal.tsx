import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface EditReceivedProductOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const EditReceivedProductOrderModalComponent: FunctionComponent<EditReceivedProductOrderModalProps> = (props) => {
    const [isSaving] = useState(false);
    const [title] = useState('Edit Order Information');
    
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >{title}</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter product information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' style={{ margin: 'auto', textAlign: 'center', verticalAlign: 'middle' }} >
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
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Product Number"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition Upon Delivery</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Product Type</option>
                                        <option value="CPU">CPU</option>
                                        <option value="Riser">Riser</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('');
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditReceivedProductOrderModal = withRouter(EditReceivedProductOrderModalComponent);

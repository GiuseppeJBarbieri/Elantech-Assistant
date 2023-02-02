
import axios from 'axios';
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../../constants/API';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';

interface RemoveMultipleInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedInventory: IInventory[] | undefined;
    getAllProducts: () => void;
    getAllInventory: (productId: number) => void;
    selectedProduct: IProduct;
}

const RemoveMultipleInventoryModalComponent: FunctionComponent<RemoveMultipleInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Missing Required Information');
    const handleAlert = (message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }
    const removeInventories = () => {
        setIsSaving(true);
        (props.selectedInventory as IInventory[]).forEach((inventory, index) => {
            setTimeout(async () => {
                await axios.delete(`${BASE_API_URL}inventory/${inventory.id}`, { withCredentials: true })
                    .then((response) => {
                        console.log(response);
                        if(index === (props.selectedInventory?.length as number) - 1 ) {
                            console.log('here')
                            props.getAllInventory(props.selectedProduct.id as number);
                            props.getAllProducts();
                        }
                    })
                    .catch((err) => {
                        setIsSaving(false);
                        handleAlert(err);
                    })
            }, 600);
            
        });
        setIsSaving(false);

        props.onClose();
    };
    return (
        <div>
            <Modal
                backdrop="static"
                show={props.modalVisible}
                onHide={props.onClose}
            >
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Removing Inventory</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>You are about to remove {props.selectedInventory?.length} products from inventory</p>
                    </Modal.Title>
                    <CustomAlert label={alertMessage} type={'danger'} showAlert={showAlert} />
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
                                    <Form.Label>Please enter a reason for removal</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Too many added</option>
                                        <option value="CPU">No longer here</option>
                                        <option value="Riser">Other</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                    />
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
                                removeInventories();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveMultipleInventoryModal = withRouter(RemoveMultipleInventoryModalComponent);

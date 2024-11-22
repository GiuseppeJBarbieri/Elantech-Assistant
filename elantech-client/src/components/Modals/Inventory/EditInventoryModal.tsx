import axios from 'axios';
import moment from 'moment';
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../../constants/API';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';

interface EditInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    selectedInventory: IInventory;
    modalVisible: boolean;
    getAllInventory: (productId: number) => void
    selectedProduct: IProduct;
}

const EditInventoryComponent: FunctionComponent<EditInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [inventoryObj, setInventoryObj] = useState<IInventory>(props.selectedInventory);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Missing Required Information');
    const [warrantyDate, setWarrantyDate] = useState(moment().format('YYYY-MM-DD'));
    const [dateTested, setDateTested] = useState(moment().format('YYYY-MM-DD'));

    const handleAlert = (message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }
    const finished = () => {
        setIsSaving(true);
        if (inventoryObj.serialNumber === '' ||
            inventoryObj.condition === 'Choose Condition') {
            handleAlert(`Missing Required Information: ${inventoryObj.serialNumber === '' ? 'Serial Number' : 'Condition'}`);
            setIsSaving(false);
        } else {
            setTimeout(() => {
                axios.put(`${BASE_API_URL}inventory`, inventoryObj, { withCredentials: true })
                    .then((response) => {
                        setIsSaving(false);
                        props.getAllInventory(props.selectedProduct.id as number)
                        props.onClose();
                    })
                    .catch((err) => {
                        setIsSaving(false);
                        handleAlert(err)
                    });
            }, 500);
        }
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Edit Inventory </h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter inventory information.</p>
                        <p style={{ color: '#ff2f2f', fontSize: 16, fontWeight: 300, marginTop: -10, marginBottom: -5 }}>Required *</p>
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
                                <CustomAlert label={alertMessage} type={'danger'} showAlert={showAlert} />
                                <Form.Group className="mb-3">
                                    <Form.Label>Serial Number<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="serialNumber" type="text" placeholder="Serial Number"
                                        value={inventoryObj.serialNumber}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, serialNumber: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
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
                                        <Form.Label>Warranty Expiration<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                        <Form.Control id="orderNumber" type="date"
                                            value={warrantyDate}
                                            onChange={(e) => {
                                                setWarrantyDate(moment(e.target.value).format('YYYY-MM-DD'));
                                                setInventoryObj({ ...inventoryObj, warrantyExpiration: moment(e.target.value).format() });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date Tested</Form.Label>
                                        <Form.Control id="dateTested" type="date"
                                            value={dateTested}
                                            onChange={(e) => {
                                                setDateTested(moment(e.target.value).format('YYYY-MM-DD'));
                                                setInventoryObj({ ...inventoryObj, testedDate: moment(e.target.value).format() })
                                            }}
                                        />
                                    </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tested</Form.Label>
                                    <InputGroup>
                                        <div key={'inline-radio-2'}>
                                            <Form.Check
                                                inline
                                                defaultChecked
                                                label="Tested"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-3'}
                                                onClick={() => {
                                                    setInventoryObj({ ...inventoryObj, tested: (true) })
                                                }}
                                            />
                                            <Form.Check
                                                inline
                                                label="Not Tested"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-4'}
                                                onClick={() => {
                                                    setInventoryObj({ ...inventoryObj, tested: (false) })
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
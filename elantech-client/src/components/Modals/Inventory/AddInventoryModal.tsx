import axios from 'axios';
import moment from 'moment';
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, InputGroup, Col, Row } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../../constants/API';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { uuid } from 'uuidv4';

interface AddInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedProduct: IProduct;
    getAllProducts: () => void;
    getAllInventory: (productId: number) => void
}
const AddInventoryComponent: FunctionComponent<AddInventoryModalProps> = (props) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Missing Required Information');
    const [isSaving, setIsSaving] = useState(false);
    const [radioSwitch, setRadioSwitch] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [inventoryObj, setInventoryObj] = useState<IInventory>({
        id: 0,
        productId: props.selectedProduct.id || 0,
        removedId: undefined,
        poId: undefined,
        serialNumber: '',
        condition: '',
        warrantyExpiration: '',
        isTested: false,
        dateTested: '',
        comment: '',
        location: '',
    });

    const addInventoryObj = (addInvObj: IInventory) => {
        axios.post(`${BASE_API_URL}inventory`, addInvObj, { withCredentials: true })
            .then((response) => { '' })
            .catch((err) => {
                setIsSaving(false);
                handleAlert(err)
            });
    };
    const handleAlert = (message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }
    const finish = async () => {
        setIsSaving(true);
        if (inventoryObj.condition !== '' || inventoryObj.warrantyExpiration !== '') {
            if (!radioSwitch) {
                if (quantity === 0) {
                    setIsSaving(false);
                    handleAlert('Quantity Cannot Be Zero!');
                } else {
                    setInventoryObj({ ...inventoryObj, productId: props.selectedProduct.id || 0 });
                    setTimeout(() => {
                        for (let i = 0; i < quantity; i++) {
                            const addInvObj: IInventory = inventoryObj;
                            addInvObj.serialNumber = uuid();
                            addInventoryObj(addInvObj);
                        }
                        setIsSaving(false);
                        props.getAllProducts();
                        props.getAllInventory(props.selectedProduct.id as number);
                        props.onClose();
                    }, 400);
                }
            } else {
                if (inventoryObj.serialNumber === '') {
                    setIsSaving(false);
                    handleAlert('Serial Number Cannot be Blank!')
                } else {
                    setInventoryObj({ ...inventoryObj, productId: props.selectedProduct.id as number });
                    const addInvObj: IInventory = inventoryObj;
                    setTimeout(() => {
                        axios.post(`${BASE_API_URL}inventory`, addInvObj, { withCredentials: true })
                            .then((response) => {
                                setIsSaving(false);
                                props.getAllProducts();
                                props.getAllInventory(props.selectedProduct.id as number);
                                props.onClose();
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsSaving(false);
                            });
                        setIsSaving(false);
                        props.getAllProducts();
                        props.getAllInventory(props.selectedProduct.id as number);
                        props.onClose();
                    }, 400);
                }
            }
        } else {
            setIsSaving(false);
            handleAlert('Missing Required Information!');
        }
    };
    const addInventory = () => {
        setInventoryObj({ ...inventoryObj, productId: props.selectedProduct.id as number });
        const copyInvObj = inventoryObj;
        copyInvObj.productId = props.selectedProduct.id as number;
        addInventoryObj(copyInvObj);
        setInventoryObj({ ...inventoryObj, serialNumber: '' });
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Add Inventory </h2>
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
                            <Form>
                                <CustomAlert label={alertMessage} type={'danger'} showAlert={showAlert} />
                                <Form.Group className="mb-3">
                                    <Form.Label>Choose one</Form.Label>
                                    <InputGroup key={'inline-radio'}>

                                        <Form.Check
                                            inline
                                            defaultChecked
                                            label="Generated Sku's"
                                            name='group1'
                                            type={'radio'}
                                            id={'inline-radio-2'}
                                            onClick={() => {
                                                setRadioSwitch(false);
                                                setInventoryObj({ ...inventoryObj, serialNumber: '' });
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label="Unique Sku"
                                            name='group1'
                                            type={'radio'}
                                            id={'inline-radio-1'}
                                            onClick={() => {
                                                setRadioSwitch(true);
                                                setQuantity(0);
                                            }}
                                        />

                                    </InputGroup>
                                </Form.Group>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        {
                                            radioSwitch ?
                                                <>
                                                    <Form.Label>Serial Number<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                                    <Form.Control
                                                        id="serialNumber" type="text" placeholder="Serial Number"
                                                        value={inventoryObj.serialNumber}
                                                        onChange={(e) => setInventoryObj({ ...inventoryObj, serialNumber: (e.target.value) })}
                                                    />

                                                </>
                                                :
                                                <>
                                                    <Form.Label>Quantity<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                                    <Form.Control
                                                        id="quantity" type="number" placeholder="Quantity"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                                                    />
                                                </>

                                        }
                                    </Form.Group>
                                    <Form.Group as={Col}>
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
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Warranty Expiration<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                        <Form.Control id="orderNumber" type="date"
                                            value={inventoryObj.warrantyExpiration}
                                            onChange={(e) => setInventoryObj({ ...inventoryObj, warrantyExpiration: moment(e.target.value).format('YYYY-MM-DD') })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Date Tested</Form.Label>
                                        <Form.Control id="dateTested" type="date"
                                            value={inventoryObj.dateTested}
                                            onChange={(e) => setInventoryObj({ ...inventoryObj, dateTested: moment(e.target.value).format('YYYY-MM-DD') })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Did you test it?</Form.Label>
                                        <InputGroup>
                                            <div key={'inline-radio-2'} style={{ justifyContent: 'space-between' }}>
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
                                    <Form.Group as={Col}>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            id="location" type="text" placeholder="Location"
                                            value={inventoryObj.location}
                                            onChange={(e) => setInventoryObj({ ...inventoryObj, location: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments" type="text" placeholder="Comments"
                                        value={inventoryObj.comment}
                                        onChange={(e) => setInventoryObj({ ...inventoryObj, comment: (e.target.value) })}
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
                        {radioSwitch &&
                            <Button
                                variant="dark"
                                onClick={() => {
                                    addInventory();
                                }}>
                                Add Next
                            </Button>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddInventoryModal = withRouter(AddInventoryComponent);
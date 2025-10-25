import moment from 'moment';
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { ProductConditions } from '../../../constants/Options';
import { defaultAlert } from '../../../constants/Defaults';
import { requestUpdateInventory } from '../../../utils/Requests';

interface EditInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    onSuccess: () => void;
    selectedInventory: IInventory;
    modalVisible: boolean;
    selectedProduct: IProduct;
}

const EditInventoryComponent: FunctionComponent<EditInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [condition, setCondition] = useState(props.selectedInventory.condition || ProductConditions.ChooseCondition);
    const [inventoryObj, setInventoryObj] = useState<IInventory>({
        id: props.selectedInventory.id,
        productId: props.selectedInventory.productId,
        purchaseOrderId: props.selectedInventory.purchaseOrderId,
        serialNumber: props.selectedInventory.serialNumber,
        condition: props.selectedInventory.condition,
        warrantyExpiration: moment(props.selectedInventory.warrantyExpiration).startOf('day').toDate(),
        testedDate: moment(props.selectedInventory.testedDate).startOf('day').toDate(),
        tested: props.selectedInventory.tested,
        comment: props.selectedInventory.comment,
        location: props.selectedInventory.location,
        reserved: props.selectedInventory.reserved,
    });

    const finished = () => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                if (inventoryObj.serialNumber === '' ||
                    inventoryObj.warrantyExpiration === null ||
                    inventoryObj.warrantyExpiration === undefined ||
                    condition === ProductConditions.ChooseCondition) {
                    setAlert({ ...alert, label: `Missing Required Information: ${inventoryObj.serialNumber === '' ? 'Serial Number' : 'Condition'}`, show: true });
                    setIsSaving(false);

                } else if (inventoryObj.tested && inventoryObj.testedDate.toString() === 'Invalid Date') {
                    setAlert({ ...alert, label: `Missing Required Information: Tested Date`, show: true });
                    setIsSaving(false);
                } else {
                    await requestUpdateInventory(inventoryObj);
                    props.onSuccess();
                    props.onClose();

                }
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
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
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
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
                                        value={condition}
                                        onChange={(e) => {
                                            setCondition(e.target.value)
                                            setInventoryObj({ ...inventoryObj, condition: e.target.value })
                                        }}
                                    >
                                        <option key={ProductConditions.ChooseCondition} value={ProductConditions.ChooseCondition}>{ProductConditions.ChooseCondition}</option>
                                        <option key={ProductConditions.NewFactorySealed} value={ProductConditions.NewFactorySealed}>{ProductConditions.NewFactorySealed}</option>
                                        <option key={ProductConditions.NewOpenedBox} value={ProductConditions.NewOpenedBox}>{ProductConditions.NewOpenedBox}</option>
                                        <option key={ProductConditions.Renew} value={ProductConditions.Renew}>{ProductConditions.Renew}</option>
                                        <option key={ProductConditions.Used} value={ProductConditions.Used}>{ProductConditions.Used}</option>
                                        <option key={ProductConditions.Damaged} value={ProductConditions.Damaged}>{ProductConditions.Damaged}</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Warranty Expiration<Form.Label style={{ color: '#ff2f2f', fontSize: 12, fontWeight: 300, marginLeft: 5 }}>*</Form.Label></Form.Label>
                                    <Form.Control id="orderNumber" type="date"
                                        value={moment(inventoryObj.warrantyExpiration).format('yyyy-MM-DD')}
                                        onChange={(e) => {
                                            if (e.target.value !== '') {
                                                setInventoryObj({ ...inventoryObj, warrantyExpiration: moment(e.target.value).toDate() });
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Tested</Form.Label>
                                    <Form.Control id="dateTested" type="date"
                                        value={moment(inventoryObj.testedDate).format('YYYY-MM-DD')}
                                        onChange={(e) => {
                                            if (e.target.value !== '') {
                                                setInventoryObj({ ...inventoryObj, testedDate: moment(e.target.value).toDate() })
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tested</Form.Label>
                                    <InputGroup>
                                        <div key={'inline-radio-2'}>
                                            <Form.Check
                                                inline
                                                defaultChecked={inventoryObj.tested}
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
                                                defaultChecked={!inventoryObj.tested}
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
                                        value={inventoryObj.comment || ''}
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
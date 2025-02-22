import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IReceivedItem from '../../../types/IReceivedItem';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { defaultAlert } from '../../../constants/Defaults';
import { UnsavedChangesModal } from '../UnsavedChangesModal';
import { requestEditReceivedItem } from '../../../utils/Requests';

interface EditReceivedProductOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    getAllReceivedItems: () => Promise<void>
    selectedItem: IReceivedItem;
    onClose: () => Promise<void>;
}

const EditReceivedProductOrderModalComponent: FunctionComponent<EditReceivedProductOrderModalProps> = ({ getAllReceivedItems, selectedItem, onClose }) => {
    const [mainAlert, setMainAlert] = useState(defaultAlert);
    const [unsavedModalVisible, setUnsavedModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [receivedItemState, setReceivedItemState] = useState<IReceivedItem>({...selectedItem});
    
    const validateForm = () => {
        let isEmpty = false;
        if (receivedItemState.quantity === 0) isEmpty = true;
        if (receivedItemState.cud === '') isEmpty = true;

        // Alert when form can not validate
		if (isEmpty) {
			setMainAlert({ ...mainAlert, label: 'Please enter required information.', show: true });
			setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
			return false;
		}

        let changeDetected = false;
        if (receivedItemState.quantity !== selectedItem.quantity) changeDetected = true;
        if (receivedItemState.cud !== selectedItem.cud) changeDetected = true;

        // Alert when form can not validate
        if (!changeDetected) {
            setMainAlert({ ...mainAlert, label: 'No changed detected! Please enter new information.', show: true });
			setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
			return false;
        }

		return true;
    };

    const onSubmit = () => {
        if (!validateForm()) return
                
                setIsSaving(true);
                setTimeout(async () => {
                    try {
                        // Add receiving order into the database
                        await requestEditReceivedItem(receivedItemState);
        
                        // Refresh parent page
                        getAllReceivedItems && await getAllReceivedItems();
        
                        // Hide modal
                        setIsSaving(false);
        
                        // Invoke given close event handler
                        onClose && onClose();
                    } catch (err) {
                        setMainAlert({ ...mainAlert, label: `${err}`, show: true });
                        setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 3000);
                        setIsSaving(false);
                    }
                }, 500);
    };

    const onCloseModal = () => {
        // Check for any unsaved changes
        let changeDetected = false;
        if (receivedItemState.quantity !== selectedItem.quantity) changeDetected = true;
        if (receivedItemState.cud !== selectedItem.cud) changeDetected = true;

        // Alert when form can not validate
        if (changeDetected) {
            setUnsavedModalVisible(true);
			return;
        }

        onClose && onClose();
    };

    return (
        <div>
            <Modal backdrop="static" show onHide={onCloseModal} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Edit Order Information</h2>
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
                                <CustomAlert label={mainAlert.label} type={mainAlert.type} showAlert={mainAlert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Quantity
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Product Quantity"
                                        value={receivedItemState.quantity}
                                        onChange={(e) => { setReceivedItemState({ ...receivedItemState, quantity: Number(e.target.value) }); }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Condition Upon Delivery
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={receivedItemState.cud}
                                        onChange={(e) => { setReceivedItemState({ ...receivedItemState, cud: e.target.value }); }}
                                    >
                                        <option>Condition</option>
                                        <option value="New_Factory_Sealed">New Factory Sealed</option>
                                        <option value="New_Opened_Box">New Opened Box</option>
                                        <option value="Renew">Renew</option>
                                        <option value="Used">Used</option>
                                        <option value="Damaged">Damaged</option>
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
                            onClick={onSubmit}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Unsaved changes confirmation modal */}
            {
                unsavedModalVisible &&
                <UnsavedChangesModal
                    onLeave={() => {setUnsavedModalVisible(false); onClose && onClose(); }}
                    onStay={() => {setUnsavedModalVisible(false)}}
                />
            }
        </div>
    );
};

export const EditReceivedProductOrderModal = withRouter(EditReceivedProductOrderModalComponent);

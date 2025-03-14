
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { defaultAlert } from '../../../constants/Defaults';
import { requestRemoveInventory } from '../../../utils/Requests';
import IRemovedInventory from '../../../types/IRemovedInventory';

interface RemoveInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedInventory: IInventory;
    selectedInventoryList: IInventory[];
    getAllInventory: (productId: number) => void;
    getAllProducts: () => void;
    selectedProduct: IProduct;
}

const RemoveInventoryModalComponent: FunctionComponent<RemoveInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [showReasonForRemoval, setShowReasonForRemoval] = useState(false);
    const [removedInventory, setRemovedInventory] = useState<IRemovedInventory>({
        reasonType: 'Too many added',
        reason: '',
        dateRemoved: new Date().toISOString()
    });
    const submit = () => {
        setIsSaving(true);
        props.getAllProducts();
        setTimeout(async () => {
            try {
                if (showReasonForRemoval && removedInventory.reasonType == 'OTHER' && removedInventory.reason == '') {
                    setAlert({ ...alert, label: `Please enter a reason for removal`, show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                    setIsSaving(false);
                }
                else {
                    const inventoryList: IInventory[] = props.selectedInventoryList;
                    if (props.selectedInventoryList.length > 1) {
                        inventoryList.forEach(async (item) => {
                            item.removedInventory = removedInventory;
                        });
                    } else {
                        const inventoryCopy = {...props.selectedInventory, removedInventory: removedInventory};
                        inventoryList.push(inventoryCopy);
                    }

                    await requestRemoveInventory(inventoryList);
                    setIsSaving(false);
                    props.getAllInventory(props.selectedProduct.id as number); 
                    props.getAllProducts();
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
            <Modal
                backdrop="static"
                show={props.modalVisible}
                onHide={props.onClose}
            >
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Removing Inventory</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>You are about to remove {props.selectedInventory?.serialNumber as string}</p>
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
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label>Please select a reason for removal</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        onChange={(e) => {
                                            if (e.target.value == 'OTHER') {
                                                setShowReasonForRemoval(true);
                                            } else {
                                                setShowReasonForRemoval(false);
                                            }
                                            setRemovedInventory({ ...removedInventory, reasonType: e.target.value });
                                        }}>
                                        <option value="Too many added">Too many added</option>
                                        <option value="No longer here">No longer here</option>
                                        <option value="OTHER">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {showReasonForRemoval &&
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reason for Removal</Form.Label>
                                        <Form.Control
                                            id="reasonForRemoval"
                                            type="text"
                                            placeholder="Reason for removal"
                                            disabled={showReasonForRemoval}
                                            onChange={(e) => setRemovedInventory({ ...removedInventory, reason: e.target.value })}
                                        />
                                    </Form.Group>
                                }
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                submit();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveInventoryModal = withRouter(RemoveInventoryModalComponent);

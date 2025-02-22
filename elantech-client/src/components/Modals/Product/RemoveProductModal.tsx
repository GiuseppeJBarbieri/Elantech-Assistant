import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { requestDeleteProduct, requestUpdateProduct } from '../../../utils/Requests';
import { defaultAlert } from '../../../constants/Defaults';
import { CustomAlert } from '../../Alerts/CustomAlert';
import IProduct from '../../../types/IProduct';

interface RemoveProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    selectedProduct: IProduct;
    onClose: () => Promise<void>;
}

const RemoveProductModalComponent: FunctionComponent<RemoveProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [displaySerialText, setDisplaySerialText] = useState(false);
    const [otherReason, setOtherReason] = useState('');
    const [reasonForRemoval, setReasonForRemoval] = useState('Duplicate Listing');
    const [alert, setAlert] = useState(defaultAlert);

    const removeProduct = async () => {
        setIsSaving(true);
        const copyProduct: IProduct = props.selectedProduct;
        if (reasonForRemoval === 'Other') {
            copyProduct.reasonForRemoval = otherReason;
        } else {
            copyProduct.reasonForRemoval = reasonForRemoval;
        }
        setTimeout(async () => {
            try {
                await requestDeleteProduct(props.selectedProduct.id as number);
                await requestUpdateProduct(copyProduct);
                props.onClose();
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        <h2 className='modal-title'>Removing Product</h2>
                        <p className='modal-sub-title'>You are about to remove the following product..</p>
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
                                    <Form.Select
                                        value={reasonForRemoval}
                                        onChange={(e) => {
                                            setReasonForRemoval(e.target.value);
                                            if (e.target.value === 'Other') {
                                                setDisplaySerialText(true);
                                            } else {
                                                setDisplaySerialText(false);
                                            }
                                        }}
                                        aria-label="Default select example">
                                        <option value={'Duplicate Listing'}>Duplicate Listing</option>
                                        <option value={'Wrong Product Number'}>Wrong Product Number</option>
                                        <option value={'Resetting'}>Resetting</option>
                                        <option value={'Other'}>Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {displaySerialText &&
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reason</Form.Label>
                                        <Form.Control
                                            type="input"
                                            id="input"
                                            value={otherReason}
                                            onChange={e => setOtherReason(e.target.value)}
                                        />
                                    </Form.Group>
                                }
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                props.onClose();
                            }}>
                            Cancel
                        </Button>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                removeProduct()
                            }}>
                            Confirm
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveProductModal = withRouter(RemoveProductModalComponent);

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { PAGE_ROUTES } from '../../../constants/PageRoutes';
import { useNavigate } from 'react-router-dom';

interface AddOrEditOrderModalProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const AddOrEditOrderModalComponent: FunctionComponent<AddOrEditOrderModalProps> = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <Modal
                backdrop="static"
                show={props.modalVisible}
                onHide={props.onClose}
            >
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Existing Order?</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <Form className="container d-grid" >
                        <Form.Group className="mb-3">
                            <Form.Label>If you have a PO or would like to create one, please select Go to Receiving. Otherwise, select Continue.</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            props.onClose();
                            navigate(PAGE_ROUTES.RECEIVING, { replace: true });
                        }}>
                        Go to Receiving
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.onClose();
                            
                            /*
                                TODO
                                need to CLose this Modal, then Navigate to Add Inventory Modal
                                Add this to Expanded Product Row class
                            */
                        }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddOrEditOrderModalComponent;

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/PageRoutes';
 
interface AddOrEditOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    modalVisible: boolean;
    onContinue: () => void;
}
 
const AddOrEditOrderModalComponent: FunctionComponent<AddOrEditOrderModalProps> = (props) => {
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
                            props.history.replace(PAGE_ROUTES.RECEIVING);
                        }}>
                        Go to Receiving
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.onContinue();
                        }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddOrEditOrderModal = withRouter(AddOrEditOrderModalComponent);

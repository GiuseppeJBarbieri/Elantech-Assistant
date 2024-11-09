
import React, { HTMLAttributes, FunctionComponent } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface EditInventoryAlertModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const EditInventoryAlertModalComponent: FunctionComponent<EditInventoryAlertModalProps> = (props) => {
    return (
        <div>
            <Modal
                backdrop="static"
                show={props.modalVisible}
                onHide={props.onClose}
            >
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Adding Inventory</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Do you have a po number?</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
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
                            </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                props.onClose();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditInventoryAlertModal = withRouter(EditInventoryAlertModalComponent);

import React, { FunctionComponent, HTMLAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface UnsavedChangesModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onLeave: () => void;
    onStay?: () => void;
}

const UnsavedChangesModalComponent: FunctionComponent<UnsavedChangesModalProps> = ({ onLeave, onStay }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      show
      onHide={onStay}
    >
        <Modal.Header className='modal-header' closeButton>
            <Modal.Title>
                <h2 className='modal-title'>Unsaved Changes</h2>
                <p className='modal-sub-title'>Are you sure you want to leave this page and lose any unsaved changes?</p>
            </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
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
                            <Form.Label>Please enter a reason for removal</Form.Label>
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
        </Modal.Body> */}
        <Modal.Footer className='modal-footer'>
            <Button variant="secondary" onClick={onStay}>
                Stay
            </Button>
            <Button variant="primary" onClick={onLeave}>
                Leave
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export const UnsavedChangesModal = withRouter(UnsavedChangesModalComponent);
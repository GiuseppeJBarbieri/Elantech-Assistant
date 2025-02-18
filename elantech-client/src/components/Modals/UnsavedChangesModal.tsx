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
      centered
      show
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Unsaved Changes!
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h4>Unsaved Changes!</h4>
        <p>
          Are you sure you want to leave and lose any changes?
        </p>
      </Modal.Body>
      <Modal.Footer>
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
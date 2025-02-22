import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { defaultAlert } from '../../../constants/Defaults';
import { requestRemoveReceivedItem } from '../../../utils/Requests';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import IReceivedItem from '../../../types/IReceivedItem';

interface RemoveReceivedItemModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    receivedItem: IReceivedItem;
    getAllReceivedItems: () => Promise<void>;
    onClose: () => Promise<void>;
}

const RemoveReceivedItemModalComponent: FunctionComponent<RemoveReceivedItemModalProps> = ({ getAllReceivedItems, receivedItem, onClose}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);

    const onConfirmClicked = () => {
        setIsSaving(true);
        
        setTimeout(async () => {
            try {
                await requestRemoveReceivedItem(receivedItem.id!);

                setIsSaving(false);

                getAllReceivedItems();

                onClose();
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
                backdrop="static" show onHide={onClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        <h2 className='modal-title'>Removing Product</h2>
                        <p className='modal-sub-title'>You are about to remove {receivedItem.product?.productNumber}. Are you sure?</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    {isSaving && <SpinnerBlock />}
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onConfirmClicked}>
                            Leave
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveReceivedItemModal = withRouter(RemoveReceivedItemModalComponent);

import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { requestDeleteQuote } from '../../../utils/Requests';
import { defaultAlert } from '../../../constants/Defaults';
import { CustomAlert } from '../../Alerts/CustomAlert';
import IQuote from '../../../types/IQuote';

interface RemoveQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    selectedQuote: IQuote;
    getAllQuotes: (quoteId: number) => void;
    onClose: () => void;
}

const RemoveQuoteModalComponent: FunctionComponent<RemoveQuoteModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);

    const removeQuote = async () => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                await requestDeleteQuote(props.selectedQuote.id as number);
                props.getAllQuotes(props.selectedQuote.companyId as number);
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
            <Modal
                backdrop="static" show={props.modalVisible} onHide={props.onClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        <h2 className='modal-title'>Removing Quote</h2>
                        <p className='modal-sub-title'>You are about to delete this quote.</p>
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
                                <p>You are about to permanently delete this quote and all associated quoted products.</p>
                                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                removeQuote()
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveQuoteModal = withRouter(RemoveQuoteModalComponent);

import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { requestDeleteCompany } from '../../../utils/Requests';
import { defaultAlertUnauthorized } from '../../../constants/Defaults';
import { CustomAlert } from '../../Alerts/CustomAlert';
import ICompany from '../../../types/ICompany';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';

interface RemoveCompanyModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    selectedCompany: ICompany;
    getAllCompanies: () => void;
    onClose: () => Promise<void>;
}

const RemoveCompanyModalComponent: FunctionComponent<RemoveCompanyModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [displaySerialText, setDisplaySerialText] = useState(false);
    const [otherReason, setOtherReason] = useState('');
    const [reasonForRemoval, setReasonForRemoval] = useState('');
    const [alert, setAlert] = useState(defaultAlertUnauthorized);

    const removeCompany = async () => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                await requestDeleteCompany(props.selectedCompany.id as number);
                props.getAllCompanies();
                props.onClose();
            } catch (err) {
                err == 'Error: Request failed with status code 401' ?
                    setAlert({ ...alert, show: true })
                    :
                    setAlert({ ...alert, label: `${err}`, show: true });

                setTimeout(() => setAlert({ ...alert, show: false }), 5000);
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
                        <h2 className='modal-title'>Removing Company</h2>
                        <p className='modal-sub-title'>You are about to remove {props.selectedCompany.name}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <SpinnerBlock />
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
                                        <option value={'Duplicate Listing'}>Duplicate Company</option>
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
                                removeCompany()
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const RemoveCompanyModal = withRouter(RemoveCompanyModalComponent);

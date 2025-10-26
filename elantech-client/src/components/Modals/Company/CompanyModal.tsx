import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { defaultAlert } from '../../../constants/Defaults';
import ICompany from '../../../types/ICompany';
import { requestAddCompany, requestUpdateCompany } from '../../../utils/Requests';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import '../modal.css';

interface CompanyModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    selectedCompany: ICompany;
    modalSwitch: number;
    onClose: () => void;
    onSuccess: () => void;
}

const CompanyModalComponent: FunctionComponent<CompanyModalProps> = (props) => {
    const [alert, setAlert] = useState(defaultAlert);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState('Create Company');
    const [company, setCompany] = useState<ICompany>(props.selectedCompany);

    const handleCompany = (companyObj: ICompany) => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                props.modalSwitch === 0 ?
                    await requestAddCompany(companyObj)
                    :
                    await requestUpdateCompany(companyObj);
                setIsSaving(false);
                props.onSuccess();
                props.onClose();
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
    };
    const submit = () => {
        if (company.name == '' || company.type == '' || company.representative == '' 
            || company.name == undefined || company.type == undefined || company.representative == undefined) {
            setAlert({ ...alert, label: 'Please enter required information.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        } else {
            handleCompany(company);
        }
    };
    useEffect(() => {
        props.modalSwitch === 0 ? setTitle('Create Company') : setTitle('Edit Company');
    }, [])
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className={'modal-header'} closeButton>
                    <Modal.Title>
                        <h2 className={'modal-title'}>{title}</h2>
                        <p className={'modal-sub-title'}>Please enter company information.</p>
                        <p className={'required-text'}>Required *</p>
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
                                    <Form.Label>Customer Type<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={company.type}
                                        onChange={(e) => setCompany({ ...company, type: (e.target.value) })}
                                    >
                                        <option>Customer Type</option>
                                        <option value="Broker">Broker</option>
                                        <option value="End User">End User</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company Name<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="company_name"
                                        type="text"
                                        placeholder="Company Name"
                                        value={company.name}
                                        onChange={(e) => setCompany({ ...company, name: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rep Name<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="company_rep"
                                        type="text"
                                        placeholder="Rep Name"
                                        value={company.representative}
                                        onChange={(e) => setCompany({ ...company, representative: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        id="phone_number"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={company.phone}
                                        onChange={(e) => setCompany({ ...company, phone: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={company.email}
                                        onChange={(e) => setCompany({ ...company, email: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        id="location"
                                        type="text"
                                        placeholder="Location"
                                        value={company.location}
                                        onChange={(e) => setCompany({ ...company, location: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments"
                                        type="text"
                                        placeholder="Comments"
                                        value={company.comment}
                                        onChange={(e) => setCompany({ ...company, comment: (e.target.value) })}
                                    />
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className={'modal-footer'}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={() => {
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

export const CompanyModal = withRouter(CompanyModalComponent);

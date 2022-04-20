import React, { HTMLAttributes, FunctionComponent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ICompany from "../../types/ICompany";

interface CompanyModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedCompany: ICompany | undefined;
    modalSwitch: Number;
}

const CompanyModalComponent: FunctionComponent<CompanyModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState('Create Company');

    const [editCompany, setEditCompany] = useState<ICompany>(
        {
            company_id: props.selectedCompany?.company_id,
            company_type: props.selectedCompany?.company_type,
            company_name: props.selectedCompany?.company_name,
            company_rep: props.selectedCompany?.company_rep,
            phone_number: props.selectedCompany?.phone_number,
            email: props.selectedCompany?.email,
            location: props.selectedCompany?.location,
            comments: props.selectedCompany?.comments,
        }
    );
    const addCompany = () => {
        setIsSaving(true);
        setTimeout(function () { //Start the timer
            setIsSaving(false);
            // Display Alert
            props.onClose();
        }.bind(this), 5000)
    }
    useEffect(() => {
        if (props.modalSwitch === 0) {
            setTitle('Create Company');
        } else {
            setTitle('Edit Company');
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >{title}</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter company information.</p>
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
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Type</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={editCompany.company_type}
                                        onChange={(e) => setEditCompany({ ...editCompany, company_type: (e.target.value) })}
                                    >
                                        <option>Customer Type</option>
                                        <option value="Broker">Broker</option>
                                        <option value="End User">End User</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        id="company_name"
                                        type="text"
                                        placeholder="Company Name"
                                        value={editCompany.company_name}
                                        onChange={(e) => setEditCompany({ ...editCompany, company_name: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rep Name</Form.Label>
                                    <Form.Control
                                        id="company_rep"
                                        type="text"
                                        placeholder="Rep Name"
                                        value={editCompany.company_rep}
                                        onChange={(e) => setEditCompany({ ...editCompany, company_rep: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        id="phone_number"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={editCompany.phone_number}
                                        onChange={(e) => setEditCompany({ ...editCompany, phone_number: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={editCompany.email}
                                        onChange={(e) => setEditCompany({ ...editCompany, email: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        id="location"
                                        type="text"
                                        placeholder="Location"
                                        value={editCompany.location}
                                        onChange={(e) => setEditCompany({ ...editCompany, location: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comments"
                                        type="text"
                                        placeholder="Comments"
                                        value={editCompany.comments}
                                        onChange={(e) => setEditCompany({ ...editCompany, comments: (e.target.value) })}
                                    />
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('')
                                //addProduct();
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

import React, { FunctionComponent, useRef, useState } from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Row, Col, Nav, Form, Spinner } from 'react-bootstrap';
import IProduct from '../../../../types/IProduct';
import { PAGE_ROUTES } from '../../../../constants/PageRoutes';
import { BoxSeam, ExclamationTriangle, Link45deg, Trash } from 'react-bootstrap-icons';
import { requestDeleteProduct } from '../../../../utils/Requests';
import { defaultAlert } from '../../../../constants/Defaults';

interface LocationState {
    product?: IProduct;
}

export const DeleteProductLayout: FunctionComponent<RouteComponentProps<{}, {}, LocationState>> = (props) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [confirmationInput, setConfirmationInput] = useState('');
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});
    const history = useHistory();
    const product = props.location.state?.product;

    const altNumbers = product ? Array.from({ length: 6 }, (_, i) => product[`altNumber${i + 1}` as keyof IProduct]).filter(Boolean) : [];

    const showAlert = (label: string, type = 'danger', duration = 5000) => {
        sectionRef.current?.scrollTo(0, 0);
        setAlert({ label, type, show: true });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), duration);
    };

    const handleCancel = () => {
        history.goBack();
    };

    const handleDelete = async (product: IProduct) => {
        setIsSaving(true);
        try {
            await requestDeleteProduct(product?.id!);
            setTimeout(() => {
                history.push({
                    pathname: PAGE_ROUTES.DELETE_PRODUCT_SUCCESS,
                    state: { product }
                });
            }, 1500);
        } catch (error) {
            showAlert(`Failed to add new product: ${error}`);
            setIsSaving(false);
        }
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!isChecked) {
            errors.checkbox = 'You must confirm you understand this action.';
        }

        if (confirmationInput !== product?.productNumber) {
            errors.confirmationInput = "The product number does not match.";
        }

        setCustomErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            handleDelete(product!);
        } else {
            event.stopPropagation();
            sectionRef.current?.scrollTo(0, 0);
        }
    };

    return (
        <section ref={sectionRef} className="text-white main-section overflow-auto">
            <Container className="py-4">
                <div className="d-flex align-items-center" style={{ marginBottom: 40 }}>
                    <div style={{
                        backgroundColor: 'rgb(255 226 226)', borderRadius: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}><ExclamationTriangle size={48} color="#e7000b" />
                    </div>
                    <div className="ms-3 mt-2">
                        <h1 className="h3 mb-0">Delete Product</h1>
                        <p className="text-muted mb-0">You are about to permanently delete this product.</p>
                    </div>
                </div>

                <div
                    className="rounded d-flex mb-4 p-4"
                    style={{ backgroundColor: '#412e33', border: '1px solid #ffc9c9', minWidth: '130px', flexDirection: 'column' }}
                >
                    <div className="mb-0" style={{ color: '#ffa2a2', borderRadius: '0.25rem' }}>
                        <div className="d-flex align-items-center mb-2">
                            <ExclamationTriangle size={20} viewBox='0 1 16 16' />
                            <h6 className="mb-0 ms-2" style={{ fontWeight: 500 }}>Warning: This action cannot be undone.</h6>
                        </div>
                        <p style={{ paddingLeft: 30, color: '#daaaab' }}>Deleting this product will permanently remove all associated data, including:</p>
                    </div>
                    <div style={{ paddingLeft: 40, color: '#daaaab' }}>
                        <div>
                            <li>Product information and descriptions</li>
                            <li>Alternative reference numbers</li>
                            <li>All links and specifications</li>
                            <li>Historical records including inventory and quotes</li>

                        </div>
                    </div>
                </div>
                <div
                    className="rounded d-flex mb-4"
                    style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                >
                    <div className="mb-1" style={{ padding: '1rem', borderRadius: '0.25rem' }}>
                        <div className="d-flex align-items-center mb-2">
                            <BoxSeam size={25} />
                            <h5 className="mb-0 ms-3" style={{ fontWeight: 300 }}>Product to be Deleted</h5>
                        </div>
                        <p className="text-muted">Review the product you are about to delete</p>
                    </div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 5, display: 'flex', flexDirection: 'row', gap: '300px' }}>
                        <div>
                            <div>
                                <p className="text-secondary mb-1">Product Number</p>
                                <p>{product?.productNumber}</p>
                            </div>
                            <div>
                                <p className="text-secondary mb-1">Brand</p>
                                <p>{product?.brand}</p>
                            </div>
                            <div>
                                <p className="text-secondary mb-1">Description</p>
                                <p>{product?.description}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="text-secondary mb-1">Product Type</p>
                                <p>{product?.productType}</p>
                            </ div>
                            {product?.relatedTags &&
                                <div>
                                    <p className="text-secondary mb-1">Tags</p>
                                    <p>{product?.relatedTags}</p>
                                </div>
                            }
                        </div>
                    </div>
                    {altNumbers.length > 0 && (
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5 }}>
                            <p className="text-secondary mb-2">Alternative Numbers</p>
                            <Row>
                                {altNumbers.map((altNumber, idx) => (
                                    <Col md={4} key={idx} className="mb-3">
                                        <p className="mb-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '0.25rem' }}>
                                            {altNumber}
                                        </p>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                    {(product?.ebayUrl || product?.websiteUrl || product?.quickSpecsUrl) && (
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5 }}>
                            <div>
                                <p className="text-secondary mb-1">Links</p>
                            </div>
                            {product.ebayUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.ebayUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Ebay Listing
                                    </Nav.Link>
                                </div>
                            }
                            {product.websiteUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.websiteUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Website Listing
                                    </Nav.Link>
                                </div>
                            }
                            {product.quickSpecsUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.quickSpecsUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Quick Specs
                                    </Nav.Link>
                                </div>
                            }
                        </div>
                    )}
                </div>
                <Form noValidate onSubmit={handleSubmit}>
                    <div
                        className="rounded d-flex mb-4"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #642b37', minWidth: '130px', flexDirection: 'column', padding: 20 }}
                    >
                        <div className="mb-1" style={{ borderRadius: '0.25rem' }}>
                            <h5 className="mb-2" style={{ fontWeight: 300, color: '#ffa2a2' }}>Confirm Deletion</h5>
                            <p className="text-muted">Complete the following steps to confirm you want to delete this product</p>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type='checkbox'
                                id="confirm-checkbox"
                                label='I understand this action is permanent'
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                isInvalid={!!customErrors.checkbox}
                                feedback={customErrors.checkbox}
                                feedbackType="invalid"
                            />
                            <p className="text-muted">This product and all its data will be permanently deleted and cannot be recovered.</p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Type {product?.productNumber} to confirm
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter product number"
                                style={{ width: 500 }}
                                value={confirmationInput}
                                onChange={(e) => setConfirmationInput(e.target.value)}
                                isInvalid={!!customErrors.confirmationInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                {customErrors.confirmationInput}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button variant="danger" type="submit" disabled={isSaving || !isChecked || confirmationInput !== product?.productNumber}>
                            {isSaving ? (
                                <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className="ms-2">Deleting...</span></>
                            ) : (
                                <><Trash height="20" width="20" style={{ marginRight: 5 }} /><span className="ms-2">Delete Product</span></>
                            )}
                        </Button>
                    </div>
                </Form>
            </Container>
        </section >
    );
};

export const DeleteProduct = withRouter(DeleteProductLayout);

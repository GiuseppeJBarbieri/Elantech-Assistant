import React, { HTMLAttributes, FunctionComponent, useState, useMemo } from 'react';
import { requestAddProduct, requestUpdateProduct } from '../../../utils/Requests';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CustomAlert } from '../../Alerts/CustomAlert';
import IProduct from '../../../types/IProduct';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { brandOptions, typeOptions } from '../../../constants/Options';
import { defaultAlert } from '../../../constants/Defaults';
import { isValidWebAddress } from '../../../utils/WebAddressValidation';
import '../modal.css';

interface ProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    modalSwitch: number;
    selectedProduct: IProduct;
    onSuccess?: () => void;
    onClose: () => void;
}

enum ModalMode {
    ADD,
    EDIT,
}

const ProductModalComponent: FunctionComponent<ProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [product, setProduct] = useState<IProduct>(props.selectedProduct);
    const [alert, setAlert] = useState(defaultAlert);

    const mode = props.modalSwitch === 0 ? ModalMode.ADD : ModalMode.EDIT;
    const title = useMemo(() => (mode === ModalMode.ADD ? 'Create Product' : 'Edit Product'), [mode]);

    const showAlert = (label: string, type = 'danger', duration = 5000) => {
        setAlert({ label, type, show: true });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), duration);
    };

    const handleProduct = async (productObj: IProduct) => {
        setIsSaving(true);
        try {
            if (mode === ModalMode.ADD) {
                await requestAddProduct(productObj);
            } else {
                await requestUpdateProduct(productObj);
            }
            props.onSuccess?.();
            props.onClose();
        } catch (err) {
            showAlert(`${err}`);
        } finally {
            setIsSaving(false);
        }
    };

    const validateProduct = (): boolean => {
        const requiredFields: (keyof IProduct)[] = ['productNumber', 'productType', 'brand', 'description'];
        if (requiredFields.some(field => !product[field])) {
            showAlert('Please enter all required information.');
            return false;
        }

        const productNumbers = [
            product.productNumber,
            product.altNumber1,
            product.altNumber2,
            product.altNumber3,
            product.altNumber4,
            product.altNumber5,
            product.altNumber6,
        ].filter(Boolean); // Filters out null, undefined, and empty strings

        if (new Set(productNumbers).size !== productNumbers.length) {
            showAlert('Cannot contain duplicate product numbers.');
            return false;
        }

        const urlsToValidate: { key: keyof IProduct; name: string }[] = [
            { key: 'ebayUrl', name: 'Ebay URL' },
            { key: 'websiteUrl', name: 'Website URL' },
            { key: 'quickSpecsUrl', name: 'Quick Specs URL' },
        ];

        for (const { key, name } of urlsToValidate) {
            const url = product[key];
            if (url && !isValidWebAddress(url as string)) {
                showAlert(`Cannot contain invalid ${name.toLowerCase()}.`);
                return false;
            }
        }

        return true;
    };

    const submitProduct = () => {
        if (validateProduct()) {
            handleProduct(product);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const renderOptions = (options: Record<string, string>) => {
        return Object.values(options).map(option => (
            <option key={option} value={option}>{option}</option>
        ));
    };

    return (
        <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
            <Modal.Header className={'modal-header'} closeButton>
                <Modal.Title>
                    <h2 className={'modal-title'}>{title}</h2>
                    <p className={'modal-sub-title'}>Please enter product information.</p>
                    <p className={'required-text'}>Required *</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                    {isSaving ? (
                        <SpinnerBlock />
                    ) : (
                        <Form>
                            <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ display: 'flex' }}>Product Number<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Number"
                                        name="productNumber"
                                        value={product.productNumber ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label style={{ display: 'flex' }}>Product Type<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Select
                                        aria-label="Product Type"
                                        name="productType"
                                        value={product.productType ?? ''}
                                        onChange={handleFormChange}
                                    >
                                        <option>Product Type</option>
                                        {renderOptions(typeOptions)}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ display: 'flex' }}>Brand<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Select
                                        aria-label="Brand"
                                        name="brand"
                                        value={product.brand ?? ''}
                                        onChange={handleFormChange}
                                    >
                                        <option>Brand</option>
                                        {renderOptions(brandOptions)}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ display: 'flex' }}>Description<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description"
                                        name="description"
                                        value={product.description ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 1"
                                        name="altNumber1"
                                        value={product.altNumber1 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 2"
                                        name="altNumber2"
                                        value={product.altNumber2 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 3"
                                        name="altNumber3"
                                        value={product.altNumber3 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 4</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 4"
                                        name="altNumber4"
                                        value={product.altNumber4 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 5</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 5"
                                        name="altNumber5"
                                        value={product.altNumber5 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Alt Number 6</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alt Number 6"
                                        name="altNumber6"
                                        value={product.altNumber6 ?? ''}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Ebay Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ebay Link"
                                    name="ebayUrl"
                                    value={product.ebayUrl ?? ''}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Website Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Website Link"
                                    name="websiteUrl"
                                    value={product.websiteUrl ?? ''}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quick Specs</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Quick Specs"
                                    name="quickSpecsUrl"
                                    value={product.quickSpecsUrl ?? ''}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Related Tags</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Related Tags"
                                    name="relatedTags"
                                    value={product.relatedTags ?? ''}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className={'modal-footer'}>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant="dark"
                        onClick={submitProduct}
                        disabled={isSaving}
                    >
                        Finish
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export const ProductModal = withRouter(ProductModalComponent);

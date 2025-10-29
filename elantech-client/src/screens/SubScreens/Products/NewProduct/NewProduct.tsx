import React, { FunctionComponent, HTMLAttributes, useRef, useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { CustomAlert } from "../../../../components/Alerts/CustomAlert";
import { BoxSeam, InfoCircle, Link45deg, Tag } from 'react-bootstrap-icons';
import { typeOptions, brandOptions } from "../../../../constants/Options";
import { defaultAlert, defaultProduct } from "../../../../constants/Defaults";
import IProduct from "../../../../types/IProduct";
import { requestAddProduct } from "../../../../utils/Requests";
import { isValidWebAddress } from "../../../../utils/WebAddressValidation";
import { PAGE_ROUTES } from "../../../../constants/PageRoutes";

interface NewProductProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const NewProductLayout: FunctionComponent<NewProductProps> = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});
    const [product, setProduct] = useState<IProduct>(defaultProduct);
    const history = useHistory();

    const showAlert = (label: string, type = 'danger', duration = 5000) => {
        sectionRef.current?.scrollTo(0, 0);
        setAlert({ label, type, show: true });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), duration);
    };

    const handleProduct = async (productObj: IProduct) => {
        setIsSaving(true);
        try {
            await requestAddProduct(productObj);
            setTimeout(() => {
                history.push({
                    pathname: PAGE_ROUTES.NEW_PRODUCT_SUCCESS,
                    state: { product: productObj }
                });
            }, 1500);
        } catch (error) {
            showAlert(`Failed to add new product: ${error}`);
            setIsSaving(false);
        }
    };

    const validateProduct = (): boolean => {
        const errors: Record<string, string> = {};

        // Check required fields
        const requiredFields: (keyof IProduct)[] = ['productNumber', 'productType', 'brand', 'description'];
        requiredFields.forEach(field => {
            if (!product[field]) {
                const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim();
                errors[field] = `${fieldName} is required.`;
            }
        });

        // Check for duplicate product numbers
        const productNumberFields: (keyof IProduct)[] = ['productNumber', 'altNumber1', 'altNumber2', 'altNumber3', 'altNumber4', 'altNumber5', 'altNumber6'];
        const seenNumbers: { [key: string]: string[] } = {};
        productNumberFields.forEach(field => {
            const value = product[field] as string;
            if (value) {
                if (!seenNumbers[value]) {
                    seenNumbers[value] = [];
                }
                seenNumbers[value].push(field);
            }
        });

        for (const value in seenNumbers) {
            if (seenNumbers[value].length > 1) {
                seenNumbers[value].forEach(field => {
                    errors[field] = 'Duplicate product number.';
                });
            }
        }

        // Check for invalid URLs
        const urlsToValidate: { key: keyof IProduct; name: string }[] = [
            { key: 'ebayUrl', name: 'Ebay URL' },
            { key: 'websiteUrl', name: 'Website URL' },
            { key: 'quickSpecsUrl', name: 'Quick Specs URL' },
        ];
        for (const { key, name } of urlsToValidate) {
            const url = product[key];
            if (url && !isValidWebAddress(url as string)) {
                errors[key] = `Invalid ${name.toLowerCase()}.`;
            }
        }

        setCustomErrors(errors);
        if (Object.keys(errors).length > 0) {
            showAlert('Please fix the validation errors before submitting.');
            return false;
        }
        return true;
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomErrors(prev => ({ ...prev, [name]: '' }));
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const renderOptions = (options: Record<string, string>) => {
        return Object.values(options).map(option => (
            <option key={option} value={option}>{option}</option>
        ));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (validateProduct() && form.checkValidity()) {
            handleProduct(product);
        } else {
            event.stopPropagation();
            sectionRef.current?.scrollTo(0, 0);
        }
    };

    return (
        <section ref={sectionRef} className="text-white main-section overflow-auto">
            <Container className="py-4">
                <div className="mb-4">
                    <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                    <h2 style={{ fontWeight: 300, marginBottom: 0 }}>Create Product</h2>
                    <p className="text-muted">
                        Add a new product to your inventory with all the necessary details.
                    </p>
                </div>
                <Form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div
                        className="p-4 rounded d-flex mb-4"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <div className="mb-1">
                            <div className="d-flex align-items-center mb-2">
                                <BoxSeam size={25} />
                                <h5 className="mb-0 ms-3" style={{ fontWeight: 300 }}>Basic Information</h5>
                            </div>
                            <p className="text-muted">Essential product details and identifiers</p>
                        </div>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label column>
                                Product Number <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type='text'
                                name='productNumber'
                                placeholder="e.g., PRD-001234"
                                value={product.productNumber ?? ''}
                                isInvalid={!!customErrors.productNumber}
                                onChange={handleFormChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {customErrors.productNumber || 'Product number is required.'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label column>
                                        Product Type <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col>
                                        <Form.Select
                                            name="productType"
                                            value={product.productType ?? ''}
                                            isInvalid={!!customErrors.productType}
                                            onChange={handleFormChange}
                                        >
                                            <option value="">Select product type</option>
                                            {renderOptions(typeOptions)}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {customErrors.productType || 'Product type is required.'}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label column>
                                        Brand <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col>
                                        <Form.Select
                                            name="brand"
                                            value={product.brand ?? ''}
                                            isInvalid={!!customErrors.brand}
                                            onChange={handleFormChange}>
                                            <option value="">Select brand</option>
                                            {renderOptions(brandOptions)}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {customErrors.brand || 'Brand is required.'}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>
                                Description <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="mb-2"
                                name="description"
                                placeholder="Enter a detailed description of the product..."
                                isInvalid={!!customErrors.description}
                                value={product.description ?? ''}
                                onChange={handleFormChange}
                            />
                            <Form.Text className="text-muted">
                                Provide a comprehensive description of the product features and
                                uses.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {customErrors.description || 'Description is required.'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    {/* Alternative Numbers */}
                    <div
                        className="p-4 rounded d-flex mb-4"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <div className="mb-1">
                            <div className="d-flex align-items-center mb-2">
                                <InfoCircle size={25} />
                                <h5 className="mb-0 ms-3" style={{ fontWeight: 300 }}>Alternative Numbers</h5>
                            </div>
                            <p className="text-muted">Cross-reference numbers for product identification</p>
                        </div>
                        <Row>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <Col md={6} key={num}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{`Alt Number ${num}`}</Form.Label>
                                        <Form.Control
                                            name={`altNumber${num}`}
                                            placeholder={`Alternative number ${num}`}
                                            value={(product as any)[`altNumber${num}`] ?? ''}
                                            isInvalid={!!customErrors[`altNumber${num}`]}
                                            onChange={handleFormChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {customErrors[`altNumber${num}`]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    {/* Links & References */}
                    <div
                        className="p-4 rounded d-flex mb-4"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <div className="mb-1">
                            <div className="d-flex align-items-center mb-2">
                                <Link45deg size={35} />
                                <h5 className="mb-0 ms-2" style={{ fontWeight: 300 }}>Links & References</h5>
                            </div>
                            <p className="text-muted">External links and product listings</p>
                        </div>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label column>eBay Link</Form.Label>
                            <Form.Control
                                type="url"
                                className="mb-2"
                                placeholder="https://www.ebay.com/itm/..."
                                name="ebayUrl"
                                isInvalid={!!customErrors.ebayUrl}
                                value={product.ebayUrl ?? ''}
                                onChange={handleFormChange}
                            />
                            <Form.Text className="text-muted">
                                Link to the product listing on eBay
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {customErrors.ebayUrl}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label column>Website Link</Form.Label>
                            <Form.Control
                                type="url"
                                className="mb-2"
                                placeholder="https://www.elantechit.com/product/..."
                                name="websiteUrl"
                                isInvalid={!!customErrors.websiteUrl}
                                value={product.websiteUrl ?? ''}
                                onChange={handleFormChange}
                            />
                            <Form.Text className="text-muted">
                                Link to the product page on Elantech's website
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {customErrors.websiteUrl}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label column>Quick Specs Link</Form.Label>
                            <Form.Control
                                type="url"
                                className="mb-2"
                                placeholder="https://www.quickspecs.com/doc/..."
                                name="quickSpecsUrl"
                                isInvalid={!!customErrors.quickSpecsUrl}
                                value={product.quickSpecsUrl ?? ''}
                                onChange={handleFormChange}
                            />
                            <Form.Text className="text-muted">
                                Link to the quick specifications document
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {customErrors.quickSpecsUrl}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    {/* Additional Details */}
                    <div
                        className="p-4 rounded d-flex mb-4"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <div className="mb-1">
                            <div className="d-flex align-items-center mb-2">
                                <Tag size={30} />
                                <h5 className="mb-0 ms-2" style={{ fontWeight: 300 }}>Additional Details</h5>
                            </div>
                            <p className="text-muted">Specifications and categorization</p>
                        </div>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label column>Related Tags</Form.Label>
                            <Form.Control
                                className="mb-2"
                                placeholder="e.g., riser, cpu, memory"
                                name="relatedTags"
                                value={product.relatedTags ?? ''}
                                onChange={handleFormChange}
                            />
                            <Form.Text className="text-muted">
                                Comma-separated tags for easier searching and categorization
                            </Form.Text>
                        </Form.Group>
                    </div>
                    {/* Form Buttons */}
                    <div className="d-flex justify-content-between">
                        <div>
                            <Button variant="secondary" onClick={() => {
                                history.goBack();
                            }}>
                                Cancel
                            </Button>
                        </div>
                        <div className="d-flex gap-2">
                            <Button variant="outline-secondary" onClick={() => {
                                setProduct(defaultProduct);
                                sectionRef.current?.scrollTo(0, 0);
                            }}>
                                Clear Form
                            </Button>
                            <Button variant="dark" type="submit" disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        <span className="ms-2">Saving...</span>
                                    </>
                                ) : 'Create Product'}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </section>
    );
};

export const NewProduct = withRouter(NewProductLayout);

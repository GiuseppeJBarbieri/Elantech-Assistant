import React, { FunctionComponent, HTMLAttributes, useRef, useState } from "react";
import { Container, Form, Row, Col, Button, Spinner, Card, Badge } from "react-bootstrap";
import { BoxSeam, Hash, InfoCircle, Calendar, GeoAlt, ChatSquare, CheckCircle } from "react-bootstrap-icons";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { CustomAlert } from "../../../components/Alerts/CustomAlert";
import { defaultAlert, defaultInventory } from "../../../constants/Defaults";
import { orderType } from "../../../constants/Options";
import IInventory from "../../../types/IInventory";
import { requestAddInventory, requestAddMultipleInventory } from "../../../utils/Requests";

interface NewInventoryProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

const defaultInventoryForm = {
    skuType: 'generated',
    quantity: 0,
    serialNumber: '',
    condition: '',
    warrantyExpiration: new Date(),
    testedDate: new Date(),
    tested: false,
    location: '',
    comment: '',
};

export const NewInventoryLayout: FunctionComponent<NewInventoryProps> = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});
    const [inventoryForm, setInventoryForm] = useState(defaultInventoryForm);
    const [inventory, setInventory] = useState<IInventory>(defaultInventory);
    const [inventoryList, setInventoryList] = useState<IInventory[]>([]);

    const [skuType, setSkuType] = useState<'generated' | 'unique'>('generated');
    const history = useHistory();

    const showAlert = (label: string, type = 'danger', duration = 5000) => {
        sectionRef.current?.scrollTo(0, 0);
        setAlert({ label, type, show: true });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), duration);
    };

    const handleInventory = async (formData: { skuType: string; quantity: number; serialNumber: string; condition: string; warrantyExpiration: Date; testedDate: Date; tested: boolean; location: string; comment: string; }, skuType: string) => {
        setIsSaving(true);
        const inventoryList: IInventory[] = [];
        if (skuType === 'generated') {
        } else if (skuType === 'unique') {
        }
        try {
            await requestAddMultipleInventory(inventoryList);
            setTimeout(() => {
                history.goBack();
            }, 1500);
        } catch (error) {
            showAlert(`Failed to add new inventory: ${error}`);
            setIsSaving(false);
        }
    };

    const validateInventory = (): boolean => {
        const errors: Record<string, string> = {};

        if (!inventoryForm.condition) {
            errors.condition = 'Condition is required.';
        }

        if (skuType === 'unique' && !inventoryForm.serialNumber) {
            errors.serialNumber = 'Serial number is required for unique SKU.';
        }

        if (skuType === 'generated' && (!inventoryForm.quantity || inventoryForm.quantity <= 0)) {
            errors.quantity = 'Quantity must be greater than 0.';
        }

        setCustomErrors(errors);
        if (Object.keys(errors).length > 0) {
            showAlert('Please fix the validation errors before submitting.');
            return false;
        }
        return true;
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setCustomErrors(prev => ({ ...prev, [name]: '' }));

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setInventoryForm(prev => ({ ...prev, [name]: target.checked }));
        } else if (type === 'date') {
            setInventoryForm(prev => ({ ...prev, [name]: value ? new Date(value) : null }));
        } else if (type === 'number') {
            setInventoryForm(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setInventoryForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSkuTypeChange = (type: 'generated' | 'unique') => {
        setSkuType(type);
        setInventoryForm(prev => ({ ...prev, skuType: type }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInventory()) {
            handleInventory(inventoryForm, skuType);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    return (
        <section ref={sectionRef} className="text-white main-section overflow-auto">
            <Container className="py-4">
                {/* Header */}
                <div className="mb-4">
                    <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                    <div className="d-flex align-items-center mb-3">
                        <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                                borderRadius: '12px'
                            }}
                        >
                            <BoxSeam size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="mb-0" style={{ fontWeight: 300 }}>Add Inventory</h2>
                            <p className="text-muted mb-0">Please enter inventory information.</p>
                        </div>
                    </div>
                    <Badge bg="danger">
                        * Required
                    </Badge>
                </div>

                <Form onSubmit={handleSubmit}>
                    {/* SKU Configuration Card */}
                    <Card
                        className="mb-4"
                        style={{
                            backgroundColor: '#36393F',
                            border: '3px solid rgba(59, 130, 246, 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <Card.Header
                            style={{
                                background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.3), rgba(67, 56, 202, 0.3))',
                                borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
                            }}
                        >
                            <Card.Title className="d-flex align-items-center text-white">
                                <Hash size={20} className="me-2" />
                                SKU Configuration
                            </Card.Title>

                            <Card.Text className="text-muted">Choose how to manage your product SKUs</Card.Text>
                        </Card.Header>
                        <Card.Body className="pt-4">
                            <Form.Label className="text-light mb-3">Choose one</Form.Label>
                            <Row>
                                {/* Generated SKUs Option */}
                                <Col md={6} className="mb-3">
                                    <div
                                        className="rounded p-4 h-100 position-relative cursor-pointer transition-all"
                                        style={{
                                            backgroundColor: skuType === 'generated' ? 'rgba(13, 110, 253, 0.1)' : '#2c3034',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: skuType === 'generated'
                                                ? '2px solid rgba(16, 185, 129, 0.6)'
                                                : '2px solid #6c757d',
                                            boxShadow: skuType === 'generated'
                                                ? '0 0 0 2px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.2)'
                                                : 'none'
                                        }}
                                        onClick={() => handleSkuTypeChange('generated')}
                                    >
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div
                                                className="d-flex align-items-center justify-content-center mb-3 rounded-circle"
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                                                    boxShadow: skuType === 'generated'
                                                        ? '0 0 15px rgba(16, 185, 129, 0.4)'
                                                        : 'none'
                                                }}
                                            >
                                                <BoxSeam size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <h5>Generated SKUs</h5>
                                                <p className="text-muted">Auto-generate multiple SKUs</p>
                                            </div>
                                        </div>
                                        {skuType === 'generated' && (
                                            <CheckCircle
                                                size={20}
                                                className="position-absolute top-0 end-0 m-3 text-primary"
                                            />
                                        )}
                                        <Form.Check
                                            type="radio"
                                            name="skuType"
                                            value="generated"
                                            checked={skuType === 'generated'}
                                            onChange={() => handleSkuTypeChange('generated')}
                                            className="visually-hidden"
                                        />
                                    </div>
                                </Col>

                                {/* Unique SKU Option */}
                                <Col md={6} className="mb-3">
                                    <div
                                        className="rounded p-4 h-100 position-relative cursor-pointer transition-all"
                                        style={{
                                            backgroundColor: skuType === 'unique' ? 'rgba(13, 110, 253, 0.1)' : '#2c3034',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: skuType === 'unique'
                                                ? '2px solid rgba(168, 85, 247, 0.6)'
                                                : '2px solid #6c757d',
                                            boxShadow: skuType === 'unique'
                                                ? '0 0 0 2px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)'
                                                : 'none'
                                        }}
                                        onClick={() => handleSkuTypeChange('unique')}
                                    >
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div
                                                className="d-flex align-items-center justify-content-center mb-3 rounded-circle"
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                                    boxShadow: skuType === 'unique'
                                                        ? '0 0 15px rgba(168, 85, 247, 0.4)'
                                                        : 'none'
                                                }}
                                            >
                                                <Hash size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <h5>Unique SKU</h5>
                                                <p className="text-muted">Enter a specific serial number</p>
                                            </div>
                                        </div>
                                        {skuType === 'unique' && (
                                            <CheckCircle
                                                size={20}
                                                className="position-absolute top-0 end-0 m-3 text-primary"
                                            />
                                        )}
                                        <Form.Check
                                            type="radio"
                                            name="skuType"
                                            value="unique"
                                            checked={skuType === 'unique'}
                                            onChange={() => handleSkuTypeChange('unique')}
                                            className="visually-hidden"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            {/* Conditional Fields */}
                            <hr className="border-secondary my-4" />
                            {skuType === 'generated' ? (
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-light">Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        placeholder="0"
                                        min="0"
                                        value={inventoryForm.quantity || ''}
                                        onChange={handleFormChange}
                                        isInvalid={!!customErrors.quantity}
                                        style={{ maxWidth: '200px', backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                        className="text-white"
                                    />
                                    <Form.Text className="text-muted">Number of SKUs to generate</Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {customErrors.quantity}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            ) : (
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-light">Serial Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="serialNumber"
                                        placeholder="Enter serial number"
                                        value={inventoryForm.serialNumber || ''}
                                        onChange={handleFormChange}
                                        isInvalid={!!customErrors.serialNumber}
                                        style={{ maxWidth: '300px', backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                        className="text-white"
                                    />
                                    <Form.Text className="text-muted">Unique identifier for this item</Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {customErrors.serialNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Inventory Details Card */}
                    <Card className="mb-4" style={{ backgroundColor: '#36393F', border: '3px solid rgba(59, 130, 246, 0.2)', padding: 10 }}>
                        <Card.Body>
                            <Card.Title className="d-flex align-items-center text-white">
                                <InfoCircle size={20} className="me-2" />
                                Inventory Details
                            </Card.Title>
                            <Card.Text className="text-muted">Additional information about the inventory item</Card.Text>
                            <Row>
                                {/* Condition */}
                                <Col md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="text-light">
                                            Condition <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Select
                                            name="condition"
                                            value={inventoryForm.condition || ''}
                                            onChange={handleFormChange}
                                            isInvalid={!!customErrors.condition}
                                            style={{ backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                            className="text-white"
                                        >
                                            <option value="">Choose Condition</option>
                                            {orderType.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {customErrors.condition}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Date Tested */}
                                <Col md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="text-light">Date Tested</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="testedDate"
                                            value={formatDate(inventoryForm.testedDate as Date)}
                                            onChange={handleFormChange}
                                            style={{ backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                            className="text-white"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Warranty Expiration */}
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="text-light">Warranty Expiration</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="warrantyExpiration"
                                            value={formatDate(inventoryForm.warrantyExpiration as Date)}
                                            onChange={handleFormChange}
                                            style={{ backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                            className="text-white"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Testing Status */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-light">Did you test it?</Form.Label>
                                <div className="d-flex gap-4">
                                    <Form.Check
                                        type="radio"
                                        id="tested-yes"
                                        name="tested"
                                        label="Tested"
                                        checked={inventoryForm.tested === true}
                                        onChange={() => setInventoryForm(prev => ({ ...prev, tested: true }))}
                                        className="text-light"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="tested-no"
                                        name="tested"
                                        label="Not Tested"
                                        checked={inventoryForm.tested === false}
                                        onChange={() => setInventoryForm(prev => ({ ...prev, tested: false }))}
                                        className="text-light"
                                    />
                                </div>
                            </Form.Group>

                            {/* Location */}
                            <Form.Group className="mb-3">
                                <Form.Label className="d-flex align-items-center text-light">
                                    <GeoAlt size={16} className="me-2" />
                                    Location
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={inventoryForm.location || ''}
                                    onChange={handleFormChange}
                                    style={{ backgroundColor: '#2c3034', borderColor: '#6c757d' }}
                                    className="text-white"
                                />
                            </Form.Group>

                            {/* Comments */}
                            <Form.Group className="mb-3">
                                <Form.Label className="d-flex align-items-center text-light">
                                    <ChatSquare size={16} className="me-2" />
                                    Comments
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="comment"
                                    placeholder="Add any additional notes or comments..."
                                    value={inventoryForm.comment || ''}
                                    onChange={handleFormChange}
                                    style={{ backgroundColor: '#2c3034', borderColor: '#6c757d', resize: 'none' }}
                                    className="text-white"
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-3 pb-4">
                        <Button
                            variant="outline-secondary"
                            size="lg"
                            onClick={() => history.goBack()}
                            className="border-secondary text-white"
                            style={{ minWidth: '140px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="lg"
                            type="submit"
                            disabled={isSaving}
                            style={{ minWidth: '140px' }}
                        >
                            {isSaving ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Saving...
                                </>
                            ) : 'Finish'}
                        </Button>
                        {skuType === 'unique' && (
                            <Button
                                variant="outline-primary"
                                size="lg"
                                style={{ minWidth: '140px' }}
                                className="border-primary text-primary"
                            >
                                Add Next
                            </Button>
                        )}
                    </div>
                </Form>
            </Container>
        </section>
    );
};

export const NewInventory = withRouter(NewInventoryLayout);
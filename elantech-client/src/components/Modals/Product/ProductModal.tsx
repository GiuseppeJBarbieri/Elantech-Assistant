import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from 'react';
import { requestAddProduct, requestUpdateProduct } from '../../../utils/Requests';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CustomAlert } from '../../Alerts/CustomAlert';
import IProduct from '../../../types/IProduct';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { brandList, typeList } from '../../../constants/Options';
import '../modal.css';
import { defaultAlert } from '../../../constants/Defaults';

interface ProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    modalVisible: boolean;
    selectedProduct: IProduct;
    modalSwitch: number;
    getAllProducts: () => void;
    onClose: () => Promise<void>;
}

const ProductModalComponent: FunctionComponent<ProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState('Create Product');
    const [product, setProduct] = useState<IProduct>(props.selectedProduct);
    const [alert, setAlert] = useState(defaultAlert);

    const handleProduct = (productObj: IProduct) => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                props.modalSwitch === 0 ?
                    await requestAddProduct(productObj)
                    :
                    await requestUpdateProduct(productObj);
                setIsSaving(false);
                props.getAllProducts();
                props.onClose();
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
    };
    const validateProduct = (): boolean => {
        /*
        * 1. Check if Product Number, Product Type, Brand, or Description are empty
        * 2. Check if there are any duplicate product numbers
        */
        let isEmpty = false;
        if (product.productNumber === '') isEmpty = true;
        if (product.productType === '') isEmpty = true;
        if (product.brand === '') isEmpty = true;
        if (product.description === '') isEmpty = true;

        let isDuplicate = false;
        let compareList = [
            product.productNumber,
            product.altNumber1,
            product.altNumber2,
            product.altNumber3,
            product.altNumber4,
            product.altNumber5,
            product.altNumber6
        ];
        compareList = compareList.filter((str) => str != '');
        if (new Set(compareList).size !== compareList.length) isDuplicate = true;

        if (isEmpty) {
            setAlert({ ...alert, label: 'Please enter required information.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
            return false;
        } else if(isDuplicate){
            setAlert({ ...alert, label: 'Cannot contain duplicate product numbers.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
            return false;
        }

        return true;
    }
    const submitProduct = () => {
        if (validateProduct()) {
            handleProduct(product);
        }
    };
    useEffect(() => {
        props.modalSwitch === 0 ? setTitle('Create Product') : setTitle('Edit Product');
    }, [])
    return (
        <div>
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
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form>
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ display: 'flex' }}>Product Number<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Product Number"
                                            value={product.productNumber}
                                            onChange={(e) => setProduct({ ...product, productNumber: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label style={{ display: 'flex' }}>Product Type<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={product.productType}
                                            onChange={(e) => setProduct({ ...product, productType: (e.target.value) })}
                                        >
                                            <option>Product Type</option>
                                            {
                                                typeList.map(type => {
                                                    return (<option key={type} value={type}>{type}</option>);
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{ display: 'flex' }}>Brand<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={product.brand}
                                            onChange={(e) => setProduct({ ...product, brand: (e.target.value) })}
                                        >
                                            <option>Brand</option>
                                            {
                                                brandList.map(brand => {
                                                    return (<option key={brand} value={brand}>{brand}</option>);
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ display: 'flex' }}>Description<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Description"
                                            value={product.description}
                                            onChange={(e) => setProduct({ ...product, description: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 1</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 1"
                                            value={product.altNumber1}
                                            onChange={(e) => setProduct({ ...product, altNumber1: (e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 2</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 2"
                                            value={product.altNumber2}
                                            onChange={(e) => setProduct({ ...product, altNumber2: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 3</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 3"
                                            value={product.altNumber3}
                                            onChange={(e) => setProduct({ ...product, altNumber3: (e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 4</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 4"
                                            value={product.altNumber4}
                                            onChange={(e) => setProduct({ ...product, altNumber4: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 5</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 5"
                                            value={product.altNumber5}
                                            onChange={(e) => setProduct({ ...product, altNumber5: (e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Alt Number 6</Form.Label>
                                        <Form.Control
                                            id="timeFrame"
                                            type="text"
                                            placeholder="Alt Number 6"
                                            value={product.altNumber6}
                                            onChange={(e) => setProduct({ ...product, altNumber6: (e.target.value) })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ebay Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Ebay Link"
                                        value={product.ebayLink}
                                        onChange={(e) => setProduct({ ...product, ebayLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Website Link"
                                        value={product.websiteLink}
                                        onChange={(e) => setProduct({ ...product, websiteLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quick Specs</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Quick Specs"
                                        value={product.quickSpecsLink}
                                        onChange={(e) => setProduct({ ...product, quickSpecsLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Related Tags</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Related Tags"
                                        value={product.relatedTags}
                                        onChange={(e) => setProduct({ ...product, relatedTags: (e.target.value) })}
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
                                submitProduct();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const ProductModal = withRouter(ProductModalComponent);

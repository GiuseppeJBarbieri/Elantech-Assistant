import React, { HTMLAttributes, FunctionComponent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IProduct from "../../types/IProduct";

import './ProductModal.css'

interface ProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedProduct: IProduct | undefined;
    modalSwitch: Number;
}

const ProductModalComponent: FunctionComponent<ProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle]  = useState('Create Product');

    const [editProduct, setEditProduct] = useState<IProduct>(
        {
            quantity: props.selectedProduct?.quantity,
            product_number: props.selectedProduct?.product_number,
            product_type: props.selectedProduct?.product_type,
            brand: props.selectedProduct?.brand,
            description: props.selectedProduct?.description,
            last_added: props.selectedProduct?.last_added,
            alt_1: props.selectedProduct?.alt_1,
            alt_2: props.selectedProduct?.alt_2,
            alt_3: props.selectedProduct?.alt_3,
            alt_4: props.selectedProduct?.alt_4,
            ebay_link: props.selectedProduct?.ebay_link,
            website_link: props.selectedProduct?.website_link,
            quick_specs: props.selectedProduct?.quick_specs,
            related_tags: props.selectedProduct?.related_tags,
        }
    );
    const addProduct = () => {
        setIsSaving(true);
        setTimeout(function() { //Start the timer
            setIsSaving(false);
            // Display Alert
            props.onClose();
        }.bind(this), 5000)
    }
    useEffect(() => {
        if (props.modalSwitch === 0) {
            setTitle('Create Product');
        } else {
            setTitle('Edit Product');
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >{title}</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter product information.</p>
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
                                    <Form.Label>Product Number</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Product Number" value={editProduct.product_number} onChange={(e) => setEditProduct({ ...editProduct, product_number: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Select aria-label="Default select example" 
                                    value={editProduct.product_type} 
                                    onChange={(e) => setEditProduct({ ...editProduct, product_type: (e.target.value) })}
                                    >
                                        <option>Product Type</option>
                                        <option value="CPU">CPU</option>
                                        <option value="Riser">Riser</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        id="orderNumber" type="text" placeholder="Brand" value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Description" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ebay Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Ebay Link" value={editProduct.ebay_link} onChange={(e) => setEditProduct({ ...editProduct, ebay_link: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Website Link" value={editProduct.website_link} onChange={(e) => setEditProduct({ ...editProduct, website_link: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quick Specs</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Quick Specs" value={editProduct.quick_specs} onChange={(e) => setEditProduct({ ...editProduct, quick_specs: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 1</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Alt Number 1" value={editProduct.alt_1} onChange={(e) => setEditProduct({ ...editProduct, alt_1: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 2</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Alt Number 2" value={editProduct.alt_2} onChange={(e) => setEditProduct({ ...editProduct, alt_2: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 3</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Alt Number 3" value={editProduct.alt_3} onChange={(e) => setEditProduct({ ...editProduct, alt_3: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 4</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Alt Number 4" value={editProduct.alt_4} onChange={(e) => setEditProduct({ ...editProduct, alt_4: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Related Tags</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Related Tags" value={editProduct.related_tags} onChange={(e) => setEditProduct({ ...editProduct, related_tags: (e.target.value) })}
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
                                addProduct();
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

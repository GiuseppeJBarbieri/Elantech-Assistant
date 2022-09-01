import React, { HTMLAttributes, FunctionComponent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IProduct from "../../types/IProduct";
import axios from 'axios';
import { BASE_API_URL } from '../../constants/API';
import './ProductModal.css'

interface ProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedProduct: IProduct;
    modalSwitch: Number;
    getAllProducts: () => void;
}

const ProductModalComponent: FunctionComponent<ProductModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState('Create Product');
    const [editProductObj, setEditProductObj] = useState<IProduct>(props.selectedProduct);

    const addProduct = async () => {
        setEditProductObj(editProductObj);
        setIsSaving(true);
        setTimeout(() => {
            axios.post(`${BASE_API_URL}products`, editProductObj, { withCredentials: true })
                .then((response) => {
                    setIsSaving(false);
                    props.getAllProducts();
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 400);
    };
    const editProduct = async () => {
        setIsSaving(true);
        setTimeout(() => {
            axios.put(`${BASE_API_URL}products`, editProductObj, { withCredentials: true })
                .then((response) => {
                    setIsSaving(false);
                    props.getAllProducts();
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 500);
    };
    const submitProduct = () => {
        if (props.modalSwitch === 0) {
            addProduct();
        } else {
            editProduct();
        }
    }
    useEffect(() => {
        if (props.modalSwitch === 0) {
            setTitle('Create Product');
        } else {
            setTitle('Edit Product');
        }

    }, [])
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
                                        type="text"
                                        placeholder="Product Number"
                                        value={editProductObj.productNumber}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, productNumber: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={editProductObj.productType}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, productType: (e.target.value) })}
                                    >
                                        <option>Product Type</option>
                                        <option value="CPU">CPU</option>
                                        <option value="Riser">Riser</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={editProductObj.brand}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, brand: (e.target.value) })}
                                    >
                                        <option>Brand</option>
                                        <option value="HP">HP</option>
                                        <option value="HPE">HPE</option>
                                        <option value="Dell">Dell</option>
                                        <option value="Cisco">Cisco</option>
                                        <option value="IBM">IBM</option>
                                        <option value="Lenovo">Lenovo</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Description"
                                        value={editProductObj.description}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, description: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 1</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 1"
                                        value={editProductObj.altNumber1}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber1: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 2</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 2"
                                        value={editProductObj.altNumber2}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber2: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 3</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 3"
                                        value={editProductObj.altNumber3}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber3: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 4</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 4"
                                        value={editProductObj.altNumber4}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber4: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 5</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 5"
                                        value={editProductObj.altNumber5}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber5: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alt Number 6</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Alt Number 6"
                                        value={editProductObj.altNumber6}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, altNumber6: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ebay Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Ebay Link"
                                        value={editProductObj.ebayLink}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, ebayLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website Link</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Website Link"
                                        value={editProductObj.websiteLink}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, websiteLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quick Specs</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Quick Specs"
                                        value={editProductObj.quickSpecsLink}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, quickSpecsLink: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Related Tags</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Related Tags"
                                        value={editProductObj.relatedTags}
                                        onChange={(e) => setEditProductObj({ ...editProductObj, relatedTags: (e.target.value) })}
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
                                console.log(editProductObj.productNumber)
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

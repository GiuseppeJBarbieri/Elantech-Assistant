import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IQuotedProduct from '../../../types/IQuotedProduct';

interface EditQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedQuote: IQuotedProduct | undefined;
}

const EditQuoteModalComponent: FunctionComponent<EditQuoteModalProps> = (props) => {
    const [isSaving] = useState(false);
    // const [quote, setQuote] = useState<IQuotedProduct>(
    //     {
    //         quantity: props.selectedQuote?.quantity,
    //         product_number: props.selectedQuote?.product_number,
    //         product_type: props.selectedQuote?.product_type,
    //         brand: props.selectedQuote?.brand,
    //         description: props.selectedQuote?.description,
    //         condition: props.selectedQuote?.condition,
    //         price: props.selectedQuote?.price,
    //     }
    // );
    // const editQuote = () => {
    //     setIsSaving(true);
    //     setTimeout(function () { //Start the timer
    //         setIsSaving(false);
    //         // Display Alert
    //         props.onClose();
    //     }.bind(this), 5000)
    // }
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Edit Quote</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter quote information.</p>
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
                                        id="product_number"
                                        type="text"
                                        placeholder="Product Number"
                                        // value={quote.product_number}
                                        // onChange={(e) => setQuote({ ...quote, product_number: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Control
                                        id="product_type"
                                        type="text"
                                        placeholder="Product Type"
                                        // value={quote.product_type}
                                        // onChange={(e) => setQuote({ ...quote, product_type: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        id="brand"
                                        type="text"
                                        placeholder="Brand"
                                        // value={quote.brand}
                                        // onChange={(e) => setQuote({ ...quote, brand: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        id="description"
                                        type="text"
                                        placeholder="Description"
                                        // value={quote.description}
                                        // onChange={(e) => setQuote({ ...quote, description: (e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        // value={quote.condition}
                                        // onChange={(e) => setQuote({ ...quote, condition: (e.target.value) })}
                                    >
                                        <option>Choose Condition</option>
                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                        <option value="New Opened Box">New Opened Box</option>
                                        <option value="Renew">Renew</option>
                                        <option value="Refurbished">Refurbished</option>
                                        <option value="Used">Used</option>
                                        <option value="Damaged">Damaged</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        id="quantity"
                                        type="text"
                                        placeholder="Quantity"
                                        // value={quote.quantity}
                                        // onChange={(e) => setQuote({ ...quote, quantity: Number(e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        id="price"
                                        type="text"
                                        placeholder="Price"
                                        // value={quote.price}
                                        // onChange={(e) => setQuote({ ...quote, price: Number(e.target.value) })}
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

export const EditQuoteModal = withRouter(EditQuoteModalComponent);

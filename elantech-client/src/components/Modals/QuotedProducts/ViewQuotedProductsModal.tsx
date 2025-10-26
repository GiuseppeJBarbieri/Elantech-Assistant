import React, { FunctionComponent, useEffect, useState } from 'react';
import { Modal, Spinner, Form, Col, Row } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import ICompany from '../../../types/ICompany';
import IQuote from '../../../types/IQuote';
import IQuotedProduct from '../../../types/IQuotedProduct';
import { requestAllProductQuotesByQuoteId } from '../../../utils/Requests';
import './ViewQuotedProductsModal.css';

interface ViewQuotedProductsModalProps {
    onClose: () => void;
    modalVisible: boolean;
    selectedCompany: ICompany;
    selectedQuote: IQuote;
}

const currencyFormatter = (cell: number) => {
    return `$${cell.toFixed(2)}`;
};

const columns: ColumnDescription<IQuotedProduct>[] = [
    {
        dataField: 'quantity',
        text: 'QTY',
        sort: true,
        headerAlign: 'center',
        style: {
            textAlign: 'center',
        }
    },
    {
        dataField: 'quotedPrice',
        text: 'Price',
        formatter: currencyFormatter,
    },
    {
        dataField: 'productCondition',
        text: 'Condition',
    },
    {
        dataField: 'product.productNumber',
        text: 'Product Number',
        sort: true,
        style: {
            maxWidth: 180
        }
    },
    {
        dataField: 'product.altNumber1',
        text: 'Alt 1',
        sort: true,
        style: {
            maxWidth: 180
        }
    },
    {
        dataField: 'product.altNumber2',
        text: 'Alt 2',
        sort: true,
        style: {
            maxWidth: 180
        }
    },
    {
        dataField: 'product.altNumber3',
        text: 'Alt 3',
        sort: true,
        style: {
            maxWidth: 180
        }
    },
    {
        dataField: 'product.altNumber4',
        text: 'Alt 4',
        sort: true,
        style: {
            maxWidth: 180
        }
    },
    {
        dataField: 'product.brand',
        text: 'Brand',
        sort: true,
        headerAlign: 'center',
        style: {
            textAlign: 'center'
        }
    },
    {
        dataField: 'product.description',
        text: 'Description',
        sort: false,
        style: {
            maxWidth: 280
        }
    },
    {
        dataField: 'comment',
        text: 'Comment',
    },
];

export const ViewQuotedProductsModal: FunctionComponent<ViewQuotedProductsModalProps> = (props) => {
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalQuote, setTotalQuote] = useState<number>(0);

    useEffect(() => {
        const getAllQuotedProducts = async (quoteId: number) => {
            setIsLoading(true);
            try {
                const fetchedQuotedProducts = await requestAllProductQuotesByQuoteId(quoteId);
                setQuotedProducts(fetchedQuotedProducts);
                const total = fetchedQuotedProducts.reduce((sum, item) => sum + item.quotedPrice, 0);
                setTotalQuote(total);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (props.selectedQuote.id !== undefined) {
            getAllQuotedProducts(props.selectedQuote.id);
        }
    }, [props.selectedQuote.id]);

    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className="modal-header-custom" closeButton>
                    <Modal.Title>
                        <h2 className="modal-title-custom" >View Quote Information</h2>
                        <p className="modal-title-sub-custom">All details and products included in this quote are shown below for your review.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isLoading ?
                            <div className='spinnerDiv spinner-div-custom' >
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
                                <Row>
                                    <Col md={6}>
                                        <Form.Label className="form-label-title-custom">Company Information</Form.Label>
                                        <hr />
                                        <div className="container info-container-custom">
                                            <Form.Label className="form-label-custom">Company Type: {props.selectedCompany.type}</Form.Label>
                                            <Form.Label className="form-label-custom">Company Name: {props.selectedCompany.name}</Form.Label>
                                            <Form.Label className="form-label-custom">Company Rep: {props.selectedCompany.representative}</Form.Label>
                                            <Form.Label className="form-label-custom">Phone Number: {props.selectedCompany.phone}</Form.Label>
                                            <Form.Label className="form-label-custom">Email: {props.selectedCompany.email}</Form.Label>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="form-label-title-custom">Quote Information</Form.Label>
                                        <hr />
                                        <div className="container info-container-custom">
                                            <Form.Label className="form-label-custom">Quoter: {props.selectedQuote?.user?.firstName} {props.selectedQuote?.user?.lastName}</Form.Label>
                                            <Form.Label className="form-label-custom">Date: {props.selectedQuote.dateQuoted}</Form.Label>
                                            <Form.Label className="form-label-custom">Total Quote: {currencyFormatter(totalQuote)}</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <hr />
                                <BootstrapTable
                                    columns={columns}
                                    keyField="id"
                                    data={quotedProducts}
                                    classes="table table-dark table-hover table-striped"
                                    noDataIndication="Table is Empty"
                                />
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    {/* Footer content can go here if needed */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

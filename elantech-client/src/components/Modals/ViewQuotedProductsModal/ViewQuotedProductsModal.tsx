/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, Col, Row } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../../types/ICompany';
import IQuote from '../../../types/IQuote';
import IQuotedProduct from '../../../types/IQuotedProduct';
import { requestAllProductQuotesByQuoteId } from '../../../utils/Requests';

interface ViewQuotedProductsModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedCompany: ICompany;
    selectedQuote: IQuote;
}

const ViewQuotedProductsModalComponent: FunctionComponent<ViewQuotedProductsModalProps> = (props) => {
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [isSaving] = useState(false);
    const [totalQuote, setTotalQuote] = useState<number>(0);
    const column: ColumnDescription<any, any>[] = [
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
        },
        {
            dataField: 'productCondition',
            text: 'Condition',
        },
        {
            dataField: 'Product.productNumber',
            text: 'Product Number',
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            dataField: 'Product.altNumber1',
            text: 'Alt 1',
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            dataField: 'Product.altNumber2',
            text: 'Alt 2',
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            dataField: 'Product.altNumber3',
            text: 'Alt 3',
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            dataField: 'Product.altNumber4',
            text: 'Alt 4',
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            dataField: 'Product.brand',
            text: 'Brand',
            sort: true,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            dataField: 'Product.description',
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
    const getAllQuotedProducts = (quoteId: number) => {
        setTimeout(async () => {
            try {
                const quotedProducts = await requestAllProductQuotesByQuoteId(quoteId);
                setQuotedProducts(quotedProducts);

                let totalQuote = 0;
                quotedProducts.forEach(element => {
                    totalQuote += element.quotedPrice;
                });
                setTotalQuote(totalQuote);
            } catch (err) {
                console.log(err);
            }
        }, 400)
    };
    useEffect(() => {
        if (props.selectedQuote.id !== undefined) {
            getAllQuotedProducts(props.selectedQuote.id);
        }
    }, []);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >View Quote</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Quoted products from this quote IDK what to put here.</p>
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
                                <Row>
                                    <Col>
                                        <Form.Label style={{ fontWeight: 300, fontSize: 18 }}>Company Information</Form.Label>
                                        <hr />
                                        <div className="container" style={{ display: 'inline-grid' }}>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Type: {props.selectedCompany.type}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Name: {props.selectedCompany.name}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Rep: {props.selectedCompany.representative}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Phone Number: {props.selectedCompany.phone}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Email: {props.selectedCompany.email}</Form.Label>
                                        </div>
                                    </Col>
                                    <br />
                                    <br />
                                    <Col>
                                        <Form.Label style={{ fontWeight: 300, fontSize: 18 }}>Quote Information</Form.Label>
                                        <hr />
                                        <div className="container" style={{ display: 'inline-grid' }}>
                                            <Form.Label style={{ fontWeight: 300 }}>Quoter: {props.selectedQuote?.User?.firstName} {props.selectedQuote?.User?.lastName}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Date: {props.selectedQuote.dateQuoted}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Total Quote: ${totalQuote}</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <hr />
                                <BootstrapTable
                                    bootstrap4
                                    condensed
                                    columns={column}
                                    keyField="id"
                                    data={quotedProducts}
                                    classes="table table-dark table-hover table-striped"
                                    noDataIndication="Table is Empty"
                                />
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('');
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const ViewQuotedProductsModal = withRouter(ViewQuotedProductsModalComponent);

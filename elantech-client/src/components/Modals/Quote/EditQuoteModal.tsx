import React, { HTMLAttributes, FunctionComponent, useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IQuotedProduct from '../../../types/IQuotedProduct';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import ICompany from '../../../types/ICompany';
import IQuote from '../../../types/IQuote';
import { requestAllProductQuotesByQuoteId, requestAllProducts, requestUpdateQuoteAndQuotedProducts } from '../../../utils/Requests';
import { Plus, Search } from 'react-bootstrap-icons';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import { conditionList } from '../../../constants/Options';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { defaultAlert, defaultQuotedProduct } from '../../../constants/Defaults';
import './EditQuoteModal.css';

interface EditQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    modalVisible: boolean;
    selectedCompany: ICompany;
    selectedQuote: IQuote;
}

const currencyFormatter = (cell: number) => `$${cell?.toFixed(2)}`;

const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total" style={{ marginLeft: 5 }}>
        {size} Results
    </span>
);

const paginationOptions = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
};

const quoted_product_column_definition = (removeQuotedProduct: (id: number) => void): ColumnDescription<IQuotedProduct>[] => [
    { dataField: 'quantity', text: 'QTY', sort: true, headerAlign: 'center', style: { textAlign: 'center' } },
    { dataField: 'quotedPrice', text: 'Price', formatter: currencyFormatter },
    { dataField: 'productCondition', text: 'Condition' },
    { dataField: 'product.productNumber', text: 'Product Number', sort: true, style: { maxWidth: 180 } },
    { dataField: 'product.altNumber1', text: 'Alt 1', sort: true, style: { maxWidth: 180 } },
    { dataField: 'product.altNumber2', text: 'Alt 2', sort: true, style: { maxWidth: 180 } },
    { dataField: 'product.altNumber3', text: 'Alt 3', sort: true, style: { maxWidth: 180 } },
    { dataField: 'product.altNumber4', text: 'Alt 4', sort: true, style: { maxWidth: 180 } },
    { dataField: 'product.brand', text: 'Brand', sort: true, headerAlign: 'center', style: { textAlign: 'center' } },
    { dataField: 'product.description', text: 'Description', sort: false, style: { maxWidth: 280 } },
    { dataField: 'comment', text: 'Comment' },
    {
        dataField: 'remove',
        text: 'Delete',
        sort: false,
        formatter: (_, data) => (
            <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => removeQuotedProduct(data.id as number)}>
                <Button variant="link" className="p-0 text-white">
                    <i className="bi-trash" style={{ fontSize: 20 }}></i>
                </Button>
            </div>
        ),
        headerAlign: 'center',
    },
];

const product_column: ColumnDescription<IProduct>[] = [
    { dataField: 'quantity', text: 'QTY', sort: true, headerAlign: 'center' },
    { dataField: 'productNumber', text: 'Product Number', sort: true },
    { dataField: 'altNumber1', text: 'Alt 1', sort: true },
    { dataField: 'altNumber2', text: 'Alt 2', sort: true },
    { dataField: 'altNumber3', text: 'Alt 3', sort: true },
    { dataField: 'productType', text: 'Type', sort: true, headerAlign: 'center' },
    { dataField: 'brand', text: 'Brand', sort: true, headerAlign: 'center' },
    { dataField: 'description', text: 'Description', sort: false },
];

const handleSearch = (input: string, searchProps: { onSearch: (value: string) => void; }) => {
    if (input !== undefined) {
        searchProps.onSearch(input);
    }
};

const EditQuoteModalComponent: FunctionComponent<EditQuoteModalProps> = ({ selectedQuote, selectedCompany, modalVisible, onClose }) => {
    const [alert, setAlert] = useState(defaultAlert);
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [newQuotedProduct, setNewQuotedProduct] = useState<IQuotedProduct>(defaultQuotedProduct);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({});

    const totalQuote = React.useMemo(() => quotedProducts.reduce((sum, item) => sum + (item.quotedPrice || 0), 0), [quotedProducts]);

    const removeQuotedProduct = (id: number) => {
        setQuotedProducts(currentProducts => currentProducts.filter(p => p.id !== id));
    };

    const quoted_product_column = quoted_product_column_definition(removeQuotedProduct);

    const selectRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#0da7fd73 !important',
        onSelect: (row: IProduct, isSelect: boolean) => {
            if (isSelect === true) {
                setSelectedProduct(row);
            }
        },
    };

    const getAllQuotedProducts = (quoteId: number) => {
        setTimeout(async () => {
            try {
                const quotedProducts = await requestAllProductQuotesByQuoteId(quoteId);
                setQuotedProducts(quotedProducts);
            } catch (err) {
                console.log(err);
            }
        }, 400)
    };

    const getAllProducts = async () => {
        setProducts(await requestAllProducts());
    };

    const addQuotedProductToTable = () => {
        if (JSON.stringify(selectedProduct) === '{}') {
            setAlert({ label: 'Please select a product.', show: true, type: 'danger' });
        } else if (newQuotedProduct.productCondition === '' || newQuotedProduct.productCondition === 'Condition' || newQuotedProduct.quantity === 0 || newQuotedProduct.quotedPrice === 0) {
            setAlert({ label: 'Missing Required Information!', show: true, type: 'danger' });
        } else {
            const found = quotedProducts.some(p =>
                p.productId === selectedProduct.id && p.productCondition.toLowerCase() === newQuotedProduct.productCondition.toLowerCase()
            );

            if (!found) {
                const quotedProduct: IQuotedProduct = {
                    ...newQuotedProduct,
                    id: Date.now(), // Temporary ID for new client-side items
                    quoteId: selectedQuote.id as number,
                    productId: selectedProduct.id as number,
                    product: {
                        productNumber: selectedProduct.productNumber || '',
                        productType: selectedProduct.productType || '',
                        brand: selectedProduct.brand || '',
                        description: selectedProduct.description || '',
                    },
                }
                setQuotedProducts(prev => [...prev, quotedProduct]);
                setNewQuotedProduct(defaultQuotedProduct);
            } else {
                setAlert({ label: 'Cannot quote another product with the same condition.', show: true, type: 'danger' });
            }
        }
        setTimeout(() => setAlert(defaultAlert), 3000);
    };

    const finished = async () => {
        setIsSaving(true);
        const quotedProductsCopy = quotedProducts.map(({ product, quote, ...rest }) => rest);

        const quote: IQuote = {
            ...selectedQuote,
            quotedProducts: quotedProductsCopy,
        }

        try {
            await requestUpdateQuoteAndQuotedProducts(quote);
            onClose();
        } catch (err) {
            setAlert({ label: `${err}`, show: true, type: 'danger' });
            setTimeout(() => setAlert(defaultAlert), 3000);
        } finally {
            setIsSaving(false);
        }
    }

    const handleNewProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumericField = ['quantity', 'quotedPrice'].includes(id);

        setNewQuotedProduct(prev => ({
            ...prev,
            [id]: isNumericField ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    };

    useEffect(() => {
        if (selectedQuote.id !== undefined) {
            getAllQuotedProducts(selectedQuote.id);
        }
        getAllProducts();
    }, [selectedQuote.id]);

    return (
        <div>
            <Modal backdrop="static" show={modalVisible} onHide={onClose} fullscreen={true}>
                <Modal.Header className="modal-header-edit-quote" closeButton>
                    <Modal.Title>
                        <h2 className="modal-title-edit-quote">Edit Quote</h2>
                        <p className="modal-subtitle-edit-quote">Quoted products from this quote IDK what to put here.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-edit-quote">
                    <div className='container d-grid gap-2 container-edit-quote'>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form className="container d-grid" >
                                <Row>
                                    <Col>
                                        <Form.Label className="form-label-title">Company Information</Form.Label>
                                        <hr />
                                        <div className="container info-container">
                                            <Form.Label className="form-label-info">Company Type: {selectedCompany.type}</Form.Label>
                                            <Form.Label className="form-label-info">Company Name: {selectedCompany.name}</Form.Label>
                                            <Form.Label className="form-label-info">Company Rep: {selectedCompany.representative}</Form.Label>
                                            <Form.Label className="form-label-info">Phone Number: {selectedCompany.phone}</Form.Label>
                                            <Form.Label className="form-label-info">Email: {selectedCompany.email}</Form.Label>
                                        </div>
                                    </Col>
                                    <br />
                                    <br />
                                    <Col>
                                        <Form.Label className="form-label-title">Quote Information</Form.Label>
                                        <hr />
                                        <div className="container info-container">
                                            <Form.Label className="form-label-info">Quoter: {selectedQuote?.user?.firstName} {selectedQuote?.user?.lastName}</Form.Label>
                                            <Form.Label className="form-label-info">Date: {selectedQuote.dateQuoted ? new Date(selectedQuote.dateQuoted).toLocaleDateString() : ''}</Form.Label>
                                            <Form.Label className="form-label-info">Total Quote: {currencyFormatter(totalQuote)}</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                                <BootstrapTable
                                    bootstrap4
                                    condensed
                                    columns={quoted_product_column}
                                    keyField="id"
                                    data={quotedProducts}
                                    classes="table table-dark table-hover table-striped"
                                    noDataIndication="Table is Empty"
                                />
                                <hr />
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <h3 className="form-label-title">Add Products</h3>
                                    <p className="form-label-info">
                                        First select a product, add the quote information, then click add quote when finished.
                                    </p>
                                </Form.Group>
                                <div className='add-product-form'>
                                    <div>
                                        <Form.Label>Condition</Form.Label>
                                        <Form.Select id="productCondition" aria-label="Condition" value={newQuotedProduct.productCondition} onChange={handleNewProductInputChange}>
                                            <option>Condition</option>
                                            {conditionList.map(c => <option key={c} value={c}>{c}</option>)}
                                        </Form.Select>
                                    </div>
                                    <div>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            id="quantity" type="number" placeholder="QTY" style={{ width: 85 }}
                                            value={newQuotedProduct.quantity === 0 ? '' : newQuotedProduct.quantity}
                                            onChange={handleNewProductInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            id="quotedPrice" type="number" placeholder="Price" style={{ width: 110 }}
                                            value={newQuotedProduct.quotedPrice === 0 ? '' : newQuotedProduct.quotedPrice}
                                            onChange={handleNewProductInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            id="comment" as="textarea" placeholder="Comment" style={{ width: 400 }}
                                            value={newQuotedProduct.comment}
                                            onChange={handleNewProductInputChange}
                                        />
                                    </div>
                                    <div className="add-product-button-container">
                                        <Button variant="dark" onClick={addQuotedProductToTable}>
                                            <Plus style={{ marginTop: -3, marginLeft: -10 }} />
                                            Add Quote
                                        </Button>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={products}
                                        columns={product_column}
                                        search >
                                        {
                                            searchProps => (
                                                <div>
                                                    <InputGroup className="mb-3" style={{ width: 'max-content' }}>
                                                        <InputGroup.Text id="basic-addon2"><Search /></InputGroup.Text>
                                                        <DebounceInput
                                                            type="text"
                                                            className='debounce form-control'
                                                            placeholder="Search..."
                                                            debounceTimeout={500}
                                                            onChange={e => handleSearch(e.target.value, searchProps.searchProps)}
                                                        />
                                                    </InputGroup>

                                                    <BootstrapTable
                                                        {...searchProps.baseProps}
                                                        key='product_table'
                                                        keyField="id"
                                                        bootstrap4
                                                        condensed
                                                        selectRow={selectRow}
                                                        pagination={paginationFactory(paginationOptions)}
                                                        classes="table table-dark table-hover table-striped table-responsive"
                                                        noDataIndication="Table is Empty"
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </div>

                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-edit-quote">
                    <div className="w-100 text-center">
                        <Button variant="dark" onClick={finished}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditQuoteModal = withRouter(EditQuoteModalComponent);

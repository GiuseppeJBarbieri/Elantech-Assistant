import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { defaultAlert, defaultQuotedProduct } from '../../../constants/Defaults';
import { conditionList } from '../../../constants/Options';
import ICompany from '../../../types/ICompany';
import IProduct from '../../../types/IProduct';
import IQuote from '../../../types/IQuote';
import IQuotedProduct from '../../../types/IQuotedProduct';
import { requestAddQuote, requestAllProducts } from '../../../utils/Requests';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import '../modal.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import { AddProductForm } from './AddProductForm';
import './AddMultiQuoteModal.css';

interface AddMultiQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    getAllQuotes: (companyId: number) => void;
    modalVisible: boolean;
    selectedCompany: ICompany;
}

const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total" style={{ marginLeft: 5 }}>
        {size} Results
    </span>
);

const paginationOptions = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
};

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

const quoted_product_column_definition = (removeQuotedProduct: (id: number) => void): ColumnDescription<IQuotedProduct>[] => [
    { dataField: 'quantity', text: 'QTY', sort: true, headerAlign: 'center' },
    { dataField: 'product.productNumber', text: 'Product Number', sort: true },
    { dataField: 'product.productType', text: 'Type', sort: true, headerAlign: 'center' },
    { dataField: 'product.brand', text: 'Brand', sort: true, headerAlign: 'center' },
    { dataField: 'product.description', text: 'Description', sort: false },
    { dataField: 'productCondition', text: 'Condition', sort: false },
    { dataField: 'quotedPrice', text: 'Price', sort: false },
    { dataField: 'comment', text: 'Comment', sort: false },
    {
        dataField: 'remove',
        text: 'Remove',
        sort: false,
        formatter: (_, data) => (
            <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => removeQuotedProduct(data.id as number)}>
                <Button variant="link" className="p-0 text-white">
                    <i className="bi-trash" style={{ fontSize: 20 }}></i>
                </Button>
            </div>
        ),
        headerAlign: 'center',
        style: { textAlign: 'center' }
    }
];

const handleSearch = (input: string, searchProps: { onSearch: (value: string) => void; }) => {
    if (input !== undefined) {
        searchProps.onSearch(input);
    }
};

const AddMultiQuoteModalComponent: FunctionComponent<AddMultiQuoteModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({});
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [newQuotedProduct, setNewQuotedProduct] = useState<IQuotedProduct>(defaultQuotedProduct);

    const removeQuotedProduct = (id: number) => {
        setQuotedProducts(currentProducts => currentProducts.filter(p => p.id !== id));
    };

    const quoted_product_column = quoted_product_column_definition(removeQuotedProduct);

    const selectRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct, isSelect: boolean) => {
            if (isSelect === true) {
                setSelectedProduct(row);
            }
        },
    };

    const addQuotedProductToTable = () => {
        if (JSON.stringify(selectedProduct) === '{}') {
            setAlert({ ...alert, label: 'Please select a product.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        }
        else if (newQuotedProduct.productCondition === '' || newQuotedProduct.productCondition === 'Condition' || newQuotedProduct.quantity === 0 || newQuotedProduct.quotedPrice === 0) {
            const errorMessage = JSON.stringify(selectedProduct) === '{}'
                ? 'Please select a product.'
                : newQuotedProduct.productCondition === ''
                    ? 'Please select a condition.'
                    : newQuotedProduct.quantity === 0
                        ? 'Please enter a quantity.'
                        : newQuotedProduct.quotedPrice === 0
                            ? 'Please enter a price.'
                            : '';
            setAlert({ ...alert, label: errorMessage, show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        } else {
            let found = false;
            quotedProducts.forEach(product => {
                if (product.productId === selectedProduct.id &&
                    product.productCondition.toLocaleLowerCase() === newQuotedProduct.productCondition.toLocaleLowerCase()) {
                    setAlert({ ...alert, label: 'Cannot quote another product with the same condition.', show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 5000);
                    found = true;
                }
            })
            if (!found) {
                const quotedProduct: IQuotedProduct = {
                    ...newQuotedProduct,
                    id: (Math.random() * 10000),
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
            }
        }
    };
    const getAllProducts = async () => {
        setProducts(await requestAllProducts());
    };
    const saveQuote = async () => {
        // Save Quote
        setIsSaving(true);
        if (quotedProducts.length === 0) {
            setAlert({ ...alert, label: 'Please quote a product before continuing.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
            setIsSaving(false);
        } else {
            setTimeout(async () => {
                try {
                    const quotedProductCopy: IQuotedProduct[] = quotedProducts.map(({ id, product, ...rest }) => rest);
                    const quote: IQuote = {
                        companyId: props.selectedCompany.id as number,
                        userId: 0,
                        dateQuoted: new Date(),
                        sold: false,
                        quotedProducts: quotedProductCopy,
                    };

                    await requestAddQuote(quote);
                    setIsSaving(false);
                    props.getAllQuotes(props.selectedCompany.id as number);
                    props.onClose();
                } catch (err) {
                    setAlert({ ...alert, label: `${err}`, show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 5000);
                    setIsSaving(false);
                }
            }, 500);
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [setProducts]);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className={'modal-header'} closeButton>
                    <Modal.Title>
                        <h2 className={'modal-title'}>Create Quote</h2>
                        <p className={'modal-sub-title'}>Please enter quote information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-add-multi">
                    <div className='container d-grid gap-2 container-add-multi'>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form className="container d-grid" >
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-title">Company Information</Form.Label>
                                    <hr />
                                    <div className="container info-container">
                                        <Form.Label className="form-label-info">Company Type: {props.selectedCompany.type}</Form.Label>
                                        <Form.Label className="form-label-info">Company Name: {props.selectedCompany.name}</Form.Label>
                                        <Form.Label className="form-label-info">Company Rep: {props.selectedCompany.representative}</Form.Label>
                                        <Form.Label className="form-label-info">Phone Number: {props.selectedCompany.phone}</Form.Label>
                                        <Form.Label className="form-label-info">Email: {props.selectedCompany.email}</Form.Label>
                                    </div>
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3">
                                    <h3 className="form-label-title">Select Product</h3>
                                    <p className="form-label-info">
                                        First select a product, add the quote information, then click add quote when finished.
                                    </p>
                                </Form.Group>
                                <AddProductForm
                                    conditionList={conditionList}
                                    newQuotedProduct={newQuotedProduct}
                                    setNewQuotedProduct={setNewQuotedProduct}
                                    onAdd={addQuotedProductToTable}
                                />
                                <hr />
                                <div>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={products}
                                        columns={product_column}
                                        search >
                                        {
                                            props => {
                                                return (<div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text id="basic-addon2">
                                                            <Search />
                                                        </InputGroup.Text>
                                                        <DebounceInput
                                                            type="text"
                                                            className='debounce form-control'
                                                            placeholder="Search..."
                                                            debounceTimeout={500}
                                                            onChange={e => handleSearch(e.target.value, props.searchProps)}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapTable
                                                        {...props.baseProps}
                                                        key='product_table'
                                                        keyField="id"
                                                        bootstrap4
                                                        condensed
                                                        data={products}
                                                        columns={product_column}
                                                        selectRow={selectRow as SelectRowProps<IProduct>}
                                                        pagination={paginationFactory(paginationOptions)}
                                                        classes="table table-dark table-hover table-striped table-responsive"
                                                        noDataIndication="Table is Empty"
                                                    />
                                                </div>);
                                            }
                                        }
                                    </ToolkitProvider>
                                </div>
                                <hr />
                                <br />
                                <div>
                                    <h3 className="form-label-title">Quoted Products</h3>
                                    <hr />
                                    <BootstrapTable
                                        keyField='id'
                                        data={quotedProducts}
                                        columns={quoted_product_column}
                                        bootstrap4
                                        condensed
                                        classes="table table-dark table-hover table-striped"
                                        noDataIndication="Table is Empty"
                                    />
                                </div>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <div className="w-100 footer-button-container">
                        <Button variant="dark" onClick={saveQuote}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export const AddMultiQuoteModal = withRouter(AddMultiQuoteModalComponent);
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { defaultAlert } from '../../../constants/Defaults';
import { conditionList } from '../../../constants/Options';
import ICompany from '../../../types/ICompany';
import IProduct from '../../../types/IProduct';
import IQuote from '../../../types/IQuote';
import IQuotedProduct from '../../../types/IQuotedProduct';
import { requestAddQuote, requestAddQuotedProduct, requestAllProducts } from '../../../utils/Requests';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import '../modal.css';

interface AddMultiQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getAllQuotes: (companyId: number) => void;
    modalVisible: boolean;
    selectedCompany: ICompany;
}

const AddMultiQuoteModalComponent: FunctionComponent<AddMultiQuoteModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({});
    const [quote, setQuote] = useState<IQuote>({ companyId: props.selectedCompany.id as number, userId: 0, dateQuoted: new Date().toString(), sold: false });
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [alert, setAlert] = useState(defaultAlert);
    const [condition, setCondition] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [comment] = useState('');

    const rankFormatterRemove = (_: unknown, data: IQuotedProduct) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={() => {
                    setQuotedProducts(quotedProducts.filter(quotedProduct => { return quotedProduct.id !== data.id }));
                }}>
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column: ColumnDescription<any, any>[] = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            dataField: 'altNumber1',
            text: 'Alt 1',
            sort: true,
        },
        {
            dataField: 'altNumber2',
            text: 'Alt 2',
            sort: true,
        },
        {
            dataField: 'altNumber3',
            text: 'Alt 3',
            sort: true,
        },
        {
            dataField: 'productType',
            text: 'Type',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'brand',
            text: 'Brand',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false,
        },
    ];
    const column_inner: ColumnDescription<any, any>[] = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            dataField: 'type',
            text: 'Type',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'brand',
            text: 'Brand',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false,
        },
        {
            dataField: 'productCondition',
            text: 'Condition',
            sort: false,
        },
        {
            dataField: 'quotedPrice',
            text: 'Price',
            sort: false,
        },
        {
            dataField: 'remove',
            text: 'Remove',
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        }
    ];
    const options = {
        custom: true,
        totalSize: products.length
    };
    const selectRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct, isSelect: boolean) => {
            if (isSelect === true) {
                setRowSelected(true);
                setSelectedProduct(row);
            } else {
                setRowSelected(false);
            }
        },
    };
    const addQuotedProductToTable = () => {
        if (JSON.stringify(selectedProduct) === '{}') {
            setAlert({ ...alert, label: 'Please select a product.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        }
        else if (condition === 'condition' || quantity === 0 || price === 0) {
            setAlert({ ...alert, label: 'Please enter required information.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        } else {
            let found = false;
            quotedProducts.forEach(product => {
                if (product.productId === selectedProduct.id &&
                    product.productCondition.toLocaleLowerCase() === condition.toLocaleLowerCase()) {
                    setAlert({ ...alert, label: 'Cannot quote another product with the same condition.', show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 5000);
                    found = true;
                }
            })
            if (!found) {
                const quotedProduct: IQuotedProduct = {
                    id: (Math.random() * 10000),
                    quoteId: 0,
                    productId: selectedProduct.id as number,
                    quantity: quantity,
                    quotedPrice: price,
                    productCondition: condition,
                    comment: comment,
                    productNumber: selectedProduct.productNumber,
                    type: selectedProduct.productType,
                    brand: selectedProduct.brand,
                    description: selectedProduct.description
                }
                quotedProducts.push(quotedProduct);
                setQuotedProducts(JSON.parse(JSON.stringify(quotedProducts)));
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
            setAlert({ ...alert, label: 'Please select a product.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
            setIsSaving(false);
        } else {
            setTimeout(async () => {
                try {
                    console.log(quote);
                    const response = await requestAddQuote({ companyId: props.selectedCompany.id as number, userId: 0, dateQuoted: new Date().toString(), sold: false } as IQuote);
                    quotedProducts.forEach(async product => {
                        product.quoteId = response.data.id;
                        const copyProd: IQuotedProduct = {
                            id: 0,
                            quoteId: response.data.id,
                            productId: product.productId,
                            quantity: product.quantity,
                            quotedPrice: product.quotedPrice,
                            productCondition: product.productCondition,
                            comment: product.comment,
                        }
                        await requestAddQuotedProduct({
                            id: 0,
                            quoteId: response.data.id,
                            productId: product.productId,
                            quantity: product.quantity,
                            quotedPrice: product.quotedPrice,
                            productCondition: product.productCondition,
                            comment: product.comment,
                        });
                    });
                    setIsSaving(false);
                    props.getAllQuotes();
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
    }, []);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className={'modal-header'} closeButton>
                    <Modal.Title>
                        <h2 className={'modal-title'}>Create Quote</h2>
                        <p className={'modal-sub-title'}>Please enter quote information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form className="container d-grid" >
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <h3 style={{ fontWeight: 300 }}>Select Products</h3>
                                    <p style={{ fontWeight: 300 }}>
                                        First select a product, add the quote information, then click add quote when finished.
                                    </p>
                                </Form.Group>
                                <div className='d-flex justify-content-between'>
                                    <Form.Group className="mb-3">
                                        <div className='d-flex'>
                                            <div>
                                                <input type='text'
                                                    className="form-control custom-input"
                                                    placeholder="Search Product"
                                                    style={{ width: 200 }}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <div className='d-flex'>
                                        <div style={{ marginRight: 5 }}>
                                            <Form.Label style={{ display: 'flex' }}>Condition</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                value={condition}
                                                onChange={(e) => setCondition(e.target.value)}
                                            >
                                                <option>Condition</option>
                                                {
                                                    conditionList.map(condition => {
                                                        return (<option key={condition} value={condition}>{condition}</option>);
                                                    })
                                                }
                                            </Form.Select>
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <Form.Label style={{ display: 'flex' }}>Quantity</Form.Label>
                                            <input
                                                type='text'
                                                className="form-control custom-input"
                                                placeholder="QTY"
                                                style={{ width: 75 }}
                                                pattern='[0-9]*'
                                                value={quantity}
                                                onChange={(e) => {
                                                    if (!isNaN(Number(e.target.value))) {
                                                        setQuantity(Number(e.target.value))
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <Form.Label style={{ display: 'flex' }}>Price</Form.Label>
                                            <input type='text'
                                                className="form-control custom-input"
                                                placeholder="Price"
                                                style={{ width: 100 }}
                                                pattern='[0-9]\.*'
                                                value={price}
                                                onChange={(e) => {
                                                    if (!isNaN(Number(e.target.value))) {
                                                        setPrice(Number(e.target.value))
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    // Add quoted product to list
                                                    addQuotedProductToTable();
                                                }}
                                            >
                                                <Plus style={{ marginTop: -3, marginLeft: -10 }} />
                                                Add Quote
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <PaginationProvider
                                        pagination={paginationFactory(options)}
                                    >
                                        {
                                            ({
                                                paginationProps,
                                                paginationTableProps
                                            }) => (
                                                <div>
                                                    <BootstrapTable
                                                        key='product_table'
                                                        {...paginationTableProps}
                                                        keyField="id"
                                                        bootstrap4
                                                        condensed
                                                        data={products}
                                                        columns={column}
                                                        selectRow={selectRow}
                                                        classes="table table-dark table-hover table-striped table-responsive"
                                                        noDataIndication="Table is Empty"
                                                    />
                                                    <div className='d-flex justify-content-between'>
                                                        <SizePerPageDropdownStandalone
                                                            {...paginationProps}
                                                        />
                                                        <PaginationListStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </PaginationProvider>
                                </div>
                                <hr />
                                <br />
                                <div>
                                    <h3 style={{ fontWeight: 300 }}>Quoted Products</h3>
                                    <hr />
                                    <BootstrapTable
                                        keyField='id'
                                        data={quotedProducts}
                                        columns={column_inner}
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
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={() => {
                                saveQuote();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export const AddMultiQuoteModal = withRouter(AddMultiQuoteModalComponent);
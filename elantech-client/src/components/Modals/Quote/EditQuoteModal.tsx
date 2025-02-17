import React, { HTMLAttributes, FunctionComponent, useState, useEffect } from 'react';
import { Modal, Spinner, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IQuotedProduct from '../../../types/IQuotedProduct';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import ICompany from '../../../types/ICompany';
import IQuote from '../../../types/IQuote';
import { requestAllProductQuotesByQuoteId, requestAllProducts, requestUpdateQuoteAndQuotedProducts } from '../../../utils/Requests';
import { Plus, Search, Trash } from 'react-bootstrap-icons';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import { conditionList } from '../../../constants/Options';
import IProduct from '../../../types/IProduct';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { defaultAlert } from '../../../constants/Defaults';

interface EditQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedCompany: ICompany;
    selectedQuote: IQuote;
}

const EditQuoteModalComponent: FunctionComponent<EditQuoteModalProps> = (props) => {
    const [alert, setAlert] = useState(defaultAlert);
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [isSaving] = useState(false);
    const [totalQuote, setTotalQuote] = useState<number>(0);
    const [condition, setCondition] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [comment] = useState('');
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchString] = useState<string>('');
    const [isSearching] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({});
    const customTotal = (from: number, to: number, size: number) => {
        return (
            <span className="react-bootstrap-table-pagination-total"
                style={{ marginLeft: 5 }}>
                {size} Results
            </span>)
    };
    const options = {
        showTotal: true,
        paginationTotalRenderer: customTotal,
    };
    const selectRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct, isSelect: boolean) => {
            if (isSelect === true) {
                setSelectedProduct(row);
            }
        },
    };
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
    const handleSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        if (input !== undefined) {
            props.onSearch(input);
        }
    };
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
        {
            dataField: 'remove',
            text: 'Delete',
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
        },
    ];
    const product_column: ColumnDescription<any, any>[] = [
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
    const getAllProducts = async () => {
        setProducts(await requestAllProducts());
    };
    const addQuotedProductToTable = () => {
        if (JSON.stringify(selectedProduct) === '{}') {
            setAlert({ ...alert, label: 'Please select a product.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 5000);
        }
        else if (condition === '' || quantity === 0 || price === 0) {
            const errorMessage = JSON.stringify(selectedProduct) === '{}'
                ? 'Please select a product.'
                : condition === ''
                    ? 'Please select a condition.'
                    : quantity === 0
                        ? 'Please enter a quantity.'
                        : price === 0
                            ? 'Please enter a price.'
                            : '';
            setAlert({ ...alert, label: errorMessage, show: true });
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
            });
            if (!found) {
                const quotedProduct: IQuotedProduct = {
                    quoteId: props.selectedQuote.id as number,
                    productId: selectedProduct.id as number,
                    quantity: quantity,
                    quotedPrice: price,
                    productCondition: condition,
                    comment: comment,
                    product: {
                        productNumber: selectedProduct.productNumber || '',
                        productType: selectedProduct.productType || '',
                        brand: selectedProduct.brand || '',
                        description: selectedProduct.description || '',
                    },
                }
                quotedProducts.push(quotedProduct);
                setQuotedProducts(JSON.parse(JSON.stringify(quotedProducts)));
                setTotalQuote(totalQuote + price);
            }
        }
    };
    const finished = async () => {
        const quotedProductsCopy: IQuotedProduct[] = [];

        quotedProducts.forEach(product => {
            delete product.product;
            delete product.quote;
            quotedProductsCopy.push(product);
        });

        const quote: IQuote = {
            id: props.selectedQuote.id,
            companyId: props.selectedQuote.companyId,
            userId: props.selectedQuote.userId,
            dateQuoted: props.selectedQuote.dateQuoted,
            sold: props.selectedQuote.sold,
            quotedProducts: quotedProductsCopy,
        }
        await requestUpdateQuoteAndQuotedProducts(quote)
            .then(() => {
                props.onClose();

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        if (props.selectedQuote.id !== undefined) {
            getAllQuotedProducts(props.selectedQuote.id);
        }
        getAllProducts();
    }, [setProducts]);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Edit Quote</h2>
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
                                            <Form.Label style={{ fontWeight: 300 }}>Quoter: {props.selectedQuote?.user?.firstName} {props.selectedQuote?.user?.lastName}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Date: {props.selectedQuote.dateQuoted}</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Total Quote: ${totalQuote}</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                                <BootstrapTable
                                    bootstrap4
                                    condensed
                                    columns={column}
                                    keyField="id"
                                    data={quotedProducts}
                                    classes="table table-dark table-hover table-striped"
                                    noDataIndication="Table is Empty"
                                />
                                <hr />
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <h3 style={{ fontWeight: 300 }}>Add Products</h3>
                                    <p style={{ fontWeight: 300 }}>
                                        First select a product, add the quote information, then click add quote when finished.
                                    </p>
                                </Form.Group>
                                <div className='d-flex justify-content-between'>
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
                                    <ToolkitProvider
                                        keyField="id"
                                        data={products}
                                        columns={product_column}
                                        search >
                                        {
                                            props => {
                                                return (
                                                    <div>
                                                        {isSearching ?
                                                            <SpinnerBlock />
                                                            :
                                                            <div>
                                                                <InputGroup className="mb-3" style={{ width: 'max-content' }}>
                                                                    <InputGroup.Text id="basic-addon2">
                                                                        <Search />
                                                                    </InputGroup.Text>
                                                                    <DebounceInput
                                                                        type="text"
                                                                        className='debounce'
                                                                        placeholder="Search..."
                                                                        debounceTimeout={500}
                                                                        value={searchString}
                                                                        onChange={e => {
                                                                            handleSearch(e.target.value, { ...props.searchProps });
                                                                        }} />
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
                                                                    pagination={paginationFactory(options)}
                                                                    classes="table table-dark table-hover table-striped table-responsive"
                                                                    noDataIndication="Table is Empty"
                                                                />
                                                            </div>
                                                        }
                                                    </div>
                                                );
                                            }
                                        }
                                    </ToolkitProvider>
                                </div>

                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                finished();
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

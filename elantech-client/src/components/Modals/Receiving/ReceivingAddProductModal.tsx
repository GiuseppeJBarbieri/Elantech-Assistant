import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, Container, InputGroup } from 'react-bootstrap';
import { Search, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { defaultAlert, defaultReceivedItem } from '../../../constants/Defaults';
import IProduct from '../../../types/IProduct';
import IReceivedItem from '../../../types/IReceivedItem';
import { requestAddReceivedItems, requestAllProducts } from '../../../utils/Requests';
import IReceiving from '../../../types/IReceiving';

interface ReceivingAddProductModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    receivingOrder: IReceiving;
    onClose: () => Promise<void>;
    modalVisible: boolean;
    getAllReceiving: () => void;
}

const ReceivingAddProductModalComponent: FunctionComponent<ReceivingAddProductModalProps> = (props) => {
    const [productSectionAlert, setProductSectionAlert] = useState(defaultAlert);
    const [isSaving, setIsSaving] = useState(false);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [isSearching] = useState(false);
    const [searchProductString, setSearchProductString] = useState<string>('');
    const [receivedItemState, setReceivedItemState] = useState<IReceivedItem>(defaultReceivedItem);
    const [orderList, setOrderList] = useState<IReceivedItem[]>([]);
    const [mainAlert, setMainAlert] = useState(defaultAlert);
    const selectProductRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct) => {
            setReceivedItemState({ ...receivedItemState, productId: row.id as number, product: row });
        },
    };
    const options = {
        productOptions: {
            custom: true,
            totalSize: productList.length
        }
    };
    const rankFormatterRemove = (cell: any, row: IReceivedItem) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div
                    onClick={() => {
                        // Only remove the item with the exact id
                        setOrderList(prev => prev.filter(order => order.id === undefined ? true : order.id !== row.id));
                    }}
                >
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const productColumn = [
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
            dataField: 'altNumber4',
            text: 'Alt 4',
            sort: true,
        },
        {
            dataField: 'altNumber5',
            text: 'Alt 5',
            sort: true,
        },
        {
            dataField: 'altNumber6',
            text: 'Alt 6',
            sort: true,
        },
        {
            text: 'Type',
            dataField: 'productType',
            sort: true,
            headerAlign: 'center',
        },
        {
            text: 'Brand',
            dataField: 'brand',
            headerAlign: 'center',
            sort: true,
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false,
        },
    ];
    const selectedProductColumn: ColumnDescription<any, any>[] = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'cud',
            text: 'Condition',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'product.productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            text: 'Type',
            dataField: 'product.productType',
            sort: true,
            headerAlign: 'center',
        },
        {
            text: 'Brand',
            dataField: 'product.brand',
            headerAlign: 'center',
            sort: true,
        },
        {
            dataField: 'comment',
            text: 'Comments',
            sort: false,
        },
        {
            dataField: 'remove',
            text: 'Delete',
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
    ];
    const handleProductSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchProductString(input);
        props.onSearch(input);
    };
    const requestAllData = async () => {
        setProductList(await requestAllProducts());
    };
    const addProductToOrder = async () => {
        // Validate seller information section
        let isEmpty = false;
        if (receivedItemState.quantity === 0) isEmpty = true;

        // A product must be selected
        if (!receivedItemState.product?.id) isEmpty = true;

        if (isEmpty) {
            setProductSectionAlert({ ...mainAlert, label: 'Please enter required product information.', show: true });
            setTimeout(() => setProductSectionAlert({ ...mainAlert, show: false }), 5000);
            return;
        }

        // Add item to orderList
        orderList.push(
            {
                ...receivedItemState,
                id: Math.floor(Math.random() * 10000),
                receivingId: props.receivingOrder.id as number,
            }
        );
        setOrderList(JSON.parse(JSON.stringify(orderList)));
        // clear receivedState form
        setReceivedItemState({ ...receivedItemState, quantity: 0, cud: '', comment: '' });
    };
    const onSubmit = () => {
        console.log(orderList);
        setIsSaving(true);
        if (orderList.length === 0) {
            setIsSaving(false);
            setMainAlert({ ...mainAlert, label: 'Please add at least one product to the order before finishing.', show: true });
        } else {
            setTimeout(async () => {
                try {
                    // Add receiving order list into the database
                    await requestAddReceivedItems(orderList);

                    // Hide modal
                    setIsSaving(false);

                    // Refresh parent page
                    props.getAllReceiving();

                    // Invoke given close event handler
                    props.onClose();
                } catch (err) {
                    setMainAlert({ ...mainAlert, label: `${err}`, show: true });
                    setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 3000);
                    setIsSaving(false);
                }
            }, 500);
        }
    };
    useEffect(() => {
        requestAllData();
    }, []);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header
                    style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }}
                    closeButton
                >
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Add Products to Received Order</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>
                            Please add order information.
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' >
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
                            <Form className="d-grid" >
                                <CustomAlert label={mainAlert.label} type={mainAlert.type} showAlert={mainAlert.show} />
                                {/* Product Information Block */}
                                <>
                                    <div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Product Information</h3>
                                        </div>
                                        <hr />
                                        <CustomAlert label={productSectionAlert.label} type={productSectionAlert.type} showAlert={productSectionAlert.show} />
                                    </div>
                                    <Container>
                                        <p
                                            style={{ fontWeight: 300 }}
                                        >
                                            <span className={'required-text-asterisk'}>* </span>
                                            Enter in the info below. Then select a product from the table. Click submit when your finished.
                                        </p>
                                        <ToolkitProvider
                                            keyField="id"
                                            data={productList}
                                            columns={productColumn}
                                            search
                                        >
                                            {
                                                props => {
                                                    return (
                                                        <div>
                                                            {isSearching ?
                                                                <SpinnerBlock />
                                                                :
                                                                <div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className="d-flex" style={{ gap: '10px' }}>
                                                                            <Form.Group>
                                                                                <InputGroup className="mb-3">
                                                                                    <InputGroup.Text id="basic-addon2">
                                                                                        <Search />
                                                                                    </InputGroup.Text>
                                                                                    <DebounceInput
                                                                                        type="text"
                                                                                        className='debounce'
                                                                                        placeholder="Search..."
                                                                                        debounceTimeout={500}
                                                                                        value={searchProductString}
                                                                                        onChange={e => {
                                                                                            handleProductSearch(e.target.value, { ...props.searchProps });
                                                                                        }} />
                                                                                </InputGroup>
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-4">
                                                                                <Form.Control id="quantity" type="number" placeholder="Quantity"
                                                                                    value={receivedItemState.quantity}
                                                                                    onChange={(e) => {
                                                                                        setReceivedItemState({ ...receivedItemState, quantity: Number(e.target.value) });
                                                                                    }} />
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-3">
                                                                                <Form.Select aria-label="Default select example"
                                                                                    value={receivedItemState.cud}
                                                                                    onChange={(e) => {
                                                                                        setReceivedItemState({ ...receivedItemState, cud: e.target.value })
                                                                                    }}>
                                                                                    <option>Choose Condition</option>
                                                                                    <option value="New_Factory_Sealed">New Factory Sealed</option>
                                                                                    <option value="New_Opened_Box">New Opened Box</option>
                                                                                    <option value="Renew">Renew</option>
                                                                                    <option value="Used">Used</option>
                                                                                    <option value="Damaged">Damaged</option>
                                                                                </Form.Select>
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-1">
                                                                                <Form.Control id="comment" placeholder="Comments"
                                                                                    value={receivedItemState.comment}
                                                                                    onChange={(e) => {
                                                                                        setReceivedItemState({ ...receivedItemState, comment: e.target.value })
                                                                                    }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                        <div style={{ float: 'right' }}>
                                                                            <Form.Group className="mb-3">
                                                                                <Button variant="secondary" onClick={addProductToOrder}>Submit</Button>
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>

                                                                    <BootstrapTable
                                                                        {...props.baseProps}
                                                                        bootstrap4
                                                                        striped
                                                                        hover
                                                                        selectRow={selectProductRow}
                                                                        noDataIndication='TABLE IS EMPTY'
                                                                        pagination={paginationFactory(options.productOptions)}
                                                                        filter={filterFactory()}
                                                                        classes="table table-dark table-hover table-striped table-responsive"
                                                                    />
                                                                </div>}
                                                        </div>
                                                    );
                                                }
                                            }
                                        </ToolkitProvider>
                                    </Container>

                                </>
                                {/* Products In Order Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Products in Order</h3>
                                        </div>
                                        <hr />
                                    </div>

                                    <Container>
                                        <p
                                            style={{ fontWeight: 300 }}
                                        >
                                            <span className={'required-text-asterisk'}>* </span>
                                            Review all products below.
                                        </p>
                                        <BootstrapTable
                                            keyField="id"
                                            data={orderList}
                                            columns={selectedProductColumn}
                                            bootstrap4
                                            classes="table table-dark table-hover table-striped"
                                            noDataIndication="Table is Empty"
                                        />
                                    </Container>

                                </>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={onSubmit}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export const ReceivingAddProductModal = withRouter(ReceivingAddProductModalComponent);
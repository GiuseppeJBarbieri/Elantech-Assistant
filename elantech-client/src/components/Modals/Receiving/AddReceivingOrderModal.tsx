import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, Row, Col, Container, Collapse, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../../types/ICompany';
import { RequestAddReceivingOrder, requestAllCompanies, requestAllProducts } from '../../../utils/Requests';
import IProduct from '../../../types/IProduct';
import moment from 'moment';
import { Search } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { defaultAlert, defaultReceivedItem, defaultReceiving } from '../../../constants/Defaults';
import IReceiving from '../../../types/IReceiving';
import IReceivedItem from '../../../types/IReceivedItem';
import { CustomAlert } from '../../Alerts/CustomAlert';

interface AddReceivingOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getAllReceiving: () => void;
}

const AddReceivingOrderModalComponent: FunctionComponent<AddReceivingOrderModalProps> = (props) => {
	const [mainAlert, setMainAlert] = useState(defaultAlert);
    const [productSectionAlert, setProductSectionAlert] = useState(defaultAlert);
    const [isSaving, setIsSaving] = useState(false);
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [isSearching] = useState(false);
    const [searchCompanyString, setSearchCompanyString] = useState<string>('');
    const [searchProductString, setSearchProductString] = useState<string>('');
    
    const [receivingOrderState, setReceivingOrderState] = useState<IReceiving>(defaultReceiving);
    const [receivedItemState, setReceivedItemState] = useState<IReceivedItem>(defaultReceivedItem);
    const [orderList, setOrderList] = useState<IReceivedItem[]>([]);
    
    const [expanderState, setExpanderState] = useState({
        orderInfoExpander: true,
        sellerInfoExpander: false,
        productInfoExpander: false,
        productsInOrderExpander: false,
    });
    const companyColumn = [
        {
            id: 1,
            dataField: 'type',
            text: 'Type',
            sort: true,
        },
        {
            id: 2,
            dataField: 'name',
            text: 'Company Name',
            sort: true,
        },
        {
            id: 3,
            dataField: 'representative',
            text: 'Company Rep',
            sort: true,
        },
        {
            id: 4,
            dataField: 'phone',
            text: 'Phone Number',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 5,
            dataField: 'email',
            text: 'Email',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 6,
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            id: 7,
            dataField: 'comment',
            text: 'Comments',
            sort: false,
        },
    ];
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
    const selectedProductColumn = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'condition',
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
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
    ]
    const options = {
        productOptions: {
            custom: true,
            totalSize: productList.length
        },
        companyOptions: {
            custom: true,
            totalSize: companyList.length
        }
    };
    const selectProductRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct) => {
            setReceivedItemState({ ...receivedItemState, productId: row.id as number, product: row});
        },
    };
    const selectCompanyRow: SelectRowProps<ICompany> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: ICompany) => {
            setReceivingOrderState({ ...receivingOrderState, companyId: row.id as number });
        },
    };
    const requestAllData = async () => {
        setCompanyList(await requestAllCompanies());
        setProductList(await requestAllProducts());
    };
    const handleCompanySearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchCompanyString(input);
        props.onSearch(input);
    };
    const handleProductSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchProductString(input);
        props.onSearch(input);
    };
    const validateForm = (): boolean => {
        let isEmpty = false;
        if (receivingOrderState.purchaseOrderNumber === '') isEmpty = true;
        if (receivingOrderState.trackingNumber === '') isEmpty = true;
        if (receivingOrderState.orderType === '') isEmpty = true;
        if (receivingOrderState.shippedVia === '') isEmpty = true;

        // A seller must be selected
        if (receivingOrderState.companyId === 0) isEmpty = true;

        // At least ONE product must be created
        if (orderList.length < 1) isEmpty = true;

		if (isEmpty) {
			setMainAlert({ ...mainAlert, label: 'Please enter required information.', show: true });
			setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
			return false;
		}

		return true;
    };
    const addProductToOrder = async () => {
        // Validate form
        // quantity not empty, seller selected, product selected
        let isEmpty = false;
        if (receivedItemState.quantity) isEmpty = true;

        // A seller must be selected
        if (receivingOrderState.companyId === 0) isEmpty = true;

        // At least ONE product must be created
        if (orderList.length < 1) isEmpty = true;

		if (isEmpty) {
			setProductSectionAlert({ ...mainAlert, label: 'Please enter required product information.', show: true });
			setTimeout(() => setProductSectionAlert({ ...mainAlert, show: false }), 5000);
			return;
		}
        
        setReceivingOrderState({
            ...receivingOrderState,
            receivedItems: [...orderList, receivedItemState],
        });

        // Add item to orderList
        setOrderList((prev) => [...prev, { ...receivedItemState }]);

        // clear receivedState form
        setReceivedItemState({...receivedItemState, quantity: 0, cud: '', comment: ''});
    };
	const onSubmit = async () => {
        if (!validateForm()) return
        
		setIsSaving(true);
		setTimeout(async () => {
			try {
                // Add receiving order into the database
                await RequestAddReceivingOrder(receivingOrderState);

                // Refresh parent page
				props.getAllReceiving && await props.getAllReceiving();

                // Hide modal
                setIsSaving(false);

                // Invoke given close event handler
				props.onClose && await props.onClose();
			} catch (err) {
				setMainAlert({ ...mainAlert, label: `${err}`, show: true });
				setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 3000);
				setIsSaving(false);
			}
		}, 500);
	};
    useEffect(() => {
        requestAllData();
    }, []);
    return (
        <div>
            <Modal backdrop="static" show onHide={props.onClose} fullscreen={true}>
                <Modal.Header
                    style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }}
                    closeButton
                >
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Receiving Order</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>
                            Please enter order information.
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
                            <Form className="d-grid">
                                <CustomAlert label={mainAlert.label} type={mainAlert.type} showAlert={mainAlert.show} />
                                {/* Order Information Block */}
                                <>
                                    <div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Order Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, orderInfoExpander: !expanderState.orderInfoExpander })
                                                }}>{expanderState.orderInfoExpander ? '^' : 'V'}</Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.orderInfoExpander}>
                                        <Container>
                                            <p style={{ fontWeight: 300 }}> Please enter all information below, as it is required.</p>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>
                                                            PO Number
                                                            <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                                        </Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="PO Number" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, purchaseOrderNumber: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label
                                                            style={{ fontWeight: 300 }}
                                                        >
                                                            Order Type
                                                            <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                                        </Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, orderType: e.target.value })}>
                                                            <option>Choose Order Type</option>
                                                            <option value="Order">Order</option>
                                                            <option value="RMA">RMA</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label
                                                            style={{ fontWeight: 300 }}
                                                        >
                                                            Date Received
                                                            <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                                        </Form.Label>
                                                        <Form.Control id="dateReceived" type="date"
                                                            value={`${moment(receivingOrderState.dateReceived).format('YYYY-MM-DD')}`}
                                                            onChange={(e) => {;
                                                                setReceivingOrderState({
                                                                    ...receivingOrderState,
                                                                    dateReceived: new Date(e.target.value),
                                                                });
                                                            }} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label
                                                            style={{ fontWeight: 300 }}
                                                        >
                                                            Tracking Number
                                                            <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                                        </Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="PO Number" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, trackingNumber: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label
                                                            style={{ fontWeight: 300 }}
                                                        >
                                                            Shipped Via
                                                            <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                                        </Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, shippedVia: e.target.value })}>
                                                            <option>Choose Order Type</option>
                                                            <option value="DHL">DHL</option>
                                                            <option value="FedEx">FedEx</option>
                                                            <option value="UPS">UPS</option>
                                                            <option value="USPS">USPS</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ fontWeight: 300 }}>Comments</Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="Comments" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, comment: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>

                                </>
                                {/* Seller Information Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Seller Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, sellerInfoExpander: !expanderState.sellerInfoExpander })
                                                }}>
                                                {expanderState.sellerInfoExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.sellerInfoExpander}>
                                        <Container>
                                            {/* TODO Search Functionality of Quote Table */}
                                            <p
                                                style={{ fontWeight: 300 }}
                                            >
                                                <span className={'required-text-asterisk'}>* </span>
                                                Please select a seller from the table below. Hit the select button when finished.
                                            </p>
                                            {/* <Form.Group className="mb-3" style={{ marginRight: 5, width: '150px' }}>
                                                <Form.Control id="comments" type="text" placeholder="Search" />
                                            </Form.Group> */}
                                            <ToolkitProvider
                                                keyField="id"
                                                data={companyList}
                                                columns={companyColumn}
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
                                                                            <div className='d-flex justify-space-between'>
                                                                                <InputGroup className="mb-3">
                                                                                    <InputGroup.Text id="basic-addon2">
                                                                                        <Search />
                                                                                    </InputGroup.Text>
                                                                                    <DebounceInput
                                                                                        type="text"
                                                                                        className='debounce'
                                                                                        placeholder="Search..."
                                                                                        debounceTimeout={500}
                                                                                        value={searchCompanyString}
                                                                                        onChange={e => {
                                                                                            handleCompanySearch(e.target.value, { ...props.searchProps });
                                                                                        }} />
                                                                                </InputGroup>
                                                                            </div>
                                                                        </div>
                                                                        <BootstrapTable
                                                                            {...props.baseProps}
                                                                            bootstrap4
                                                                            striped
                                                                            hover
                                                                            selectRow={selectCompanyRow}
                                                                            noDataIndication='TABLE IS EMPTY'
                                                                            pagination={paginationFactory(options.companyOptions)}
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
                                    </Collapse>
                                </>
                                {/* Product Information Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Product Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, productInfoExpander: !expanderState.productInfoExpander })
                                                }}>
                                                {expanderState.productInfoExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                        <CustomAlert label={productSectionAlert.label} type={productSectionAlert.type} showAlert={productSectionAlert.show} />
                                    </div>
                                    <Collapse in={expanderState.productInfoExpander}>
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
                                                                                        onChange={(e) => {
                                                                                            setReceivedItemState({ ...receivedItemState, quantity: Number(e.target.value) });
                                                                                        }} />
                                                                                </Form.Group>
                                                                                <Form.Group className="mb-3">
                                                                                    <Form.Select aria-label="Default select example"
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
                                    </Collapse>
                                </>
                                {/* Products In Order Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Products in Order</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, productsInOrderExpander: !expanderState.productsInOrderExpander })
                                                }}>
                                                {expanderState.productsInOrderExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.productsInOrderExpander}>
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
                                    </Collapse>
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

export const AddReceivingOrderModal = withRouter(AddReceivingOrderModalComponent);
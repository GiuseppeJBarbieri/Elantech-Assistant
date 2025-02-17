import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, Collapse, Container, InputGroup } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IReceiving from '../../../types/IReceiving';
import moment from 'moment';
import { Search } from 'react-bootstrap-icons';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import ICompany from '../../../types/ICompany';
import { requestAllCompanies } from '../../../utils/Requests';
import { defaultReceiving } from '../../../constants/Defaults';

interface EditReceivingOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getAllReceiving: () => void;
    selectedReceiving: IReceiving;
}

// TODO:SC - Add "cancel edit" confirmation dialog

const EditReceivingOrderModalComponent: FunctionComponent<EditReceivingOrderModalProps> = ({ getAllReceiving, selectedReceiving, onClose }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [searchCompanyString, setSearchCompanyString] = useState<string>('');
    const [receivingOrderState, setReceivingOrderState] = useState<IReceiving>(defaultReceiving);

    useEffect(() => {
        // Auto-expand serller information section
        setExpanderState((prev) => {
            const prevExpanderState = {...prev};

            prevExpanderState.sellerInfoExpander = true;

            return prevExpanderState;
        })

        // Retrieve seller information table data
        requestAllCompanies()
        .then((companies) => {
            setCompanyList(companies);
            setIsSearching(false);
        })
        .catch((err) => {
            console.log('Could not retrieve companies!');
        });
    }, []);

    const [expanderState, setExpanderState] = useState({
        sellerInfoExpander: false,
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
    const options = {
        companyOptions: {
            custom: true,
            totalSize: companyList.length
        }
    };
    const selectCompanyRow: SelectRowProps<ICompany> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: ICompany) => {
            setReceivingOrderState({ ...receivingOrderState, companyId: row.id as number });
        },
    };

    const handleCompanySearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchCompanyString(input);
        props.onSearch(input);
    };

    const validateForm = () => {
        // TODO:SC - form validation
        // PO Number: string!
        // Purchased From: list!
        // Order Type: select!
        // Tracking Number: string!
        // Shipped Via: select!
        // Date Received: date!
        // Comments: string?

        let isEmpty = false;
        if (receivingOrderState.purchaseOrderNumber === '') isEmpty = true;
        if (receivingOrderState.trackingNumber === '') isEmpty = true;
        if (receivingOrderState.orderType === '') isEmpty = true;
        if (receivingOrderState.shippedVia === '') isEmpty = true;

        // A seller must be selected
        if (receivingOrderState.companyId === 0) isEmpty = true;

        // At least ONE product must be created
        // if (orderList.length < 1) isEmpty = true;

        // TODO-SC: Alert when form can not validate
		// if (isEmpty) {
		// 	setMainAlert({ ...mainAlert, label: 'Please enter required information.', show: true });
		// 	setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
		// 	return false;
		// }

		return true;
    };

    const onSubmit = () => {
        if (!validateForm()) return

        // setIsSaving(true);
        // setTimeout(async () => {
        //     try {
        //         // Add receiving order into the database
        //         await RequestAddReceivingOrder(receivingOrderState);

        //         // Refresh parent page
        //         props.getAllReceiving && await props.getAllReceiving();

        //         // Hide modal
        //         setIsSaving(false);

        //         // Invoke given close event handler
        //         props.onClose && await props.onClose();
        //     } catch (err) {
        //         setMainAlert({ ...mainAlert, label: `${err}`, show: true });
        //         setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 3000);
        //         setIsSaving(false);
        //     }
        // }, 500);
    };

    return (
        <div>
            <Modal backdrop="static" show onHide={onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }}>Edit Order Information</h2>
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
                            <Form className="container d-grid">
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        PO Number
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Control
                                        type="text" placeholder="PO Number" value={selectedReceiving.purchaseOrderNumber}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Order Type
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={selectedReceiving.orderType}
                                    >
                                        <option>Order Type</option>
                                        <option value="Order">Order</option>
                                        <option value="RMA">RMA</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Tracking Number
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tracking Number"
                                        value={selectedReceiving.trackingNumber}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Shipped Via
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={selectedReceiving.shippedVia}
                                    >
                                        <option>Shipped Via</option>
                                        <option value="DHL">DHL</option>
                                        <option value="FedEx">FedEx</option>
                                        <option value="UPS">UPS</option>
                                        <option value="USPS">USPS</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Date Received
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="date"
                                        placeholder="Date Received"
                                        value={moment(selectedReceiving.dateReceived).format('YYYY-MM-DD')}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="timeFrame" type="text" placeholder="Comments" value={selectedReceiving.comment} />
                                </Form.Group>

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
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={onSubmit}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditReceivingOrderModal = withRouter(EditReceivingOrderModalComponent);

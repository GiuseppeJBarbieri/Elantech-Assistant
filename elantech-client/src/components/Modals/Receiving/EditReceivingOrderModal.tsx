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
import { requestAllCompanies, RequestUpdateReceivingOrder } from '../../../utils/Requests';
import { defaultAlert } from '../../../constants/Defaults';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { UnsavedChangesModal } from '../../Alerts/UnsavedChangesModal';

interface EditReceivingOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getAllReceiving: () => void;
    selectedReceiving: IReceiving;
}

const EditReceivingOrderModalComponent: FunctionComponent<EditReceivingOrderModalProps> = ({ getAllReceiving, selectedReceiving, onClose }) => {
    const [unsavedModalVisible, setUnsavedModalVisible] = useState(false);
    const [mainAlert, setMainAlert] = useState(defaultAlert);
    const [isSaving, setIsSaving] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [searchCompanyString, setSearchCompanyString] = useState<string>('');
    const [receivingOrderState, setReceivingOrderState] = useState<IReceiving>({...selectedReceiving});

    useEffect(() => {
        // Auto-expand company information section
        setExpanderState((prev) => {
            const prevExpanderState = {...prev};

            prevExpanderState.sellerInfoExpander = true;

            return prevExpanderState;
        })

        // Retrieve seller information table data
        requestAllCompanies()
        .then((companies) => {
            // TODO:TEMP - Auto-select the apropriate company
            const index = companies.findIndex((company) => company.id === receivingOrderState.companyId);

            // Update company table with data
            setCompanyList(companies);

            // Display company table
            setIsSearching(false);

            // TODO:TEMP - Auto-select the apropriate company
            const companyRows = document.querySelectorAll('td.selection-cell');
            if (companyRows.length >= index) (companyRows[index] as HTMLElement).click();
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
        let isEmpty = false;
        if (receivingOrderState.purchaseOrderNumber === '') isEmpty = true;
        if (receivingOrderState.trackingNumber === '') isEmpty = true;
        if (receivingOrderState.orderType === '') isEmpty = true;
        if (receivingOrderState.shippedVia === '') isEmpty = true;
        if (receivingOrderState.companyId === 0) isEmpty = true;

        // Alert when form can not validate
		if (isEmpty) {
			setMainAlert({ ...mainAlert, label: 'Please enter required information.', show: true });
			setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
			return false;
		}

        let changeDetected = false;
        if (receivingOrderState.purchaseOrderNumber !== selectedReceiving.purchaseOrderNumber) changeDetected = true;
        if (receivingOrderState.trackingNumber !== selectedReceiving.trackingNumber) changeDetected = true;
        if (receivingOrderState.orderType !== selectedReceiving.orderType) changeDetected = true;
        if (receivingOrderState.shippedVia !== selectedReceiving.shippedVia) changeDetected = true;
        if (receivingOrderState.companyId !== selectedReceiving.companyId) changeDetected = true;
        if (receivingOrderState.comment !== selectedReceiving.comment) changeDetected = true;

        // Alert when form can not validate
        if (!changeDetected) {
            setMainAlert({ ...mainAlert, label: 'No changed detected! Please enter new information.', show: true });
			setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 5000);
			return false;
        }

		return true;
    };

    const onSubmit = () => {
        if (!validateForm()) return

        setIsSaving(true);
        setTimeout(async () => {
            try {
                // Add receiving order into the database
                await RequestUpdateReceivingOrder(receivingOrderState);

                // Refresh parent page
                getAllReceiving && await getAllReceiving();

                // Hide modal
                setIsSaving(false);

                // Invoke given close event handler
                onClose && onClose();
            } catch (err) {
                setMainAlert({ ...mainAlert, label: `${err}`, show: true });
                setTimeout(() => setMainAlert({ ...mainAlert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
    };

    const onCloseModal = () => {
        // Check for any unsaved changes
        let changeDetected = false;
        if (receivingOrderState.purchaseOrderNumber !== selectedReceiving.purchaseOrderNumber) changeDetected = true;
        if (receivingOrderState.trackingNumber !== selectedReceiving.trackingNumber) changeDetected = true;
        if (receivingOrderState.orderType !== selectedReceiving.orderType) changeDetected = true;
        if (receivingOrderState.shippedVia !== selectedReceiving.shippedVia) changeDetected = true;
        if (receivingOrderState.companyId !== selectedReceiving.companyId) changeDetected = true;

        // Alert when form can not validate
        if (changeDetected) {
            setUnsavedModalVisible(true);
			return;
        }

        onClose && onClose();
    };

    return (
        <div>
            <Modal backdrop="static" show onHide={onCloseModal} fullscreen={true}>
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
                                <CustomAlert label={mainAlert.label} type={mainAlert.type} showAlert={mainAlert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        PO Number
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="PO Number"
                                        value={receivingOrderState.purchaseOrderNumber}
                                        onChange={(e) => setReceivingOrderState({ ...receivingOrderState, purchaseOrderNumber: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Order Type
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={receivingOrderState.orderType}
                                        onChange={(e) => setReceivingOrderState({ ...receivingOrderState, orderType: e.target.value })}
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
                                        value={receivingOrderState.trackingNumber}
                                        onChange={(e) => setReceivingOrderState({ ...receivingOrderState, trackingNumber: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Shipped Via
                                        <Form.Label className={'required-text-asterisk'}>*</Form.Label>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={receivingOrderState.shippedVia}
                                        onChange={(e) => setReceivingOrderState({ ...receivingOrderState, shippedVia: e.target.value })}
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
                                        value={moment(receivingOrderState.dateReceived).format('YYYY-MM-DD')}
                                        onChange={(e) => {
                                            setReceivingOrderState({
                                                ...receivingOrderState,
                                                dateReceived: new Date(e.target.value),
                                            });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="timeFrame"
                                        type="text"
                                        placeholder="Comments"
                                        value={receivingOrderState.comment}
                                        onChange={(e) => setReceivingOrderState({ ...receivingOrderState, comment: e.target.value })}
                                    />
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

            {/* Unsaved changes confirmation modal */}
            {
                unsavedModalVisible &&
                <UnsavedChangesModal
                    onLeave={() => {setUnsavedModalVisible(false); onClose && onClose(); }}
                    onStay={() => {setUnsavedModalVisible(false)}}
                />
            }
        </div>
    );
};

export const EditReceivingOrderModal = withRouter(EditReceivingOrderModalComponent);

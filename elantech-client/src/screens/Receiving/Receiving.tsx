import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Pencil, Plus } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
// import { useNavigate } from 'react-router-dom';
import AddReceivingOrderModal from '../../components/Modals/Receiving/AddReceivingOrderModal';
import EditReceivingOrderModal from '../../components/Modals/Receiving/EditReceivingOrderModal';
import ExpandedReceivingRow from '../../components/ExpandedReceivingRow/ExpandedReceivingRow';

export const ReceivingLayout: FunctionComponent = () => {
    // const navigate = useNavigate();
    const [addReceivingSwitch, setAddReceivingSwitch] = useState(false);
    const [editOrderSwitch, setEditOrderSwitch] = useState(false);

    const rankFormatterEdit = () => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={() => {
                    setEditOrderSwitch(true);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column: ColumnDescription[] = [
        {
            dataField: 'po_number',
            text: 'PO Number',
            sort: true,
        },
        {
            dataField: 'purchased_from',
            text: 'Purchased From',
            sort: false,
        },
        {
            dataField: 'received_by',
            text: 'Received By',
            sort: false,
        },
        {
            dataField: 'order_type',
            text: 'Order Type',
            sort: false,
        },
        {
            dataField: 'tracking_number',
            text: 'Tracking Number',
            sort: false,
        },
        {
            dataField: 'shipped_via',
            text: 'Shipped Via',
            sort: false,
        },
        {
            dataField: 'date_received',
            text: 'Date Received',
            sort: false,
        },
        {
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
        {
            dataField: 'completed',
            text: 'Completed',
            sort: false,
        },

        {
            dataField: 'edit',
            text: 'Edit',
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
    ];
    const fake_data = [
        {
            order_id: 1,
            po_number: '93847562',
            date_received: '2022-04-15',
            purchased_from: 'Tech Solutions',
            received_by: 'Sophia',
            comments: 'Updated comments!',
            completed: false,
            shipped_via: 'FedEx',
            tracking_number: '782910463728194738',
            order_type: 'Exchange'
        },
        {
            order_id: 2,
            po_number: '56473829',
            date_received: '2022-05-22',
            purchased_from: 'Electro World',
            received_by: 'Alex',
            comments: 'Revised comments!',
            completed: false,
            shipped_via: 'DHL',
            tracking_number: '495671023847563829',
            order_type: 'Repair'
        },
        {
            order_id: 3,
            po_number: '10928374',
            date_received: '2022-06-10',
            purchased_from: 'Gadget Galaxy',
            received_by: 'Emma',
            comments: 'Updated information!',
            completed: true,
            shipped_via: 'USPS',
            tracking_number: '612345678901234567',
            order_type: 'Return'
        },
        {
            order_id: 4,
            po_number: '87509212',
            date_received: '2022-07-05',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'New comments here!',
            completed: true,
            shipped_via: 'UPS',
            tracking_number: '345678901234567890',
            order_type: 'RMA'
        }
    ];
    const options = {
        custom: true,
        totalSize: fake_data.length
    };
    return (
        <section className="text-white main-section overflow-auto">
            <div style={{ padding: 20 }}>
                <div className='d-flex justify-content-between'>
                    <h2 style={{ fontWeight: 300 }}>Receiving</h2>
                    <div>
                        <Button variant="dark" onClick={() => { setAddReceivingSwitch(true) }} >
                            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Order
                        </Button>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                    <input type='text'
                        className="form-control custom-input"
                        placeholder="Search by PO Number"
                        style={{ width: 200 }}
                    />
                    <div className='d-flex'>
                        <DropdownButton
                            key={'dark'}
                            variant="dark"
                            menuVariant="dark"
                            title={'Search History '}
                        >
                            <Dropdown.Item eventKey="1">---------</Dropdown.Item>
                            <Dropdown.Item eventKey="2">---------</Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>---------</Dropdown.Item>
                            <Dropdown.Item eventKey="4">---------</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <br />
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
                                        keyField="order_id"
                                        bootstrap4
                                        data={fake_data}
                                        columns={column}
                                        classes="table table-dark table-hover table-striped table-responsive"
                                        noDataIndication="Table is Empty"
                                        expandRow={{
                                            onlyOneExpanding: true,
                                            renderer: () => {
                                                return (
                                                    <ExpandedReceivingRow />
                                                )
                                            }
                                        }}
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
            </div>
            {
                addReceivingSwitch &&
                <div className='modal-dialog'>
                    <AddReceivingOrderModal
                        modalVisible={addReceivingSwitch}
                        onClose={async () => {
                            setAddReceivingSwitch(false);
                        }}
                    />
                </div>
            }
            {
                editOrderSwitch &&
                <div className='modal-dialog'>
                    <EditReceivingOrderModal
                        modalVisible={editOrderSwitch}
                        onClose={async () => {
                            setEditOrderSwitch(false);
                        }}
                    />
                </div>
            }
        </section >
    );
};

export default ReceivingLayout;

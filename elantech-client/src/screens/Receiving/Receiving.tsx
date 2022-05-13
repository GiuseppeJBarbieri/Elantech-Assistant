import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Pencil, Plus } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AddReceivingOrderModal } from '../../components/AddReceivingOrderModal/AddReceivingOrderModal';
import { EditReceivingOrderModal } from '../../components/EditReceivingOrderModal/EditReceivingOrderModal';
import { ExpandedReceivingRow } from '../../components/ExpandedReceivingRow/ExpandedReceivingRow';

interface ReceivingProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const ReceivingLayout: FunctionComponent<ReceivingProps> = ({ history }) => {
    const [addReceivingSwitch, setAddReceivingSwitch] = useState(false);
    const [editOrderSwitch, setEditOrderSwitch] = useState(false);

    const rankFormatterEdit = (_: any, data: any, index: any) => {
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
                <div onClick={(e) => {
                    setEditOrderSwitch(true);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column = [
        {
            id: 1,
            dataField: "po_number",
            text: "PO Number",
            sort: true,
        },
        {
            id: 2,
            dataField: "purchased_from",
            text: "Purchased From",
            sort: false,
        },
        {
            id: 3,
            dataField: "date_received",
            text: "Date",
            sort: false,
        },
        {
            id: 4,
            dataField: "received_by",
            text: "Received By",
            sort: false,
        },
        {
            id: 5,
            dataField: "comments",
            text: "Comments",
            sort: false,
        },
        {
            id: 6,
            dataField: "added_to_inventory",
            text: "Completed",
            sort: false,
        },
        {
            id: 7,
            dataField: "edit",
            text: "Edit",
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
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
        {
            order_id: 2,
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
        {
            order_id: 3,
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
        {
            order_id: 4,
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
        {
            order_id: 5,
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
        {
            order_id: 6,
            po_number: '87509212',
            date_received: '2022-03-07',
            purchased_from: 'Service Express',
            received_by: 'Giuseppe',
            comments: 'Nothing to be said!',
            added_to_inventory: 'Yes',
        },
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
                                            renderer: (row, index) => {
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

export const Receiving = withRouter(ReceivingLayout);

/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import AddOutgoingOrderModal from '../../components/Modals/Outgoing/AddOutgoingOrderModel';
import ExpandedOutgoingRow from '../../components/ExpandedOutgoingRow/ExpandedOutgoingRow';

interface OutgoingProps extends HTMLAttributes<HTMLDivElement> { }

export const OutgoingLayout: FunctionComponent<OutgoingProps> = () => {
    const [addOrderSwitch, setAddOrderSwitch] = useState(false);
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
                    console.log('Edit Order');
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterRemove = (_: any, data: any, index: any) => {
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
                <div onClick={(e) => {
                    console.log('Remove');
                }}
                >
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column: ColumnDescription<any, any>[] = [
        {
            dataField: 'order_number',
            text: 'Order Number',
            sort: false,
        },
        {
            dataField: 'shipping_to',
            text: 'Shipping To',
            sort: false,
        },
        {
            dataField: 'added_by',
            text: 'Added By',
            sort: false,
        },
        {
            dataField: 'shipping_type',
            text: 'Shipping Type',
            sort: true,
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
            dataField: 'date_shipped',
            text: 'Date Shipped',
            sort: true,
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
    const fake_data = [
        {
            order_id: 1,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 2,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 3,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 4,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 5,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 6,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
        },
        {
            order_id: 7,
            order_number: '88976637',
            shipping_to: 'IO South',
            added_by: 'Giuseppe',
            shipping_type: 'Fedex - Ground',
            order_type: 'PO',
            tracking_number: '907i9390839S938J',
            date_shipped: '2022-03-09',
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
                    <h2 style={{ fontWeight: 300 }}>Outgoing</h2>
                    <div>
                        <Button variant="dark" onClick={() => {
                            setAddOrderSwitch(true);
                        }}>
                            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Shipment
                        </Button>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                    <input type='text'
                        className="form-control custom-input"
                        placeholder="Search"
                        style={{ width: 200 }}
                    />
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
                                                    <ExpandedOutgoingRow />
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
                addOrderSwitch &&
                <div className='modal-dialog'>
                    <AddOutgoingOrderModal
                        modalVisible={addOrderSwitch}
                        onClose={async () => {
                            setAddOrderSwitch(false);
                        }}
                    />
                </div>
            }
        </section >
    );
};

export default OutgoingLayout;

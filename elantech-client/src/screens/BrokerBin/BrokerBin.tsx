import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

export const BrokerBinLayout: FunctionComponent = () => {

    const column = [
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
                    <h2 style={{ fontWeight: 300 }}>BrokerBin</h2>
                    <div>
                        <Button variant="dark" >
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
        </section >
    );
};

export default BrokerBinLayout;

import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ProcurementProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const ProcurementLayout: FunctionComponent<ProcurementProps> = ({ history }) => {

    const column = [

        {
            id: 1,
            dataField: "quantity",
            text: "Qty",
            sort: false,
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: false,
        },
        {
            id: 3,
            dataField: "po_number",
            text: "PO Number",
            sort: false,
        },
        {
            id: 4,
            dataField: "date_needed_by",
            text: "Needed By",
            sort: true,
        },
        {
            id: 5,
            dataField: "sold_for",
            text: "Price Sold",
            sort: false,
        },
        {
            id: 6,
            dataField: "comments",
            text: "Comments",
            sort: false,
        },
        {
            id: 7,
            dataField: "requested_by",
            text: "Requested By",
            sort: true,
        }

    ];
    const fake_data = [
        {
            order_id: 1,
            quantity: '2',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 2,
            quantity: '2',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 3,
            quantity: '255',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 4,
            quantity: '22',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 5,
            quantity: '1',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 6,
            quantity: '5',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
        },
        {
            order_id: 7,
            quantity: '3',
            product_number: '800921-B21',
            po_number: '908688',
            date_needed_by: '2022-03-09',
            sold_for: '$50.50',
            comments: 'Nothing to be said!',
            requested_by: 'Giuseppe',
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
                    <h2 style={{ fontWeight: 300 }}>Procurement</h2>
                    <div>
                        <Button variant="dark" >
                            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Item
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

export const Procurement = withRouter(ProcurementLayout);

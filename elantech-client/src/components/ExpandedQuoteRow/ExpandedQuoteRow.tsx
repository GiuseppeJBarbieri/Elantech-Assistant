import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ExpandedQuoteRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
}

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const rankFormatterEdit = (_: any, data: any, index: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }}
                onClick={() => {
                    console.log('Edit Column')
                }} >
                <Pencil style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    };
    const rankFormatterRemove = (_: any, data: any, index: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log('Remove Column')} >
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    };
    const column_inner = [

        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: false,
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
        },
        {
            id: 3,
            dataField: "quoted_price",
            text: "Quoted Price",
            sort: true,
        },
        {
            id: 4,
            dataField: "date_quoted",
            text: "Date",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 5,
            dataField: "time_quoted",
            text: "Time",
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
            dataField: "who_quoted",
            text: "Quoter",
            sort: true,
        },
        {
            id: 8,
            dataField: "sold",
            text: "Sold",
            sort: true,
        },
        {
            id: 9,
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 10,
            dataField: "remove",
            text: "Delete",
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
            quote_id: 1,
            quantity: 1,
            product_number: '875001-B21',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 2,
            quantity: 2,
            product_number: '875001-B21',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 3,
            quantity: 13,
            product_number: '875001-B21',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 4,
            quantity: 100,
            product_number: '875001-B21',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: fake_data.length

    };
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Quotes</Navbar.Brand>
                <Nav className="me-auto" style={{ marginBottom: -3}}>
                    <Nav.Link href="#home">Add Quote</Nav.Link>
                    <Nav.Link href="#features">More Info</Nav.Link>
                </Nav>
            </Navbar>
            <hr />
            <div id="example-collapse-text">
                <br />
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
                                    bootstrap4
                                    condensed
                                    {...paginationTableProps}
                                    columns={column_inner}
                                    keyField="serial_number"
                                    data={fake_data}
                                    classes="table table-dark table-hover table-striped"
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
            <hr />
        </ div>
    );
};

export const ExpandedQuoteRow = withRouter(ExpandedQuoteRowComponent);
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Collapse, Form, Fade } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
}

const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const [open, setOpen] = useState(false);
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
    const fake_data_inner = [
        {
            serial_number: 'serial-number-1',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-2',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-3',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-4',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-5',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-6',
            product_condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
    ];
    const inventory_columns = [
        {
            id: 1,
            dataField: "serial_number",
            text: "Serial Number",
            sort: false,
        },
        {
            id: 2,
            dataField: "product_condition",
            text: "Condition",
            sort: true,
        },
        {
            id: 3,
            dataField: "seller_name",
            text: "Seller Name",
            sort: true
        },
        {
            id: 4,
            dataField: "order_number",
            text: "Order Number",
            sort: false,
        }
        ,
        {
            id: 5,
            dataField: "date_received",
            text: "Date Received",
            sort: false,
        }
        ,
        {
            id: 6,
            dataField: "warranty_expiration",
            text: "Warranty Expiration",
            sort: false,
        },
        {
            id: 8,
            dataField: "comment",
            text: "Comment",
            sort: false,
        },
        {
            id: 9,
            dataField: "location",
            text: "Location",
            sort: false,
        },
        {
            id: 7,
            dataField: "tested",
            text: "Tested",
            sort: false,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 10,
            dataField: "reserved",
            text: "Reserved",
            sort: false,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 10,
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
            id: 11,
            dataField: "remove",
            text: "Remove",
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        }

    ];
    const fake_quote_data = [
        {
            quantity: '5',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            sold: 'Yes',
        },
        {
            quantity: '3',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum',
            sold: 'No',
        },
        {
            quantity: '2',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum',
            sold: 'No',
        },
        {
            quantity: '5',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum',
            sold: 'No',
        },
        {
            quantity: '10',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum',
            sold: 'No',
        },{
            quantity: '15',
            company_name: 'Service Express',
            price: '$12.50',
            date: '2022-01-30',
            quoted_by: 'Giuseppe',
            comments: 'Lorem Ipsum',
            sold: 'No',
        },
        
    ];
    const quotes_column = [
        {
            id: 1,
            dataField: "quantity",
            text: "Qty",
            sort: true,
        },
        {
            id: 2,
            dataField: "company_name",
            text: "Company Name",
            sort: true,
        },
        {
            id: 3,
            dataField: "price",
            text: "Price",
            sort: false
        },
        {
            id: 4,
            dataField: "date",
            text: "Date",
            sort: true,
        }
        ,
        {
            id: 5,
            dataField: "quoted_by",
            text: "Quoted By",
            sort: true,
        }
        ,
        {
            id: 6,
            dataField: "comments",
            text: "Comments",
            sort: false,
            style: {
                maxWidth: 200,
            }
        },
        {
            id: 7,
            dataField: "sold",
            text: " Sold ",
            sort: true,
            headerAlign: 'center',
            style: {
                textAlign: 'center',
                marginRight: 2,
                marginLeft: 2,
            }
        }
    ];
    const options2 = {
        custom: true,
        sizePerPage: 5,
        totalSize: fake_data_inner.length
    };
    const [hideQuotes, setHideQuotes] = useState(true);
    const [viewQuotesLbl, setViewQuotesLbl] = useState('View Quotes');
    const [expandInventoryLbl, setExpandInventoryLbl] = useState('Expand Inventory Table');
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>More Info</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Ebay Listing</Nav.Link>
                    <Nav.Link href="#features">Website Listing</Nav.Link>
                    <Nav.Link href="#pricing">HPE Quick Specs</Nav.Link>
                    <Nav.Link href="#quickQuote">Quick Quote</Nav.Link>
                    <Nav.Link onClick={() => {
                        setHideQuotes(!hideQuotes);
                        if (viewQuotesLbl == 'View Quotes') {
                            setViewQuotesLbl('Hide Quotes')
                        } else {
                            setViewQuotesLbl('View Quotes')
                        }
                    }}>{viewQuotesLbl}</Nav.Link>
                </Nav>
            </Navbar>
            {hideQuotes ?
                <div>
                    <hr />
                    <div className='d-flex justify-content-between' style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <p>New Opened Box: 6</p>
                        <p>Factory Sealed: 5</p>
                        <p>Refurbished: 3</p>
                        <p>Renew: 2</p>
                        <p>Used: 2</p>
                        <p>Damaged: 2</p>
                    </ div>
                    <hr />
                    <div className='d-flex' style={{ padding: 20 }}>
                        <div style={{ marginRight: 50 }}>
                            <p><strong style={{ fontWeight: 500 }}>Product Number : </strong>&emsp;&ensp;&nbsp;Example-b21</p>
                            <p><strong style={{ fontWeight: 500 }}>Alternate Number 1:</strong>&emsp;Example-b21</p>
                            <p><strong style={{ fontWeight: 500 }}>Alternate Number 2:</strong>&emsp;Example-b21</p>
                            <p><strong style={{ fontWeight: 500 }}>Alternate Number 3:</strong>&emsp;Example-b21</p>
                            <p><strong style={{ fontWeight: 500 }}>Alternate Number 4:</strong>&emsp;Example-b21</p>
                        </ div>
                        <div style={{ marginRight: 50 }}>
                            <p><strong style={{ fontWeight: 500 }}>Average Quote:</strong>&emsp;&emsp;&emsp; $210.00</p>
                            <p><strong style={{ fontWeight: 500 }}>Last Quoted Price:</strong>&emsp; $200.00</p>
                            <p><strong style={{ fontWeight: 500 }}>Quoted By:</strong>&emsp;&emsp;&emsp;&emsp;&emsp;Giuseppe B.</p>
                        </ div>
                        <div>
                        </div>
                    </ div>
                    <hr />
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            variant='dark'
                            onClick={() => {
                                setOpen(!open);
                                if (expandInventoryLbl == 'Expand Inventory Table') {
                                    setExpandInventoryLbl('Collapse Inventory Table')
                                } else {
                                    setExpandInventoryLbl('Expand Inventory Table')
                                }
                            }}
                        >
                            {expandInventoryLbl}
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <br />
                                <PaginationProvider
                                    pagination={paginationFactory(options2)}
                                >
                                    {
                                        ({
                                            paginationProps,
                                            paginationTableProps
                                        }) => (
                                            <div>
                                                <div style={{ marginBottom: 5, float: 'right' }}>
                                                    <Form.Control disabled size="sm" type="text" placeholder="Selected" style={{ width: 100, textAlign: 'center' }} />
                                                </div>
                                                <BootstrapTable
                                                    bootstrap4
                                                    condensed
                                                    {...paginationTableProps}
                                                    columns={inventory_columns}
                                                    keyField="serial_number"
                                                    data={fake_data_inner}
                                                    classes="table table-dark table-hover table-striped"
                                                    noDataIndication="Table is Empty"
                                                    selectRow={{
                                                        mode: 'checkbox',
                                                        clickToSelect: true
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
                        </Collapse>
                    </div>
                    <hr />
                </div>
                :
                <div>
                    <hr />
                    <div id="example-collapse-text">
                        <br />
                        <PaginationProvider
                            pagination={paginationFactory(options2)}
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
                                            columns={quotes_column}
                                            keyField="serial_number"
                                            data={fake_quote_data}
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
                </div>
            }
        </ div>
    );
};

export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
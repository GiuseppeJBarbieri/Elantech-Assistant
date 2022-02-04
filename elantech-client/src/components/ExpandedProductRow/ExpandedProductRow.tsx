import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Collapse, Form } from 'react-bootstrap';
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
    const column_inner = [
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
    const options2 = {
        custom: true,
        sizePerPage: 5,
        totalSize: fake_data_inner.length
    };
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true
    };
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>More Info</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Ebay Listing</Nav.Link>
                    <Nav.Link href="#features">Website Listing</Nav.Link>
                    <Nav.Link href="#pricing">HPE Quick Specs</Nav.Link>
                    <Nav.Link href="#pricing">Quick Quote</Nav.Link>
                </Nav>
            </Navbar>
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
                    <Button variant='dark' size="sm" style={{ width: 250 }} onClick={() => { }}>View Quote</Button>
                </ div>
                <div>
                </div>
            </ div>
            <hr />
            <div style={{ textAlign: 'center' }}>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant='dark'
                >
                    Expand Inventory Table
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
                                        <div style={{marginBottom: 5, float: 'right'}}>
                                            <Form.Control disabled size="sm" type="text" placeholder="Selected" style={{ width: 100, textAlign: 'center' }}/>
                                        </div>
                                        <BootstrapTable
                                            bootstrap4
                                            condensed
                                            {...paginationTableProps}
                                            columns={column_inner}
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
        </ div>
    );
};

export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
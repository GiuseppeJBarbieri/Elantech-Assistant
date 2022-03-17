import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Collapse, Form } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { AddInventoryModal } from '../AddInventoryModal/AddInventoryModal';

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedProduct: IProduct
}
const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const [openState, setOpenState] = useState(false);
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [hideQuotes, setHideQuotes] = useState(true);
    const [viewQuotesLbl, setViewQuotesLbl] = useState('View Quotes');
    const [expandInventoryLbl, setExpandInventoryLbl] = useState('Expand Inventory Table');
    const [selectedInventory, setSelectedInventory] = useState<IInventory[]>([]);
    const newOpenedBox = useState(0);
    const factorySealed = useState(0);
    const refurbished = useState(0);
    const renew = useState(0);
    const used = useState(0);
    const damaged = useState(0);
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
        }, {
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
    const onSelect = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row: any, isSelect: any, rowIndex: any, e: any) => {
            if (isSelect == true) {
                // Add inventory to list
                selectedInventory.push(row);
                console.log(selectedInventory);
            } else {
                // Remove Inventory from list
                var index = selectedInventory.indexOf(row);
                if (index !== -1) {
                    selectedInventory.splice(index, 1);
                }
                console.log(selectedInventory);
            }
        },
        onSelectAll: (isSelect: any, rows: IInventory, e: any) => {
            if (isSelect == true) {
                // Add inventory to list
                selectedInventory.push(rows);
                console.log(selectedInventory);
            } else {
                // Remove Inventory from list
                selectedInventory.
                console.log(selectedInventory);
            }

            console.log(isSelect);
            console.log(rows);
            console.log(e);
        }
    }
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>More Info</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={async () => {
                        window.open(props.selectedProduct.ebay_link)
                    }}>
                        Ebay Listing
                    </Nav.Link>
                    <Nav.Link onClick={async () => {
                        window.open(props.selectedProduct.website_link)
                    }}>
                        Website Listing
                    </Nav.Link>
                    <Nav.Link onClick={async () => {
                        window.open(props.selectedProduct.quick_specs)
                    }}>
                        HPE Quick Specs
                    </Nav.Link>
                    <Nav.Link onClick={() => {
                        window.open(props.selectedProduct.ebay_link)
                    }}>
                        Quick Quote
                    </Nav.Link>
                    <Nav.Link onClick={() => setAddInventorySwitch(true)}>Add Inventory</Nav.Link>
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
                        <p>New Opened Box: {newOpenedBox}</p>
                        <p>Factory Sealed: {factorySealed}</p>
                        <p>Refurbished: {refurbished}</p>
                        <p>Renew: {renew}</p>
                        <p>Used: {used}</p>
                        <p>Damaged: {damaged}</p>
                    </ div>
                    <hr />
                    <div className='d-flex' style={{ padding: 20 }}>
                        <div className='d-flex' style={{ marginRight: 50 }}>
                            <div style={{ marginRight: 20 }}>
                                <p><strong style={{ fontWeight: 500 }}>Product Number: </strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 1:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 2:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 3:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 4:</strong></p>
                            </ div>
                            <div>
                                <p>{props.selectedProduct.product_number}</p>
                                <p>{props.selectedProduct.alt_1}</p>
                                <p>{props.selectedProduct.alt_2}</p>
                                <p>{props.selectedProduct.alt_3}</p>
                                <p>{props.selectedProduct.alt_4}</p>
                            </div>
                        </div>
                        <div className='d-flex' style={{ marginRight: 50 }}>
                            <div style={{ marginRight: 20 }}>
                                <p><strong style={{ fontWeight: 500 }}>Average Quote:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Last Quoted Price:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Quoted By:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Quoted To:</strong></p>
                            </div>
                            <div>
                                <p>$210.00</p>
                                <p>$200.00</p>
                                <p>Giuseppe B.</p>
                                <p>Service Express</p>
                            </div>
                        </ div>

                        <div>
                        </div>
                    </ div>
                    <hr />
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            aria-controls="example-collapse-text"
                            aria-expanded={openState}
                            variant='dark'
                            onClick={() => {
                                setOpenState(!openState);
                                if (expandInventoryLbl == 'Expand Inventory Table') {
                                    setExpandInventoryLbl('Collapse Inventory Table')
                                } else {
                                    setExpandInventoryLbl('Expand Inventory Table')
                                }
                            }}
                        >
                            {expandInventoryLbl}
                        </Button>
                        <Collapse in={openState}>
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
                                                <div>
                                                    <div className='d-flex justify-content-between' style={{ marginBottom: 5 }}>
                                                        <Button
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={openState}
                                                            variant='dark'
                                                            onClick={() => {
                                                                setOpenState(!openState);
                                                                if (expandInventoryLbl == 'Expand Inventory Table') {
                                                                    setExpandInventoryLbl('Collapse Inventory Table')
                                                                } else {
                                                                    setExpandInventoryLbl('Expand Inventory Table')
                                                                }
                                                            }}
                                                        >
                                                            Edit Inventory
                                                        </Button>
                                                        <Form.Control disabled size="sm" type="text" placeholder="Selected" style={{ width: 100, textAlign: 'center' }} />
                                                    </div>
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
                                                    selectRow={onSelect}
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
            {
                addInventorySwitch &&
                <div className='modal-dialog'>
                    <AddInventoryModal
                        modalVisible={addInventorySwitch}
                        onClose={async () => {
                            setAddInventorySwitch(false);
                        }}
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
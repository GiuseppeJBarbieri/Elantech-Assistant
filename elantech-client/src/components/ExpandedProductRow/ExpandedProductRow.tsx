import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav, Button, Collapse, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IProduct from '../../types/IProduct';
import { AddInventoryModal } from '../AddInventoryModal/AddInventoryModal';
import { InventoryTable } from '../Tables/InventoryTable';

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedProduct: IProduct
}
const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const [openState, setOpenState] = useState(false);
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [hideQuotes, setHideQuotes] = useState(true);
    const [viewQuotesLbl, setViewQuotesLbl] = useState('View Quotes');
    const [expandInventoryLbl, setExpandInventoryLbl] = useState('Expand Inventory Table');
    const [newOpenedBox, setNewOpenedBox] = useState(0);
    const [factorySealed, setFactorySealed] = useState(0);
    const [refurbished, setRefurbished] = useState(0);
    const [renew, setRenew] = useState(0);
    const [used, setUsed] = useState(0);
    const [damaged, setDamaged] = useState(0);

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
            // style: {
            //     maxWidth: 200,
            // }
        },
        {
            id: 7,
            dataField: "sold",
            text: " Sold ",
            sort: true,
            headerAlign: 'center',
            // style: {
            //     textAlign: 'center',
            //     marginRight: 2,
            //     marginLeft: 2,
            // }
        }
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
    };
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
                        if (viewQuotesLbl === 'View Quotes') {
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
                                if (expandInventoryLbl === 'Expand Inventory Table') {
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
                                <InventoryTable />
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
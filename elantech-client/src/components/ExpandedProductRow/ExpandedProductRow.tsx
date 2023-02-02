/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { AddInventoryModal } from '../Modals/Inventory/AddInventoryModal';
import { AddSimpleQuoteModal } from '../Modals/Quote/AddSimpleQuoteModal';
import { InventoryTable } from '../Tables/InventoryTable';
import { EditInventoryAlertModal } from '../Modals/EditInventoryAlertModal';
import { requestAllInventoryByProductID } from '../../utils/Requests';
import IProductQuotesTable from '../../types/IProductQuotesTable';

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedProduct: IProduct
    getAllProducts: () => void;
}
const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const [openState, setOpenState] = useState(false);
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [addSimpleQuoteSwitch, setAddSimpleQuoteSwitch] = useState(false);
    const [hideQuotes, setHideQuotes] = useState(true);
    const [addInventoryAlertSwitch, setAddInventoryAlertSwitch] = useState(false);
    const [viewQuotesLbl, setViewQuotesLbl] = useState('View Quotes');
    const [expandInventoryLbl, setExpandInventoryLbl] = useState('Expand Inventory Table');
    const [factorySealed, setFactorySealed] = useState(0);
    const [newOpenedBox, setNewOpenedBox] = useState(0);
    const [refurbished, setRefurbished] = useState(0);
    const [renew, setRenew] = useState(0);
    const [used, setUsed] = useState(0);
    const [damaged, setDamaged] = useState(0);
    const [inventory, setInventory] = useState<IInventory[]>([]);
    const [quoteList] = useState<IProductQuotesTable[]>([]);

    const quotes_column = [
        {
            id: 1,
            dataField: 'quantity',
            text: 'Qty',
            sort: true,
        },
        {
            id: 2,
            dataField: 'company_name',
            text: 'Company Name',
            sort: true,
        },
        {
            id: 3,
            dataField: 'price',
            text: 'Price',
            sort: false
        },
        {
            id: 4,
            dataField: 'date',
            text: 'Date',
            sort: true,
        }
        ,
        {
            id: 5,
            dataField: 'quoted_by',
            text: 'Quoted By',
            sort: true,
        }
        ,
        {
            id: 6,
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
        {
            id: 7,
            dataField: 'sold',
            text: ' Sold ',
            sort: true,
            headerAlign: 'center',
        }
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
    };
    const getAllInventory = (productId: number) => {
        setTimeout(async () => {
            try {
                const inventoryList = await requestAllInventoryByProductID(productId)
                setInventory(inventoryList);
                setConditionAmount(inventoryList);
            } catch (err) {
                console.log(err);
            }
        }, 400)
    };
    const setConditionAmount = (inventory: IInventory[]) => {
        console.log(inventory);
        const cond = {
            nob: 0,
            dmg: 0,
            fs: 0,
            ref: 0,
            ren: 0,
            usd: 0,
        };
        for (const item of inventory) {
            if (item.condition === 'New Factory Sealed') {
                cond.fs = cond.fs + 1;
            } else if (item.condition === 'New Opened Box') {
                cond.nob = cond.nob + 1;
            } else if (item.condition === 'Refurbished') {
                cond.ref = cond.ref + 1;
            } else if (item.condition === 'Renew') {
                cond.ren = cond.ren + 1;
            } else if (item.condition === 'Used') {
                cond.usd = cond.usd + 1;
            } else if (item.condition === 'Damaged') {
                cond.dmg = cond.dmg + 1;
            }
        }
        setNewOpenedBox(cond.nob);
        setFactorySealed(cond.fs);
        setRefurbished(cond.ref);
        setRenew(cond.ren);
        setUsed(cond.usd);
        setDamaged(cond.dmg);
    };
    useEffect(() => {
        if (props.selectedProduct.id !== undefined) {
            getAllInventory(props.selectedProduct.id);
        }
    }, []);
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>More Info</Navbar.Brand>
                <Nav className="me-auto">
                    {(props.selectedProduct.ebayLink as string).length > 1 &&
                        <Nav.Link onClick={async () => {
                            window.open(props.selectedProduct.ebayLink)
                        }}>
                            Ebay Listing
                        </Nav.Link>
                    }
                    {(props.selectedProduct.websiteLink as string).length > 1 &&
                        <Nav.Link onClick={async () => {
                            window.open(props.selectedProduct.websiteLink)
                        }}>
                            Website Listing
                        </Nav.Link>
                    }
                    {(props.selectedProduct.quickSpecsLink as string).length > 1 &&
                        <Nav.Link onClick={async () => {
                            window.open(props.selectedProduct.quickSpecsLink)
                        }}>
                            HPE Quick Specs
                        </Nav.Link>
                    }
                    <Nav.Link onClick={() => {
                        setAddSimpleQuoteSwitch(true);
                    }}>
                        Quick Quote
                    </Nav.Link>
                    <Nav.Link onClick={() => {
                        setAddInventorySwitch(true);
                    }
                    }>Add Inventory</Nav.Link>
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
                        <p>Factory Sealed: {factorySealed}</p>
                        <p>New Opened Box: {newOpenedBox}</p>
                        <p>Refurbished: {refurbished}</p>
                        <p>Renew: {renew}</p>
                        <p>Used: {used}</p>
                        <p>Damaged: {damaged}</p>
                    </ div>
                    <hr />
                    <div className='d-flex' style={{ padding: 20, justifyContent: 'space-between' }}>
                        <div className='d-flex' style={{ marginRight: 50 }}>
                            <div style={{ marginRight: 20 }}>
                                <p><strong style={{ fontWeight: 500 }}>Product Number: </strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 1:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 2:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 3:</strong></p>
                            </ div>
                            <div>
                                <p>{props.selectedProduct.productNumber}</p>
                                <p>{props.selectedProduct.altNumber1}</p>
                                <p>{props.selectedProduct.altNumber2}</p>
                                <p>{props.selectedProduct.altNumber3}</p>
                            </div>
                        </div>
                        <div className='d-flex' style={{ marginRight: 50 }}>
                            <div style={{ marginRight: 20 }}>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 4:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 5:</strong></p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 6:</strong></p>
                            </ div>
                            <div>
                                <p>{props.selectedProduct.altNumber4}</p>
                                <p>{props.selectedProduct.altNumber5}</p>
                                <p>{props.selectedProduct.altNumber6}</p>
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
                                <InventoryTable
                                    inventory={inventory}
                                    selectedProduct={props.selectedProduct}
                                    getAllInventory={getAllInventory}
                                    getAllProducts={props.getAllProducts}
                                />
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
                                            data={quoteList}
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
                addInventoryAlertSwitch &&
                <div className='modal-dialog'>
                    <EditInventoryAlertModal
                        modalVisible={addInventoryAlertSwitch}
                        onClose={async () => {
                            setAddInventoryAlertSwitch(false);
                        }}
                    />
                </div>
            }
            {
                addInventorySwitch &&
                <div className='modal-dialog'>
                    <AddInventoryModal
                        modalVisible={addInventorySwitch}
                        selectedProduct={props.selectedProduct}
                        getAllProducts={props.getAllProducts}
                        getAllInventory={getAllInventory}
                        onClose={async () => {
                            setAddInventorySwitch(false);
                        }}
                    />
                </div>
            }
            {
                addSimpleQuoteSwitch &&
                <div className='modal-dialog'>
                    <AddSimpleQuoteModal
                        modalVisible={addSimpleQuoteSwitch}
                        onClose={async () => {
                            setAddSimpleQuoteSwitch(false);
                        }}
                    />
                </div>
            }
        </ div>
    );
};
export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
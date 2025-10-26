import React, { FunctionComponent, HTMLAttributes, useCallback, useRef, useMemo, useState } from 'react';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IProduct from '../../types/IProduct';
import { AddInventoryModal } from '../Modals/Inventory/AddInventoryModal';
import { AddSimpleQuoteModal } from '../Modals/Quote/AddSimpleQuoteModal';
import { InventoryTable } from '../Tables/InventoryTable';
import { EditInventoryAlertModal } from '../Modals/EditInventoryAlertModal';
import IQuotedProduct from '../../types/IQuotedProduct';
import { AddOrEditOrderModal } from '../Modals/Inventory/AddOrEditOrderModal';
import { useExpandedRowData } from '../../hooks/useExpandedRowData';
import { SpinnerBlock } from '../LoadingAnimation/SpinnerBlock';

enum ModalType {
    ADD_INVENTORY = 'addInventory',
    ADD_SIMPLE_QUOTE = 'addSimpleQuote',
    ADD_INVENTORY_ALERT = 'addInventoryAlert',
    HAS_ORDER_ALERT = 'hasOrderAlert',
}

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedProduct: IProduct;
    fetchProducts: () => void;
}
const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const inventoryTimeout = useRef<NodeJS.Timeout>();
    const quotesTimeout = useRef<NodeJS.Timeout>();
    const [isInventoryExpanded, setInventoryExpanded] = useState(false);
    const [isQuotesView, setQuotesView] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const { inventory, quotedProducts, loading, conditionCounts, quoteInfo, refetchData } = useExpandedRowData(props.selectedProduct.id);

    const quotes_column = useMemo(() => [
        {
            dataField: 'quantity',
            text: 'Qty',
            sort: true,
        }, {
            dataField: 'quote.company.name',
            text: 'Company Name',
            sort: true,
        }, {
            dataField: 'quotedBy',
            text: 'Quoted By',
            formatter: (_: unknown, row: IQuotedProduct) => {
                const { firstName, lastName } = row.quote?.user || {};
                return `${firstName || ''}  ${lastName || ''}`.trim();
            },
            sort: true,
        }, {
            dataField: 'quotedPrice',
            text: 'Price',
            sort: false
        }, {
            dataField: 'quote.dateQuoted',
            text: 'Date',
            sort: true,
        }, {
            dataField: 'quote.sold',
            text: 'Sold ',
            sort: true,
            headerAlign: 'center',
        }
    ], []);

    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: quotedProducts.length
    };

    const handleOpenLink = useCallback((url: string | null | undefined) => {
        if (url) {
            window.open(url, "_blank", 'noopener,noreferrer');
        }
    }, []);

    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>More Info</Navbar.Brand>
                <Nav className="me-auto">
                    {(props.selectedProduct.ebayUrl as string) != null &&
                        <Nav.Link onClick={async () => {
                            handleOpenLink(props.selectedProduct.ebayUrl)
                        }}>
                            Ebay Listing
                        </Nav.Link>
                    }
                    {(props.selectedProduct.websiteUrl as string) != null &&
                        <Nav.Link onClick={() => handleOpenLink(props.selectedProduct.websiteUrl)}>
                            Website Listing
                        </Nav.Link>
                    }
                    {(props.selectedProduct.quickSpecsUrl as string) != null &&
                        <Nav.Link onClick={() => handleOpenLink(props.selectedProduct.quickSpecsUrl)}>
                            HPE Quick Specs
                        </Nav.Link>
                    }
                    <Nav.Link onClick={() => setActiveModal(ModalType.ADD_SIMPLE_QUOTE)}>
                        Quick Quote
                    </Nav.Link>
                    <Nav.Link onClick={() => setActiveModal(ModalType.HAS_ORDER_ALERT)}>Add Inventory</Nav.Link>
                    <Nav.Link onClick={() => setQuotesView(!isQuotesView)}>
                        {isQuotesView ? 'Hide Quotes' : 'View Quotes'}
                    </Nav.Link>
                </Nav>
            </Navbar>
            {loading ? <SpinnerBlock /> : isQuotesView ?
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
                                            key='quote_table'
                                            bootstrap4
                                            condensed
                                            {...paginationTableProps}
                                            columns={quotes_column}
                                            keyField="id"
                                            data={quotedProducts}
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
                :
                <div>
                    <hr />
                    <div className='d-flex justify-content-between' style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <p>Factory Sealed: {conditionCounts.factorySealed}</p>
                        <p>New Opened Box: {conditionCounts.newOpenedBox}</p>
                        <p>Refurbished: {conditionCounts.refurbished}</p>
                        <p>Renew: {conditionCounts.renew}</p>
                        <p>Used: {conditionCounts.used}</p>
                        <p>Damaged: {conditionCounts.damaged}</p>
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
                                <p>$ {quoteInfo.averageQuote.toFixed(2)}</p>
                                <p>$ {quoteInfo.lastQuotedPrice.toFixed(2)}</p>
                                <p>{quoteInfo.quotedBy}</p>
                                <p>{quoteInfo.quotedTo}</p>
                            </div>
                        </ div>
                    </ div>
                    <hr />
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            aria-controls="inventory-collapse-text"
                            aria-expanded={isInventoryExpanded}
                            variant='dark'
                            onClick={() => setInventoryExpanded(!isInventoryExpanded)}
                        >
                            {isInventoryExpanded ? 'Collapse Inventory Table' : 'Expand Inventory Table'}
                        </Button>
                        <Collapse in={isInventoryExpanded}>
                            <div id="inventory-collapse-text" style={{ height: 'auto' }}>
                                <InventoryTable
                                    inventory={inventory}
                                    selectedProduct={props.selectedProduct}
                                    onInventoryUpdate={refetchData}
                                />
                            </div>
                        </Collapse>
                    </div>
                    <hr />
                </div>
            }
            {
                activeModal === ModalType.ADD_INVENTORY_ALERT &&
                <div className='modal-dialog'>
                    <EditInventoryAlertModal
                        modalVisible={activeModal === ModalType.ADD_INVENTORY_ALERT}
                        onClose={() => setActiveModal(null)}
                        onContinue={() => {
                            setActiveModal(ModalType.ADD_INVENTORY);
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.ADD_INVENTORY &&
                <div className='modal-dialog'>
                    <AddInventoryModal
                        modalVisible={activeModal === ModalType.ADD_INVENTORY}
                        selectedProduct={props.selectedProduct}
                        onClose={() => setActiveModal(null)}
                        onSuccess={() => {
                            refetchData();
                            props.fetchProducts();
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.HAS_ORDER_ALERT &&
                <div className='modal-dialog'>
                    <AddOrEditOrderModal
                        modalVisible={activeModal === ModalType.HAS_ORDER_ALERT}
                        onClose={() => setActiveModal(null)}
                        onContinue={() => {
                            setActiveModal(ModalType.ADD_INVENTORY);
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.ADD_SIMPLE_QUOTE &&
                <div className='modal-dialog'>
                    <AddSimpleQuoteModal
                        modalVisible={activeModal === ModalType.ADD_SIMPLE_QUOTE}
                        selectedProduct={props.selectedProduct}
                        getAllQuotes={refetchData}
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
        </ div>
    );
};
export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
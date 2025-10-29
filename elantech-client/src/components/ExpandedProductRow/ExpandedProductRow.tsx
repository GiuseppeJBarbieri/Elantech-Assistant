import React, { FunctionComponent, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IProduct from '../../types/IProduct';
import { AddInventoryModal } from '../Modals/Inventory/AddInventoryModal';
import { AddSimpleQuoteModal } from '../Modals/Quote/AddSimpleQuoteModal';
import { InventoryTable } from '../Tables/InventoryTable';
import { EditInventoryAlertModal } from '../Alerts/EditInventoryAlertModal';
import IQuotedProduct from '../../types/IQuotedProduct';
import { AddOrEditOrderModal } from '../Modals/Inventory/AddOrEditOrderModal';
import { UseExpandedRowData } from '../../hooks/useExpandedRowData';

enum ModalType {
    ADD_INVENTORY = 'addInventory',
    ADD_SIMPLE_QUOTE = 'addSimpleQuote',
    ADD_INVENTORY_ALERT = 'addInventoryAlert',
    HAS_ORDER_ALERT = 'hasOrderAlert',
}

interface ExpandedProductRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedProduct: IProduct;
}
const ExpandedProductRowComponent: FunctionComponent<ExpandedProductRowProps> = (props) => {
    const [isQuotesView, setQuotesView] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const { inventory, quotedProducts, conditionCounts, quoteInfo, fetchInventoryData, fetchQuoteData } = UseExpandedRowData(props.selectedProduct.id);

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
            <div className="d-flex justify-content-left align-items-center" style={{ paddingLeft: 20 }}>
                <ButtonGroup style={{ border: '1px solid #404040' }}>
                    <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={() => setQuotesView(!isQuotesView)}>
                        {isQuotesView ? 'Hide Quotes' : 'View Quotes'}
                    </Button>
                    <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={() => setActiveModal(ModalType.ADD_SIMPLE_QUOTE)}>
                        Quick Quote
                    </Button>
                    <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={() => setActiveModal(ModalType.HAS_ORDER_ALERT)}>
                        Add Inventory
                    </Button>
                    {(props.selectedProduct.ebayUrl as string) != null &&
                        <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={async () => handleOpenLink(props.selectedProduct.ebayUrl)}>
                            Ebay Listing
                        </Button>
                    }
                    {(props.selectedProduct.websiteUrl as string) != null &&
                        <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={() => handleOpenLink(props.selectedProduct.websiteUrl)}>
                            Website Listing
                        </Button>
                    }
                    {(props.selectedProduct.quickSpecsUrl as string) != null &&
                        <Button variant="dark" style={{ backgroundColor: '#2c3034' }} onClick={() => handleOpenLink(props.selectedProduct.quickSpecsUrl)}>
                            HPE Quick Specs
                        </Button>
                    }
                </ButtonGroup>
            </div>
            {!isQuotesView ?
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: '20px' }} className='expandedProductRow'>
                    <div className="d-flex" style={{ gap: '20px' }}>
                        {[
                            { label: 'Factory Sealed', count: conditionCounts.factorySealed },
                            { label: 'New Opened Box', count: conditionCounts.newOpenedBox },
                            { label: 'Refurbished', count: conditionCounts.refurbished },
                            { label: 'Renew', count: conditionCounts.renew },
                            { label: 'Used', count: conditionCounts.used },
                            { label: 'Damaged', count: conditionCounts.damaged },
                        ].map(item => (
                            <div
                                key={item.label}
                                className="p-3 rounded text-start"
                                style={{ backgroundColor: '#2c3034', border: '1px solid #404040', flex: 1 }}
                            >
                                <div className="text-secondary mb-1">
                                    {item.label}
                                </div>
                                <div className="text-white">
                                    {item.count}
                                </div>
                            </div>
                        ))}
                    </ div>
                    <div
                        className="p-4 rounded d-flex"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <h5 style={{ fontWeight: 300, paddingLeft: 20 }}>Product Information</h5>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5, display: 'flex', flexDirection: 'row', gap: '300px' }}>
                            <div>
                                <div>
                                    <p className="text-secondary mb-1">Product Number</p>
                                    <p>{props.selectedProduct.productNumber}</p>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <p className="text-secondary mb-1">Alternate Numbers</p>
                                        <div className='d-flex' style={{ gap: '10px', flexWrap: 'wrap' }}>
                                            {[
                                                props.selectedProduct.altNumber1,
                                                props.selectedProduct.altNumber2,
                                                props.selectedProduct.altNumber3,
                                                props.selectedProduct.altNumber4,
                                                props.selectedProduct.altNumber5,
                                                props.selectedProduct.altNumber6,
                                            ].filter(Boolean).map((altNum, index) => (
                                                <div key={index} className="p-1 rounded" style={{ backgroundColor: '#212529', border: '1px solid #404040' }}>
                                                    <p className="mb-0 text-white">{altNum}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ div>
                                </div>
                            </div>
                            <div>
                                <p className="text-secondary mb-1">Description</p>
                                <p>{props.selectedProduct.description}</p>
                            </ div>
                        </div>
                    </ div>
                    <div
                        className="rounded text-center"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px' }}
                    >
                        <div style={{ height: 'auto' }}>
                            <InventoryTable
                                inventory={inventory}
                                selectedProduct={props.selectedProduct}
                                onInventoryUpdate={fetchInventoryData}
                            />
                        </div>
                    </div>
                </div>
                :
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: '20px' }} className='expandedProductRow'>
                    <div
                        className="p-4 rounded d-flex"
                        style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px', flexDirection: 'column' }}
                    >
                        <h5 style={{ fontWeight: 300, paddingLeft: 20 }}>Quote Information</h5>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, display: 'flex', flexDirection: 'row', gap: '300px' }}>
                            <div>
                                <div>
                                    <p className="text-secondary mb-1">Quoted By</p>
                                    <p>{quoteInfo.quotedBy}</p>
                                </ div>
                                <div>
                                    <p className="text-secondary mb-1">Quoted To</p>
                                    <p>{quoteInfo.quotedTo}</p>
                                </ div>
                            </div>
                            <div>
                                <div>
                                    <p className="text-secondary mb-1">Last Quoted Price</p>
                                    <p>$ {quoteInfo.lastQuotedPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="text-secondary mb-1">Average Quote</p>
                                    <p>$ {quoteInfo.averageQuote.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </ div>
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
                                        <div
                                            className="rounded"
                                            style={{ backgroundColor: '#2c3034', border: '1px solid #404040', minWidth: '130px' }}
                                        >
                                            <div style={{ margin: 20}}>
                                                <h5 style={{ fontWeight: 300 }}>Quote Details</h5>
                                            </div>
                                            <div style={{ height: 'auto', paddingLeft: 20, paddingRight: 20, paddingBottom: -15 }}>
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
                                        </div>
                                    </div>
                                )
                            }
                        </PaginationProvider>
                    </div>
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
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
        </ div>
    );
};
export const ExpandedProductRow = withRouter(ExpandedProductRowComponent);
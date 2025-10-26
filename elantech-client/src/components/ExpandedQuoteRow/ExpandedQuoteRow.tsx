import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, ThreeDots, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../types/ICompany';
import IQuote from '../../types/IQuote';
import IQuotedProduct from '../../types/IQuotedProduct';
import { requestAllQuotesByCompanyID } from '../../utils/Requests';
import { AddMultiQuoteModal } from '../Modals/Quote/AddMultiQuoteModal';
import { EditQuoteModal } from '../Modals/Quote/EditQuoteModal';
import { ViewQuotedProductsModal } from '../Modals/QuotedProducts/ViewQuotedProductsModal';
import { defaultQuote } from '../../constants/Defaults';
import { RemoveQuoteModal } from '../Modals/Quote/RemoveQuoteModal';

interface ExpandedQuoteRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedCompany: ICompany;
    fetchCompanies: () => void;
}

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const [addQuoteSwitch, setAddQuoteSwitch] = useState(false);
    const [editQuoteSwitch, setEditQuoteSwitch] = useState(false);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<IQuote>(defaultQuote);
    const [viewMoreSwitch, setViewMoreSwitch] = useState(false);
    const [removeQuoteSwitch, setRemoveQuoteSwitch] = useState(false);

    const rankFormatterViewMore = (hm: any, _data: any, _index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={(_e) => {
                    const quote: IQuote = {
                        id: _data.id,
                        companyId: _data.companyId,
                        userId: _data.userId,
                        dateQuoted: _data.dateQuoted,
                        sold: _data.sold,
                        user: { firstName: _data.user.firstName, lastName: _data.user.lastName },
                        quotedProducts: _data.quotedProducts
                    }
                    setSelectedQuote(quote);
                    setViewMoreSwitch(true);
                }}
                >
                    <ThreeDots style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterEdit = (_: any, data: any, _index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div onClick={(_e) => {
                    setSelectedQuote(data);
                    setEditQuoteSwitch(true);
                }}>
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterRemove = (_: any, data: any, _index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={() => {
                    setSelectedQuote(data);
                    setRemoveQuoteSwitch(true);
                }}
                >
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column = [
        {
            dataField: 'quantity',
            text: 'Number of Products',
            formatter: (cell: any, row: any) => {
                var total = 0;
                row.quotedProducts.forEach((element: IQuotedProduct) => {
                    total += element.quantity;
                });
                return `${total}`;
            },
            sort: false,
        },
        {
            dataField: 'quotedBy',
            text: 'Quoted By',
            formatter: (cell: any, row: any) => {
                return `${row.user.firstName}  ${row.user.lastName}`;
            },
            sort: true,
        },
        {
            dataField: 'dateQuoted',
            text: 'Date',
            sort: true,
        },
        {
            dataField: 'totalQuote',
            text: 'Total Quote',
            formatter: (cell: any, row: any) => {
                var total = 0;
                row.quotedProducts.forEach((element: IQuotedProduct) => {
                    total += element.quotedPrice;
                });
                return `$${total}`;
            },
            sort: true,
        },
        {
            dataField: 'sold',
            text: 'Sold',
            sort: true,
        },
        {
            dataField: 'view',
            text: 'View More',
            sort: false,
            formatter: rankFormatterViewMore,
            headerAlign: 'center',
        },
        {
            dataField: 'edit',
            text: 'Edit',
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
        },
        {
            dataField: 'remove',
            text: 'Delete',
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
        },
        // {
        //     dataField: 'Add',
        //     text: 'Create Order',
        //     sort: false,
        //     formatter: rankFormatterAdd,
        //     headerAlign: 'center',
        // },
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: quotes.length
    };
    const getAllQuotes = (companyId: number) => {
        setTimeout(async () => {
            try {
                const quotes = await requestAllQuotesByCompanyID(companyId);
                setQuotes(quotes);
            } catch (err) {
                console.log(err);
            }
        }, 400)
    };
    useEffect(() => {
        getAllQuotes(props.selectedCompany.id as number);
    }, []);
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Quotes</Navbar.Brand>
                <Nav className="me-auto" style={{ marginBottom: -3 }}>
                    <Nav.Link onClick={() => {
                        setAddQuoteSwitch(true);
                    }}>
                        Add Quote
                    </Nav.Link>
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
                                    columns={column}
                                    keyField="id"
                                    data={quotes}
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
            {
                addQuoteSwitch &&
                <div className='modal-dialog'>
                    <AddMultiQuoteModal
                        modalVisible={addQuoteSwitch}
                        selectedCompany={props.selectedCompany}
                        getAllQuotes={getAllQuotes}
                        onClose={async () => {
                            setAddQuoteSwitch(false);
                        }}
                    />
                </div>
            }
            {
                editQuoteSwitch &&
                <div className='modal-dialog'>
                    <EditQuoteModal
                        modalVisible={editQuoteSwitch}
                        selectedCompany={props.selectedCompany}
                        selectedQuote={selectedQuote}
                        onClose={async () => {
                            setEditQuoteSwitch(false);
                        }}
                    />
                </div>
            }
            {
                viewMoreSwitch &&
                <div className='modal-dialog'>
                    <ViewQuotedProductsModal
                        modalVisible={viewMoreSwitch}
                        onClose={async () => {
                            setViewMoreSwitch(false);
                        }}
                        selectedCompany={props.selectedCompany}
                        selectedQuote={selectedQuote} />
                </div>
            }
            {
                removeQuoteSwitch &&
                <div className='modal-dialog'>
                    <RemoveQuoteModal
                        modalVisible={removeQuoteSwitch}
                        selectedQuote={selectedQuote}
                        getAllQuotes={getAllQuotes}
                        onClose={async () => {
                            setRemoveQuoteSwitch(false);
                        }}
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedQuoteRow = withRouter(ExpandedQuoteRowComponent);
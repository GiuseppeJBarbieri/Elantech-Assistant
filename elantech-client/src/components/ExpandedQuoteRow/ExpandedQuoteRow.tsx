import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Plus, ThreeDots } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ICompany from '../../types/ICompany';
import IQuote from '../../types/IQuote';
import IQuotedProduct from '../../types/IQuotedProduct';
import { requestAllQuotesByCompanyID } from '../../utils/Requests';
import AddMultiQuoteModal from '../Modals/Quote/AddMultiQuoteModal';
import EditQuoteModal from '../Modals/Quote/EditQuoteModal';
import ViewQuotedProductsModal from '../Modals/ViewQuotedProductsModal/ViewQuotedProductsModal';

interface ExpandedQuoteRowProps extends HTMLAttributes<HTMLDivElement> {
    selectedCompany: ICompany;
}

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const [addQuoteSwitch, setAddQuoteSwitch] = useState(false);
    const [editQuoteSwitch, setEditQuoteSwitch] = useState(false);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [selectedQuote] = useState<IQuotedProduct>();
    const [viewMoreSwitch, setViewMoreSwitch] = useState(false);

    const rankFormatterAdd = () => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div onClick={() => {
                    console.log('Create Order');
                }}>
                    <Plus style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterViewMore = () => {
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
                <div onClick={() => {
                    setViewMoreSwitch(true);
                }}
                >
                    <ThreeDots style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    // const rankFormatterEdit = (_: any, data: any, _index: any) => {
    //     return (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //                 cursor: 'pointer',
    //                 lineHeight: 'normal',
    //                 zIndex: 0
    //             }}
    //             onClick={(e) => {
    //                 e.stopPropagation()
    //             }} >
    //             <div onClick={(_e) => {
    //                 setSelectedQuote(data);
    //                 setEditQuoteSwitch(true);
    //             }}
    //             >
    //                 <Pencil style={{ fontSize: 20, color: 'white' }} />
    //             </div>
    //         </div>
    //     );
    // };
    // const rankFormatterRemove = (_: any, _data: any, _index: any) => {
    //     return (
    //         <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log('Remove Column')} >
    //             <Trash style={{ fontSize: 20, color: 'white' }} />
    //         </div>
    //     );
    // };
    const column = [
        {
            dataField: 'quantity',
            text: 'Number of Products',
            formatter: (row: IQuote) => {
                let total = 0;
                row.QuotedProducts?.forEach((element: IQuotedProduct) => {
                    total += element.quantity;
                });
                return `${total}`;
            },
            sort: false,
        },
        {
            dataField: 'quotedBy',
            text: 'Quoted By',
            formatter: (row: IQuote) => {
                return row.User ? `${row.User.firstName}  ${row.User.lastName}` : 'Unknown';
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
            formatter: (row: IQuote) => {
                let total = 0;
                row.QuotedProducts?.forEach((element: IQuotedProduct) => {
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
            dataField: 'Add',
            text: 'Create Order',
            sort: false,
            formatter: rankFormatterAdd,
            headerAlign: 'center',
        },
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
                        selectedQuote={selectedQuote as unknown as IQuote} />
                </div>
            }
        </ div>
    );
};

export default ExpandedQuoteRowComponent;
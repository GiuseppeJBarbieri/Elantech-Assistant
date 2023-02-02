/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Plus, ThreeDots } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../constants/API';
import ICompany from '../../types/ICompany';
import IQuote from '../../types/IQuote';
import IQuotedProduct from '../../types/IQuotedProduct';
import { AddMultiQuoteModal } from '../Modals/Quote/AddMultiQuoteModal';
import { EditQuoteModal } from '../Modals/Quote/EditQuoteModal';
import { ViewQuotedProductsModal } from '../ViewQuotedProductsModal/ViewQuotedProductsModal';

interface ExpandedQuoteRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedCompany: ICompany
}

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const [addQuoteSwitch, setAddQuoteSwitch] = useState(false);
    const [editQuoteSwitch, setEditQuoteSwitch] = useState(false);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [selectedQuote] = useState<IQuotedProduct>();
    const [viewMoreSwitch, setViewMoreSwitch] = useState(false);

    const rankFormatterAdd = (_: any, data: any, index: any) => {
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
                <div onClick={(e) => {
                    console.log('Create Order');
                }}>
                    <Plus style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterViewMore = (_: any, data: any, index: any) => {
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
                <div onClick={(e) => {
                    setViewMoreSwitch(true);
                }}
                >
                    <ThreeDots style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    // const rankFormatterEdit = (_: any, data: any, index: any) => {
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
    //             <div onClick={(e) => {
    //                 setSelectedQuote(data);
    //                 setEditQuoteSwitch(true);
    //             }}
    //             >
    //                 <Pencil style={{ fontSize: 20, color: 'white' }} />
    //             </div>
    //         </div>
    //     );
    // };
    // const rankFormatterRemove = (_: any, data: any, index: any) => {
    //     return (
    //         <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log('Remove Column')} >
    //             <Trash style={{ fontSize: 20, color: 'white' }} />
    //         </div>
    //     );
    // };
    const column_inner = [
        {
            id: 1,
            dataField: 'id',
            text: 'ID',
            sort: false,
        },
        {
            id: 2,
            dataField: 'numberOfProducts',
            text: 'Number of Products',
            sort: false,
        },
        {
            id: 3,
            dataField: 'quoter',
            text: 'Quoter',
            sort: true,
        },
        {
            id: 4,
            dataField: 'dateQuoted',
            text: 'Date',
            sort: true,
        },
        {
            id: 6,
            dataField: 'totalQuote',
            text: 'Total Quote',
            sort: true,
        },
        {
            id: 7,
            dataField: 'sold',
            text: 'Sold',
            sort: true,
        },
        {
            id: 8,
            dataField: 'view',
            text: 'View More',
            sort: false,
            formatter: rankFormatterViewMore,
            headerAlign: 'center',
        },
        {
            id: 9,
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
        setTimeout(() => {
            axios.get(`${BASE_API_URL}quotes/company/${companyId}`, { withCredentials: true })
                .then((response) => {
                    setQuotes(response?.data?.payload);
                })
                .catch((err) => {
                    console.log(err);
                })
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
                                    columns={column_inner}
                                    keyField="serial_number"
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
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedQuoteRow = withRouter(ExpandedQuoteRowComponent);
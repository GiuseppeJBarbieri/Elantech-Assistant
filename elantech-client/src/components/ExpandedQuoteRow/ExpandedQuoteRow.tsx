import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, Plus, ThreeDots, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../types/ICompany';
import IQuotedProduct from '../../types/IQuotedProduct';
import { AddMultiQuoteModal } from '../AddMultiQuoteModal/AddMultiQuoteModal';
import { EditQuoteModal } from '../EditQuoteModal/EditQuoteModal';
import { ViewQuotedProductsModal } from '../ViewQuotedProductsModal/ViewQuotedProductsModal';

interface ExpandedQuoteRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedCompany: ICompany | undefined;
}

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const [addQuoteSwitch, setAddQuoteSwitch] = useState(false);
    const [editQuoteSwitch, setEditQuoteSwitch] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState<IQuotedProduct>();
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
    const rankFormatterEdit = (_: any, data: any, index: any) => {
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
                    setSelectedQuote(data);
                    setEditQuoteSwitch(true);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
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
    const column_inner_2 = [
        {
            id: 1,
            dataField: "quote_id",
            text: "Quote ID",
            sort: false,
        },
        {
            id: 2,
            dataField: "num_of_products",
            text: "Number of Products",
            sort: false,
        },
        {
            id: 3,
            dataField: "quoter",
            text: "Quoter",
            sort: true,
        },
        {
            id: 4,
            dataField: "date",
            text: "Date",
            sort: true,
        },
        {
            id: 5,
            dataField: "time",
            text: "Time",
            sort: true,
        },
        {
            id: 6,
            dataField: "total_quote",
            text: "Total Quote",
            sort: true,
        },
        {
            id: 7,
            dataField: "sold",
            text: "Sold",
            sort: true,
        },
        {
            id: 8,
            dataField: "view",
            text: "View More",
            sort: false,
            formatter: rankFormatterViewMore,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 9,
            dataField: "Add",
            text: "Create Order",
            sort: false,
            formatter: rankFormatterAdd,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
    ];
    const fake_data_2 = [
        {
            quote_id: 1,
            num_of_products: 2,
            quoter: 'Giuseppe',
            date: '04-29-2022',
            time: '12:43',
            total_quote: '$5,500.00',
            sold: 'Yes'
        },
        {
            quote_id: 2,
            num_of_products: 2,
            quoter: 'Giuseppe',
            date: '04-29-2022',
            time: '12:43',
            total_quote: '$5,500.00',
            sold: 'Yes'
        },
        {
            quote_id: 3,
            num_of_products: 2,
            quoter: 'Giuseppe',
            date: '04-29-2022',
            time: '12:43',
            total_quote: '$5,500.00',
            sold: 'No'
        },
        {
            quote_id: 4,
            num_of_products: 2,
            quoter: 'Giuseppe',
            date: '04-29-2022',
            time: '12:43',
            total_quote: '$5,500.00',
            sold: 'No'
        },
    ];
    const column_inner = [

        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: false,
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
        },
        {
            id: 3,
            dataField: "quoted_price",
            text: "Quoted Price",
            sort: true,
        },
        {
            id: 4,
            dataField: "condition",
            text: "Condition",
            sort: true,
        },
        {
            id: 5,
            dataField: "date_quoted",
            text: "Date",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 6,
            dataField: "time_quoted",
            text: "Time",
            sort: false,
        },
        {
            id: 7,
            dataField: "comments",
            text: "Comments",
            sort: false,
        },
        {
            id: 8,
            dataField: "who_quoted",
            text: "Quoter",
            sort: true,
        },
        {
            id: 9,
            dataField: "sold",
            text: "Sold",
            sort: true,
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
            id: 12,
            dataField: "remove",
            text: "Delete",
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        }
    ];
    const fake_data = [
        {
            quote_id: 1,
            quantity: 1,
            product_number: '875001-B21',
            condition: 'Refurbished',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 2,
            quantity: 2,
            product_number: '875001-B21',
            condition: 'Refurbished',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 3,
            quantity: 13,
            product_number: '875001-B21',
            condition: 'Refurbished',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
        {
            quote_id: 4,
            quantity: 100,
            product_number: '875001-B21',
            condition: 'Refurbished',
            quoted_price: '$38.99',
            date_quoted: '2022-03-07',
            time_quoted: '13:40',
            comments: 'Nothing to say in the comments section.',
            who_quoted: 'Giuseppe',
            sold: 'No',
        },
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: fake_data.length

    };
    // const getAllQuotes = () => {
    //     setTimeout(() => {
    //       axios.get(`${BASE_API_URL}quotes`, { withCredentials: true })
    //         .then((response) => {
    //           setQuoteList(response?.data?.payload);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //     }, 400)
    //   };
    //   useEffect(() => {
    //     getAllQuotes();
    //   }, []);
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
                                    columns={column_inner_2}
                                    keyField="serial_number"
                                    data={fake_data_2}
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
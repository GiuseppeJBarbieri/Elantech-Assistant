import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, ThreeDots, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../types/ICompany';
import IQuote from '../../types/IQuote';
import { requestAllQuotesByCompanyID } from '../../utils/Requests';
import { AddMultiQuoteModal } from '../Modals/Quote/AddMultiQuoteModal';
import { EditQuoteModal } from '../Modals/Quote/EditQuoteModal';
import { ViewQuotedProductsModal } from '../Modals/QuotedProducts/ViewQuotedProductsModal';
import { RemoveQuoteModal } from '../Modals/Quote/RemoveQuoteModal';
import './ExpandedQuoteRow.css';

interface ExpandedQuoteRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedCompany: ICompany;
    fetchCompanies: () => void;
}

enum ModalType {
    ADD = 'add',
    EDIT = 'edit',
    VIEW_MORE = 'viewMore',
    REMOVE = 'remove',
}

const createActionCell = (onClick: () => void, Icon: React.ElementType) => (
    <div className="action-cell" onClick={(e) => e.stopPropagation()}>
        <div onClick={onClick}>
            <Icon className="action-icon" />
        </div>
    </div>
);

const getColumnDefinitions = (
    onViewMore: (quote: IQuote) => void,
    onEdit: (quote: IQuote) => void,
    onRemove: (quote: IQuote) => void
) => [
    {
        dataField: 'quantity',
        text: 'Number of Products',
        formatter: (_: any, row: IQuote) =>
            row.quotedProducts?.reduce((sum, p) => sum + p.quantity, 0),
        sort: false,
    },
    {
        dataField: 'quotedBy',
        text: 'Quoted By',
        formatter: (_: any, row: IQuote) => `${row.user?.firstName}  ${row.user?.lastName}`,
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
        formatter: (_: any, row: IQuote) => {
            const total = row.quotedProducts?.reduce((sum, p) => sum + (p.quotedPrice || 0), 0);
            return `$${total?.toFixed(2)}`;
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
        formatter: (_: any, row: IQuote) => createActionCell(() => onViewMore(row), ThreeDots),
        headerAlign: 'center',
    },
    {
        dataField: 'edit',
        text: 'Edit',
        sort: false,
        formatter: (_: any, row: IQuote) => createActionCell(() => onEdit(row), Pencil),
        headerAlign: 'center',
    },
    {
        dataField: 'remove',
        text: 'Delete',
        sort: false,
        formatter: (_: any, row: IQuote) => createActionCell(() => onRemove(row), Trash),
        headerAlign: 'center',
    },
];

const ExpandedQuoteRowComponent: FunctionComponent<ExpandedQuoteRowProps> = (props) => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<IQuote | null>(null);

    const handleAction = (modalType: ModalType, quote: IQuote) => {
        setSelectedQuote(quote);
        setActiveModal(modalType);
    };

    const columns = useMemo(() => getColumnDefinitions(
        (quote) => handleAction(ModalType.VIEW_MORE, quote),
        (quote) => handleAction(ModalType.EDIT, quote),
        (quote) => handleAction(ModalType.REMOVE, quote)
    ), []);

    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: quotes.length
    };

    const getAllQuotes = async (companyId: number) => {
        try {
            const fetchedQuotes = await requestAllQuotesByCompanyID(companyId);
            setQuotes(fetchedQuotes);
        } catch (err) {
            console.error("Failed to fetch quotes:", err);
        }
    };

    useEffect(() => {
        if (props.selectedCompany.id) {
            getAllQuotes(props.selectedCompany.id);
        }
    }, []);

    return (
        <div className='expanded-quote-row'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Quotes</Navbar.Brand>
                <Nav className="me-auto quote-nav">
                    <Nav.Link onClick={() => setActiveModal(ModalType.ADD)}>
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
                                            columns={columns}
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
                activeModal === ModalType.ADD &&
                <div className='modal-dialog'>
                    <AddMultiQuoteModal
                        modalVisible={activeModal === ModalType.ADD}
                        selectedCompany={props.selectedCompany}
                        getAllQuotes={getAllQuotes}
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
            {
                activeModal === ModalType.EDIT && selectedQuote &&
                <div className='modal-dialog'>
                    <EditQuoteModal
                        modalVisible={activeModal === ModalType.EDIT}
                        selectedCompany={props.selectedCompany}
                        selectedQuote={selectedQuote}
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
            {
                activeModal === ModalType.VIEW_MORE && selectedQuote &&
                <div className='modal-dialog'>
                    <ViewQuotedProductsModal
                        modalVisible={activeModal === ModalType.VIEW_MORE}
                        onClose={() => setActiveModal(null)}
                        selectedCompany={props.selectedCompany}
                        selectedQuote={selectedQuote}
                    />
                </div>
            }
            {
                activeModal === ModalType.REMOVE && selectedQuote &&
                <div className='modal-dialog'>
                    <RemoveQuoteModal
                        modalVisible={activeModal === ModalType.REMOVE}
                        selectedQuote={selectedQuote}
                        getAllQuotes={getAllQuotes}
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedQuoteRow = withRouter(ExpandedQuoteRowComponent);
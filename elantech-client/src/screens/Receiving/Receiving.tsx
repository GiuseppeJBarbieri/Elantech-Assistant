import React, { FunctionComponent, HTMLAttributes, useState, useCallback, useMemo } from 'react';
import { Button, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import { Pencil, Plus, Search, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AddReceivingOrderModal } from '../../components/Modals/Receiving/AddReceivingOrderModal';
import { EditReceivingOrderModal } from '../../components/Modals/Receiving/EditReceivingOrderModal';
import { ExpandedReceivingRow } from '../../components/ExpandedReceivingRow/ExpandedReceivingRow';
import IReceiving from '../../types/IReceiving';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { defaultReceiving } from '../../constants/Defaults';
import { RemoveReceivingOrderModal } from '../../components/Modals/Receiving/RemoveReceivingOrderModal';
import { UseReceiving } from '../../hooks/UseReceiving';
import { CustomAlert } from '../../components/Alerts/CustomAlert';

interface ReceivingProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

enum ModalType {
    ADD = 'add',
    EDIT = 'edit',
    REMOVE = 'remove',
}

const getColumns = (
    rankFormatterEdit: (cell: any, row: IReceiving) => JSX.Element,
    rankFormatterRemove: (cell: any, row: IReceiving) => JSX.Element
): ColumnDescription<any, any>[] => ([
    {
        dataField: 'purchaseOrderNumber',
        text: 'PO Number',
        sort: true,
    },
    {
        dataField: 'company.name',
        text: 'Purchased From',
        sort: false,
    },
    {
        dataField: 'receivedBy',
        text: 'Received By',
        formatter: (cell: any, row: any) => {
            return `${row.user.firstName ?? 'Fname'}  ${row.user.lastName ?? 'Lname'}`;
        },
        sort: false,
    },
    {
        dataField: 'orderType',
        text: 'Order Type',
        sort: true,
    },
    {
        dataField: 'trackingNumber',
        text: 'Tracking Number',
        sort: false,
    },
    {
        dataField: 'shippedVia',
        text: 'Shipped Via',
        sort: false,
    },
    {
        dataField: 'dateReceived',
        text: 'Date Received',
        sort: true,
    },
    {
        dataField: 'comment',
        text: 'Comments',
        sort: false,
    },
    {
        dataField: 'completed',
        text: 'Completed',
        sort: true,
    },
    {
        dataField: 'edit',
        text: 'Edit',
        sort: false,
        formatter: rankFormatterEdit,
        headerAlign: 'center',
        style: { textAlign: 'center' }
    },
    {
        dataField: 'remove',
        text: 'Delete',
        sort: false,
        formatter: rankFormatterRemove,
        headerAlign: 'center',
        style: { textAlign: 'center' }
    },
]);

export const ReceivingLayout: FunctionComponent<ReceivingProps> = ({ history }) => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [searchString, setSearchString] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [selectedReceiving, setSelectedReceiving] = useState<IReceiving>(defaultReceiving);
    const { receivingList, alert, fetchReceiving } = UseReceiving();

    const handleEditClick = useCallback((receiving: IReceiving) => {
        setSelectedReceiving(receiving);
        setActiveModal(ModalType.EDIT);
    }, []);

    const handleRemoveClick = useCallback((receiving: IReceiving) => {
        setSelectedReceiving(receiving);
        setActiveModal(ModalType.REMOVE);
    }, []);

    const rankFormatterRemove = useCallback((_: unknown, data: IReceiving) => {
        return (
            <div
                className='action-cell'
                onClick={(e) => { e.stopPropagation(); handleRemoveClick(data); }}>
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    }, [handleRemoveClick]);

    const rankFormatterEdit = useCallback((_: any, data: IReceiving) => {
        return (
            <div
                className='action-cell'
                onClick={(e) => { e.stopPropagation(); handleEditClick(data); }}>
                <Pencil style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    }, [handleEditClick]);

    const columns = useMemo(() => getColumns(rankFormatterEdit, rankFormatterRemove), [rankFormatterEdit, rankFormatterRemove]);

    const displayedReceiving = useMemo(() => {
        if (!searchString) {
            return receivingList;
        }
        return receivingList.filter(receiving =>
            Object.values(receiving).some(value =>
                value?.toString().toLowerCase().includes(searchString.toLowerCase())
            )
        );
    }, [receivingList, searchString]);

    const handleSearch = (input: string) => {
        if (input.trim() && !searchHistory.includes(input)) {
            const newHistory = [input, ...searchHistory].slice(0, 5);
            setSearchHistory(newHistory);
        }
        setSearchString(input);
    };

    const customTotal = (from: number, to: number, size: number) => {
        return (
            <span className='react-bootstrap-table-pagination-total'
                style={{ marginLeft: 5 }}>
                {size} Results
            </span>)
    };

    const options = {
        showTotal: true,
        paginationTotalRenderer: customTotal
    };

    return (
        <section className='text-white main-section overflow-auto'>
            <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
            <div style={{ padding: 20 }}>
                <div className='d-flex justify-content-between'>
                    <h2 style={{ fontWeight: 300 }}>Receiving</h2>
                    <div>
                        <Button variant='dark' onClick={() => { setActiveModal(ModalType.ADD) }} >
                            <Plus height='25' width='25' style={{ marginTop: -3, marginLeft: -10 }} />New Order
                        </Button>
                    </div>
                </div>
                <hr />
                <ToolkitProvider
                    keyField='id'
                    data={displayedReceiving}
                    columns={columns}
                    search
                >
                    {
                        props => {
                            return (
                                <div>
                                    <div className='d-flex' style={{ width: 'max-content' }}>
                                        <InputGroup className='mb-1'>
                                            <InputGroup.Text id='basic-addon2'>
                                                <Search />
                                            </InputGroup.Text>
                                            <DebounceInput
                                                type='text'
                                                className='debounce'
                                                placeholder='Search...'
                                                debounceTimeout={500}
                                                value={searchString}
                                                onChange={e => {
                                                    handleSearch(e.target.value);
                                                }}
                                            />
                                        </InputGroup>
                                        <div className='d-flex'>
                                            <DropdownButton
                                                key={'dark'}
                                                variant='dark'
                                                menuVariant='dark'
                                                title=''
                                                onSelect={e => {
                                                    setTimeout(() => handleSearch(e as string), 100);
                                                }}
                                            >
                                                {searchHistory.length > 0 ?
                                                    searchHistory.map((o, index) => {
                                                        return <Dropdown.Item key={index} eventKey={o}>{o}</Dropdown.Item>;
                                                    })
                                                    :
                                                    <Dropdown.Item disabled>No History</Dropdown.Item>}
                                                <Dropdown.Item eventKey=''>Clear</Dropdown.Item>
                                            </DropdownButton>
                                        </div>
                                    </div>
                                    <br />
                                    <BootstrapTable
                                        {...props.baseProps}
                                        bootstrap4
                                        classes='table table-dark table-hover table-striped table-responsive'
                                        noDataIndication='Table is Empty'
                                        pagination={paginationFactory(options)}
                                        expandRow={{
                                            onlyOneExpanding: true,
                                            renderer: (row) => {
                                                return (
                                                    <ExpandedReceivingRow
                                                        receiving={row}
                                                        getAllReceiving={fetchReceiving}
                                                    />
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            );
                        }
                    }
                </ToolkitProvider>
            </div>
            {
                activeModal === ModalType.ADD &&
                <div className='modal-dialog'>
                    <AddReceivingOrderModal
                        getAllReceiving={fetchReceiving}
                        onClose={async () => {
                            setActiveModal(null);
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.EDIT &&
                <div className='modal-dialog'>
                    <EditReceivingOrderModal
                        selectedReceiving={selectedReceiving}
                        getAllReceiving={fetchReceiving}
                        onClose={async () => {
                            setActiveModal(null);
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.REMOVE &&
                <div className='modal-dialog'>
                    <RemoveReceivingOrderModal
                        selectedReceiving={selectedReceiving}
                        getAllReceiving={fetchReceiving}
                        onClose={async () => setActiveModal(null)}
                    />
                </div>
            }
        </section>
    );
};

export const Receiving = withRouter(ReceivingLayout);

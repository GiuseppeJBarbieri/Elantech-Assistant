import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Button, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import { Pencil, Plus, Search, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AddReceivingOrderModal } from '../../components/Modals/Receiving/AddReceivingOrderModal';
import { EditReceivingOrderModal } from '../../components/Modals/Receiving/EditReceivingOrderModal';
import { ExpandedReceivingRow } from '../../components/ExpandedReceivingRow/ExpandedReceivingRow';
import IReceiving from '../../types/IReceiving';
import { requestAllReceiving } from '../../utils/Requests';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { SpinnerBlock } from '../../components/LoadingAnimation/SpinnerBlock';
import { DebounceInput } from 'react-debounce-input';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { defaultReceiving } from '../../constants/Defaults';
import { RemoveReceivingOrderModal } from '../../components/Modals/Receiving/RemoveReceivingOrderModal';

interface ReceivingProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const ReceivingLayout: FunctionComponent<ReceivingProps> = ({ history }) => {
    const [addReceivingSwitch, setAddReceivingSwitch] = useState(false);
    const [editOrderSwitch, setEditOrderSwitch] = useState(false);
    const [removeOrderSwitch, setRemoveOrderSwitch] = useState(false);
    const [receivingList, setReceivingList] = useState<IReceiving[]>([]);
    const [selectedReceiving, setSelectedReceiving] = useState<IReceiving>(defaultReceiving);
    const [isSearching] = useState(false);
    const [searchString, setSearchString] = useState<string>('');
    const [searchHistoryFilterText, setSearchHistoryFilterText] = useState('Search History');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const rankFormatterRemove = (_: unknown, data: any) => {
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
              setSelectedReceiving(data);
              setRemoveOrderSwitch(true);
            }}
            >
              <Trash style={{ fontSize: 20, color: 'white' }} />
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
                    setSelectedReceiving(data);
                    setEditOrderSwitch(true);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column: ColumnDescription<any, any>[] = [
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
            style: {
                textAlign: 'center'
            }
        },
        {
            dataField: 'remove',
            text: 'Delete',
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
    ];
    const handleSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        if (input !== '' || input !== undefined) {
            const result = searchHistory.includes(input);
            if (!result) { input.length > 0 && searchHistory.push(input) }

            searchHistory.length > 5 && setSearchHistory(searchHistory.slice(1, searchHistory.length));
            setSearchString(input);
        } else {
            setSearchHistoryFilterText('Search History');
        }
        props.onSearch(input);
    };
    const customTotal = (from: number, to: number, size: number) => {
        return (
            <span className="react-bootstrap-table-pagination-total"
                style={{ marginLeft: 5 }}>
                {size} Results
            </span>)
    };
    const options = {
        showTotal: true,
        paginationTotalRenderer: customTotal
    };
    const getAllReceiving = async () => {
        // API call to get all receiving
        const receiving = await requestAllReceiving();
        setReceivingList(receiving);
    }
    React.useEffect(() => {
        getAllReceiving();
    }, []);
    return (
        <section className="text-white main-section overflow-auto">
            <div style={{ padding: 20 }}>
                <ToolkitProvider
                    keyField="id"
                    data={receivingList}
                    columns={column}
                    search
                >
                    {
                        props => {
                            return (
                                <div>
                                    {isSearching ?
                                        <SpinnerBlock />
                                        :
                                        <div>
                                            <div className='d-flex justify-content-between'>
                                                <h2 style={{ fontWeight: 300 }}>Receiving</h2>
                                                {

                                                    <div>
                                                        <Button variant="dark" onClick={() => { setAddReceivingSwitch(true) }} >
                                                            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Order
                                                        </Button>
                                                    </div> 

                                                }
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex justify-space-between'>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text id="basic-addon2">
                                                            <Search />
                                                        </InputGroup.Text>
                                                        <DebounceInput
                                                            type="text"
                                                            className='debounce'
                                                            placeholder="Search..."
                                                            debounceTimeout={500}
                                                            value={searchString}
                                                            onChange={e => {
                                                                handleSearch(e.target.value, { ...props.searchProps });
                                                            }} />
                                                    </InputGroup>
                                                    <InputGroup className="mb-3">
                                                        <DropdownButton
                                                            key={'dark'}
                                                            variant="dark"
                                                            menuVariant="dark"
                                                            title={searchHistoryFilterText}
                                                            onSelect={e => {
                                                                setTimeout(() => handleSearch(e as string, { ...props.searchProps }), 100);
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
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <br />
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bootstrap4
                                                striped
                                                hover
                                                noDataIndication='TABLE IS EMPTY'
                                                pagination={paginationFactory(options)}
                                                filter={filterFactory()}
                                                classes="table table-dark table-hover table-striped table-responsive"
                                                expandRow={{
                                                    onlyOneExpanding: true,
                                                    renderer: (row, index) => {
                                                        return (
                                                            <ExpandedReceivingRow
                                                                receiving={row}
                                                                getAllReceiving={getAllReceiving} />
                                                        )
                                                    }
                                                }} />
                                        </div>
                                    }
                                </div>
                            );
                        }
                    }
                </ToolkitProvider>
            </div>
            {
                addReceivingSwitch &&
                <div className='modal-dialog'>
                    <AddReceivingOrderModal
                        getAllReceiving={getAllReceiving}
                        onClose={async () => {
                            setAddReceivingSwitch(false);
                        }}
                    />
                </div>
            }
            {
                editOrderSwitch &&
                <div className='modal-dialog'>
                    <EditReceivingOrderModal
                        selectedReceiving={selectedReceiving}
                        getAllReceiving={getAllReceiving}
                        onClose={async () => {
                            setEditOrderSwitch(false);
                        }}
                    />
                </div>
            }
            {
                removeOrderSwitch &&
                <div className='modal-dialog'>
                    <RemoveReceivingOrderModal
                    selectedReceiving={selectedReceiving}
                    getAllReceiving={getAllReceiving}
                    onClose={async () => {
                        setRemoveOrderSwitch(false);
                    }}
                    />
                </div>
            }
        </section>
    );
};

export const Receiving = withRouter(ReceivingLayout);

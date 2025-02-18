/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EditReceivedProductOrderModal } from '../Modals/Receiving/EditReceivedProductOrderModal';
import { ReceivingAddProductModal } from '../Modals/Receiving/ReceivingAddProductModal';
import IReceivedItem from '../../types/IReceivedItem';
import { requestAllReceivedItems } from '../../utils/Requests';
import IReceiving from '../../types/IReceiving';

interface ExpandedReceivingRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    receiving: IReceiving;
    getAllReceiving: () => void;
}

const ExpandedReceivingRowComponent: FunctionComponent<ExpandedReceivingRowProps> = (props) => {
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [addProductSwitch, setAddProductSwitch] = useState(false);
    const [receivedItemList, setReceivedItemList] = useState<IReceivedItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<IReceivedItem | null>(null);

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
                    // add 3rd switch for adding inventory from here
                    setAddInventorySwitch(true);
                }}>
                    <Plus style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterEdit = (cell: any, row: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}>
                <div onClick={(e) => {
                    e.stopPropagation();

                    setSelectedItem(row);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterRemove = (cell: any, row: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log(`Remove Column ${row.id} (${row.product.productNumber})`)} >
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    };
    const column_inner: ColumnDescription<any, any>[] = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: false,
        },
        {
            dataField: 'product.productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            dataField: 'product.productType',
            text: 'Type',
            sort: true,
        },
        {
            dataField: 'product.brand',
            text: 'Brand',
            sort: true,
        },
        {
            dataField: 'product.description',
            text: 'Description',
            sort: true,
        },
        {
            dataField: 'cud',
            text: 'CUD',
            sort: true,
        },
        {
            dataField: 'finishedAdding',
            text: 'Added',
            sort: true,
        },
        {
            dataField: 'Add',
            text: 'Receive Item',
            sort: false,
            formatter: rankFormatterAdd,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
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
        }
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: receivedItemList.length
    };
    const getAllReceivedItems = async () => {
        if (props.receiving.id !== undefined) {
            const receiving = await requestAllReceivedItems(props.receiving.id);
            setReceivedItemList(receiving);
        }
    }
    React.useEffect(() => {
        getAllReceivedItems();
    }, []);
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Received Products</Navbar.Brand>
                <Nav className="me-auto" style={{ marginBottom: -3 }}>
                    {/* <Nav.Link onClick={() => {
                        setAddProductSwitch(true);
                    }}>Add Product</Nav.Link> */}
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
                                    keyField="id"
                                    data={receivedItemList}
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
                selectedItem &&
                <div className='modal-dialog'>
                    <EditReceivedProductOrderModal
                        selectedItem={selectedItem}
                        getAllReceivedItems={getAllReceivedItems}
                        onClose={async () => {
                            setSelectedItem(null);
                        }}
                    />
                </div>
            }
            {
                addInventorySwitch &&
                <div className='modal-dialog'>
                    {/* <AddInventoryModal
                        modalVisible={addInventorySwitch}
                        onClose={async () => {
                            setAddInventorySwitch(false);
                            // if it was added
                            // set to added for product
                        }}
                    /> */}
                </div>
            }
            {
                addProductSwitch &&
                <div className='modal-dialog'>
                    <ReceivingAddProductModal
                        modalVisible={addProductSwitch}
                        onClose={async () => {
                            setAddProductSwitch(false);
                            // if it was added
                            // set to added for product
                        }}
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedReceivingRow = withRouter(ExpandedReceivingRowComponent);

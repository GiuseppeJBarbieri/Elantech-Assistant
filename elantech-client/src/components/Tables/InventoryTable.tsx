import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { EditInventoryModal } from '../Modals/Inventory/EditInventoryModal';
import { RemoveInventoryModal } from '../Modals/Inventory/RemoveInventoryModal';
import { requestUpdateInventory } from '../../utils/Requests';
import { EditMultipleInventoryModal } from '../Modals/Inventory/EditMultipleInventoryModal';


interface InventoryTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    inventory: IInventory[];
    getAllInventory: (productId: number) => void
    selectedProduct: IProduct;
    getAllProducts: () => void;
}

const InventoryTableComponent: FunctionComponent<InventoryTableProps> = (props) => {
    const [inventoryList, setInventoryList] = useState<IInventory[]>([]);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [editInventorySwitch, setEditInventorySwitch] = useState(false);
    const [removeInventorySwitch, setRemoveInventorySwitch] = useState(false);
    const [tempSelected, setTempSelected] = useState<string[]>([]);
    const [editMultipleInventorySwitch, setEditMultipleInventorySwitch] = useState(false);
    const [lastSelected, setLastSelected] = useState(-1);
    const [selectedInventory, setSelectedInventory] = useState<IInventory>(
        {
            id: 0,
            productId: 0,
            removedInventoryId: 0,
            purchaseOrderId: 0,
            serialNumber: '',
            condition: '',
            warrantyExpiration: new Date(),
            tested: false,
            testedDate: new Date(),
            comment: '',
            location: '',
            reserved: false,
            receiving: {
                id: 0,
                companyId: 0,
                userId: 0,
                purchaseOrderNumber: '',
                orderType: '',
                trackingNumber: '',
                dateReceived: new Date(),
                shippedVia: '',
                comment: '',
                company: {
                    name: '',
                }
            }
        }
    );
    const rankFormatterRemove = (_: any, data: any, index: any) => {
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
                <div onClick={(e) => {
                    setRemoveInventorySwitch(true);
                    setSelectedInventory(data);

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
                    setEditInventorySwitch(true);
                    setSelectedInventory(data);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const handleConditionSort = (order: string) => {
        if (order === 'desc') {
            inventoryList.sort((a, b) => b.condition.localeCompare(a.condition));
        } else {
            inventoryList.sort((a, b) => a.condition.localeCompare(b.condition));
        }
    }
    const columns = [
        {
            id: 1,
            dataField: 'serialNumber',
            text: 'Serial Number',
            sort: false,
        },
        {
            id: 2,
            dataField: 'condition',
            text: 'Condition',
            sort: true,
            onSort: (field: any, order: string) => {
                handleConditionSort(order);
            }
        },
        {
            id: 3,
            dataField: 'receiving.company.name',
            text: 'Company Name',
            sort: false,
        },
        {
            id: 4,
            dataField: 'receiving.purchaseOrderNumber',
            text: 'Order Number',
            sort: false,
        },
        {
            id: 5,
            dataField: 'receiving.dateReceived',
            text: 'Date Received',
            sort: true,
        },
        {
            id: 6,
            dataField: 'warrantyExpiration',
            text: 'Warranty Expiration',
            sort: false,
        },
        {
            id: 7,
            dataField: 'comment',
            text: 'Comment',
            sort: false,
        },
        {
            id: 8,
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            id: 9,
            dataField: 'testedDate',
            text: 'Date Tested',
            sort: false,
        },
        {
            id: 10,
            dataField: 'tested',
            text: 'Tested',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: 'reserved',
            text: 'Reserved',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: 'edit',
            text: 'Edit',
            sort: false,
            formatter: rankFormatterEdit,
        },
        {
            id: 12,
            dataField: 'remove',
            text: 'Remove',
            sort: false,
            formatter: rankFormatterRemove,
        }
    ];
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#0da7fd73 !important',
        selected: tempSelected,
        selectColumnStyle:
        {

        },
        onSelect: (row: IInventory, isSelect: boolean, rowIndex: number, e: any) => {
            if (e.shiftKey) {
                if (isSelect === true && lastSelected !== -1) {
                    if (lastSelected > rowIndex) {
                        for (let i = lastSelected; i > rowIndex; i--) {
                            if (!selectedInventoryList.includes(inventoryList[i])) selectedInventoryList.push(inventoryList[i]);
                            if (!tempSelected.includes(inventoryList[i].serialNumber)) tempSelected.push(inventoryList[i].serialNumber);
                            setLastSelected(-1);
                        }
                    } else {
                        for (let i = lastSelected; i < rowIndex; i++) {
                            if (!selectedInventoryList.includes(inventoryList[i])) selectedInventoryList.push(inventoryList[i]);
                            if (!tempSelected.includes(inventoryList[i].serialNumber)) tempSelected.push(inventoryList[i].serialNumber);
                            setLastSelected(-1);
                        }
                    }
                }
                if (lastSelected === -1) {
                    setLastSelected(rowIndex);
                }
            }
            if (isSelect === true) {
                // Add inventory to list
                selectedInventoryList.push(row);
                tempSelected.push(row.serialNumber);
                setSelectedInventoryList([...selectedInventoryList]);
                setLastSelected(rowIndex);
            } else {
                // Remove Inventory from list
                const index = selectedInventoryList.indexOf(row);
                selectedInventoryList.splice(index, 1);
                tempSelected.splice(index, 1);
                setSelectedInventoryList([...selectedInventoryList]);
            }
        },
        onSelectAll: (isSelect: any, rows: IInventory[], e: any) => {
            setLastSelected(-1);
            if (isSelect === true) {
                for (let i = 0; i < rows.length; i++) {
                    selectedInventoryList.push(rows[i]);
                    tempSelected.push(rows[i].serialNumber);
                }
                setSelectedInventoryList([...selectedInventoryList]);

            } else {
                setSelectedInventoryList([]);
                setTempSelected([]);
            }
        }
    };
    // This will probably be removed
    const reserveItem = () => {
        selectedInventoryList.forEach((inventory: IInventory) => {
            if (inventory.reserved == null) {
                inventory.reserved = true;
            } else {
                inventory.reserved = !inventory.reserved;
            }
            requestUpdateInventory(inventory);
        });
        if (props.selectedProduct.id !== undefined) {
            props.getAllInventory(props.selectedProduct.id);
        }
    };
    useEffect(() => {
        setInventoryList(props.inventory);
    });
    return (
        <div>
            <br />
            <div>
                <div>
                    <div className='d-flex flex-row-reverse' style={{ marginBottom: 5 }}>
                        <input type='text'
                            className="form-control custom-input d-flex flex-row-reverse"
                            placeholder="0"
                            value={selectedInventoryList.length}
                            readOnly={true}
                            style={{ width: 70, textAlign: 'center', marginLeft: 5 }}
                        />
                        {
                            selectedInventoryList.length > 0 &&
                            <div className='fade-in-right' aria-controls="example-fade-text">
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        reserveItem();
                                    }}>
                                    Reserve Items
                                </Button>
                            </div>
                        }
                        {
                            selectedInventoryList.length > 1 &&
                            <div className='fade-in-right' aria-controls="example-fade-text">
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setEditMultipleInventorySwitch(true);
                                    }}
                                >
                                    Edit Multiple Inventory
                                </Button>
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setRemoveInventorySwitch(true);
                                    }}
                                >
                                    Remove Multiple
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ overflowX: 'auto', maxHeight: 500 }} className='no-highlight'>
                <BootstrapTable
                    key='inventory_table'
                    bootstrap4
                    condensed
                    selectRow={selectRow as SelectRowProps<IInventory>}
                    data={inventoryList}
                    columns={columns}
                    keyField='serialNumber'
                    classes="table table-dark table-hover table-striped"
                    noDataIndication="Table is Empty"
                />
            </div>
            {
                editInventorySwitch &&
                <div className='modal-dialog'>
                    <EditInventoryModal
                        modalVisible={editInventorySwitch}
                        selectedInventory={selectedInventory}
                        getAllInventory={props.getAllInventory}
                        selectedProduct={props.selectedProduct}
                        onClose={async () => {
                            setEditInventorySwitch(false);
                        }}
                    />
                </div>
            }
            {
                removeInventorySwitch &&
                <div className='modal-dialog'>
                    <RemoveInventoryModal
                        modalVisible={removeInventorySwitch}
                        selectedInventory={selectedInventory}
                        selectedInventoryList={selectedInventoryList}
                        getAllInventory={props.getAllInventory}
                        getAllProducts={props.getAllProducts}
                        selectedProduct={props.selectedProduct}
                        onClose={async () => {
                            setRemoveInventorySwitch(false);
                            setSelectedInventoryList([]);
                        }}
                    />
                </div>
            }
            {
                editMultipleInventorySwitch &&
                <div className='modal-dialog'>
                    <EditMultipleInventoryModal
                        modalVisible={editMultipleInventorySwitch}
                        selectedInventory={selectedInventoryList}
                        getAllInventory={props.getAllInventory}
                        selectedProduct={props.selectedProduct}
                        getAllProducts={props.getAllProducts}
                        onClose={async () => {
                            setEditMultipleInventorySwitch(false);
                        }}
                    />
                </div>
            }
        </div >
    );
};

export const InventoryTable = withRouter(InventoryTableComponent);

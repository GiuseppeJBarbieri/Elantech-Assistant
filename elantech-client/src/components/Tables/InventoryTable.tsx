import React, { FunctionComponent, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { requestUpdateInventory } from '../../utils/Requests';
import { EditMultipleInventoryModal } from '../Modals/Inventory/EditMultipleInventoryModal';
import { EditInventoryModal } from '../Modals/Inventory/EditInventoryModal';
import { RemoveInventoryModal } from '../Modals/Inventory/RemoveInventoryModal';
import './InventoryTable.css';

interface InventoryTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    inventory: IInventory[];
    selectedProduct: IProduct;
    onInventoryUpdate: (productId: number) => void;
}

enum ModalType {
    EDIT,
    REMOVE,
    EDIT_MULTIPLE,
}

const dateFormatter = (cell: string | Date | undefined | null) => {
    if (!cell) return '';
    try {
        return new Date(cell).toISOString().split("T")[0];
    } catch (e) {
        return '';
    }
};

const createActionCell = (onClick: () => void, Icon: React.ElementType) => (
    <div className="action-cell" onClick={(e) => e.stopPropagation()}>
        <div onClick={onClick}>
            <Icon className="action-icon" />
        </div>
    </div>
);

const getColumnDefinitions = (
    onEdit: (inventory: IInventory) => void,
    onRemove: (inventory: IInventory) => void
) => [
        { dataField: 'serialNumber', text: 'Serial Number', sort: false },
        { dataField: 'condition', text: 'Condition', sort: true },
        { dataField: 'receiving.company.name', text: 'Company Name', sort: false },
        { dataField: 'receiving.purchaseOrderNumber', text: 'Order Number', sort: false },
        { dataField: 'receiving.dateReceived', text: 'Date Received', sort: true, formatter: dateFormatter },
        { dataField: 'warrantyExpiration', text: 'Warranty Expiration', sort: false, formatter: dateFormatter },
        { dataField: 'comment', text: 'Comment', sort: false },
        { dataField: 'location', text: 'Location', sort: false },
        { dataField: 'testedDate', text: 'Date Tested', sort: false, formatter: dateFormatter },
        { dataField: 'tested', text: 'Tested', sort: false, headerAlign: 'center' },
        { dataField: 'reserved', text: 'Reserved', sort: false, headerAlign: 'center' },
        {
            dataField: 'edit',
            text: 'Edit',
            sort: false,
            formatter: (_: any, row: IInventory) => createActionCell(() => onEdit(row), Pencil),
        },
        {
            dataField: 'remove',
            text: 'Remove',
            sort: false,
            formatter: (_: any, row: IInventory) => createActionCell(() => onRemove(row), Trash),
        },
    ];

const InventoryTableComponent: FunctionComponent<InventoryTableProps> = (props) => {
    const [inventoryList, setInventoryList] = useState<IInventory[]>(props.inventory);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [selectedInventory, setSelectedInventory] = useState<IInventory | null>(null);
    const [lastSelected, setLastSelected] = useState(-1);
    const tableRef = useRef<BootstrapTable<IInventory, any>>(null);

    const handleAction = (modalType: ModalType, inventory: IInventory) => {
        setSelectedInventory(inventory);
        setActiveModal(modalType);
    };

    const columns = useMemo(() => getColumnDefinitions(
        (inventory) => handleAction(ModalType.EDIT, inventory),
        (inventory) => handleAction(ModalType.REMOVE, inventory)
    ), []);

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#0da7fd73 !important',
        selected: selectedInventoryList.map(inv => inv.serialNumber),
        onSelect: (row: IInventory, isSelect: boolean, rowIndex: number, e: any) => {
            let newSelectedList = [...selectedInventoryList];

            if (e.shiftKey) {
                if (isSelect === true && lastSelected !== -1) {
                    const start = Math.min(lastSelected, rowIndex);
                    const end = Math.max(lastSelected, rowIndex);
                    if (lastSelected > rowIndex) {
                        for (let i = start; i <= end; i++) {
                            if (!newSelectedList.find(item => item.serialNumber === inventoryList[i].serialNumber)) {
                                newSelectedList.push(inventoryList[i]);
                            }
                        }
                        setLastSelected(-1);
                    }
                }
                if (lastSelected === -1) {
                    setLastSelected(rowIndex);
                }
            } else {
                setLastSelected(rowIndex);
            }

            if (isSelect === true) {
                if (!newSelectedList.find(item => item.serialNumber === row.serialNumber)) {
                    newSelectedList.push(row);
                }
            } else {
                newSelectedList = newSelectedList.filter(item => item.serialNumber !== row.serialNumber);
            }
            setSelectedInventoryList(newSelectedList);
        },
        onSelectAll: (isSelect: any, rows: IInventory[], e: any) => {
            setLastSelected(-1);
            setSelectedInventoryList(isSelect ? rows : []);
        }
    };

    const reserveItem = () => {
        selectedInventoryList.forEach((inventory: IInventory) => {
            const updatedInventory = { ...inventory, reserved: !inventory.reserved };
            requestUpdateInventory(updatedInventory);
        });
        if (props.selectedProduct.id !== undefined) {
            props.onInventoryUpdate(props.selectedProduct.id);
        }
    };

    useEffect(() => {
        setInventoryList(props.inventory);
    }, [props.inventory]);

    return (
        <div>
            <br />
            <div>
                <div>
                    <div className='d-flex flex-row-reverse inventory-controls'>
                        <input type='text'
                            className="form-control custom-input d-flex flex-row-reverse inventory-count-input"
                            placeholder="0"
                            value={selectedInventoryList.length}
                            readOnly={true}
                        />
                        {
                            selectedInventoryList.length > 0 &&
                            <div className='fade-in-right' aria-controls="example-fade-text">
                                <Button variant='dark' className="inventory-action-button"
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
                                <Button variant='dark' className="inventory-action-button"
                                    onClick={() => {
                                        setSelectedInventoryList([]);
                                        setActiveModal(ModalType.EDIT_MULTIPLE);
                                    }}
                                >
                                    Edit Multiple Inventory
                                </Button>
                                <Button variant='dark' className="inventory-action-button"
                                    onClick={() => setActiveModal(ModalType.REMOVE)}
                                >
                                    Remove Multiple
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='no-highlight inventory-table-container'>
                <BootstrapTable
                    ref={tableRef}
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
                activeModal === ModalType.EDIT && selectedInventory &&
                <div className='modal-dialog'>
                    <EditInventoryModal
                        modalVisible={activeModal === ModalType.EDIT}
                        selectedInventory={selectedInventory}
                        selectedProduct={props.selectedProduct}
                        onSuccess={() => {
                            props.onInventoryUpdate(props.selectedProduct.id as number);
                        }}
                        onClose={() => setActiveModal(null)}
                    />
                </div>
            }
            {
                activeModal === ModalType.REMOVE &&
                <div className='modal-dialog'>
                    <RemoveInventoryModal
                        modalVisible={activeModal === ModalType.REMOVE}
                        selectedInventory={selectedInventory!}
                        selectedInventoryList={selectedInventoryList}
                        selectedProduct={props.selectedProduct}
                        onSuccess={() => props.onInventoryUpdate(props.selectedProduct.id as number)}
                        onClose={() => {
                            setActiveModal(null);
                            setSelectedInventoryList([]);
                        }}
                    />
                </div>
            }
            {
                activeModal === ModalType.EDIT_MULTIPLE &&
                <div className='modal-dialog'>
                    <EditMultipleInventoryModal
                        modalVisible={activeModal === ModalType.EDIT_MULTIPLE}
                        selectedInventory={selectedInventoryList}
                        selectedProduct={props.selectedProduct}
                        onSuccess={() => {
                            props.onInventoryUpdate(props.selectedProduct.id as number);
                        }}
                        onClose={() => {
                            setActiveModal(null);
                            setSelectedInventoryList([]);
                        }}
                    />
                </div>
            }
        </div >
    );
};

export const InventoryTable = withRouter(InventoryTableComponent);

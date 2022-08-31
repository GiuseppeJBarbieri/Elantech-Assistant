import axios from 'axios';
import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../constants/API';

import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { EditInventoryModal } from '../EditInventoryModal/EditInventoryModal';
import { EditMultipleInventoryModal } from '../EditMultipleInventoryModal/EditMultipleInventoryModal';
import { RemoveInventoryModal } from '../RemoveInventoryModal/RemoveInventoryModal';
import { RemoveMultipleInventoryModal } from '../RemoveMultipleInventoryModal/RemoveMultipleInventoryModal';


interface InventoryTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    inventory: IInventory[];
}

const InventoryTableComponent: FunctionComponent<InventoryTableProps> = (props) => {
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [selectedInventory, setSelectedInventory] = useState<IInventory>();
    const [editInventorySwitch, setEditInventorySwitch] = useState(false);
    const [removeInventorySwitch, setRemoveInventorySwitch] = useState(false);
    const [removeMultipleInventorySwitch, setRemoveMultipleInventorySwitch] = useState(false);
    const [editMultipleInventorySwitch, setEditMultipleInventorySwitch] = useState(false);

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
    const fake_data_inner = [
        {
            serial_number: 'serial-number-1',
            condition: 'Used',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-2',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-3',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-4',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-5',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-6',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
        {
            serial_number: 'serial-number-7',
            condition: 'condition',
            seller_name: 'Ebay',
            order_number: '809461-001',
            date_received: '2021-01-29',
            warranty_expiration: '2021-01-29',
            tested: 'Yes',
            comment: 'N/A',
            location: 'Aisle 4 Row 2',
            reserved: 'No'
        },
    ];
    const columns = [
        {
            id: 1,
            dataField: "serialNumber",
            text: "Serial Number",
            sort: false,
        },
        {
            id: 2,
            dataField: "condition",
            text: "Condition",
            sort: true,
        },
        {
            id: 3,
            dataField: "sellerName",
            text: "Seller Name",
            sort: true
        },
        {
            id: 4,
            dataField: "orderNumber",
            text: "Order Number",
            sort: false,
        },
        {
            id: 5,
            dataField: "dateReceived",
            text: "Date Received",
            sort: false,
        },
        {
            id: 6,
            dataField: "warrantyExpiration",
            text: "Warranty Expiration",
            sort: false,
        },
        {
            id: 7,
            dataField: "comment",
            text: "Comment",
            sort: false,
        },
        {
            id: 8,
            dataField: "location",
            text: "Location",
            sort: false,
        },
        {
            id: 9,
            dataField: "tested",
            text: "Tested",
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 10,
            dataField: "reserved",
            text: "Reserved",
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatterEdit,
  //          headerAlign: 'center',
        },
        {
            id: 12,
            dataField: "remove",
            text: "Remove",
            sort: false,
            formatter: rankFormatterRemove,
//            headerAlign: 'center',
        }
    ];
    const options = {
        sizePerPage: 5,
        totalSize: fake_data_inner.length,
    };
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row: IInventory, isSelect: boolean, rowIndex: Number, e: any) => {
            if (isSelect === true) {
                // Add inventory to list
                selectedInventoryList.push(row);
                setSelectedInventoryList([...selectedInventoryList]);
            } else {
                // Remove Inventory from list
                var index = selectedInventoryList.indexOf(row);
                selectedInventoryList.splice(index, 1);
                setSelectedInventoryList([...selectedInventoryList]);
            }
        },
        onSelectAll: (isSelect: any, rows: IInventory[], e: any) => {
            if (isSelect === true) {
                for (var i = 0; i < rows.length; i++) {
                    selectedInventoryList.push(rows[i]);
                }
                setSelectedInventoryList([...selectedInventoryList]);
            } else {
                setSelectedInventoryList([]);
            }
        }
    };
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
                            selectedInventoryList.length > 1 &&
                            <div className='fade-in-right' aria-controls="example-fade-text">
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        console.log('')
                                    }}
                                >
                                    Reserve Items
                                </Button>
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setEditMultipleInventorySwitch(true);
                                    }}
                                >
                                    Edit Multiple Inventory
                                </Button>
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setRemoveMultipleInventorySwitch(true);
                                    }}
                                >
                                    Remove Inventory
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <BootstrapTable
                key='inventory_table'
                bootstrap4
                condensed
                data={props.inventory}
                columns={columns}
                keyField='serialNumber'
                classes="table table-dark table-hover table-striped"
                noDataIndication="Table is Empty"
            />
            {
                editInventorySwitch &&
                <div className='modal-dialog'>
                    <EditInventoryModal
                        modalVisible={editInventorySwitch}
                        selectedInventory={selectedInventory}
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
                        onClose={async () => {
                            setRemoveInventorySwitch(false);
                        }}
                    />
                </div>
            }
            {
                removeMultipleInventorySwitch &&
                <div className='modal-dialog'>
                    <RemoveMultipleInventoryModal
                        modalVisible={removeMultipleInventorySwitch}
                        selectedInventory={selectedInventoryList}
                        onClose={async () => {
                            setRemoveMultipleInventorySwitch(false);
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

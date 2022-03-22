import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IInventory from '../../types/IInventory';


interface InventoryTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {

}

const InventoryTableComponent: FunctionComponent<InventoryTableProps> = (props) => {
    const selectedInventory: IInventory[] = [];
    const [numSelected, setNumSelected] = useState(0);
    const rankFormatterEdit = (_: any, data: any, index: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }}
                onClick={() => {
                    console.log('Edit Column')
                }} >
                <Pencil style={{ fontSize: 20, color: 'white' }} />
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
    const fake_data_inner = [
        {
            serial_number: 'serial-number-1',
            product_condition: 'condition',
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
            product_condition: 'condition',
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
            product_condition: 'condition',
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
            product_condition: 'condition',
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
            product_condition: 'condition',
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
            product_condition: 'condition',
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
            product_condition: 'condition',
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
    const inventory_columns = [
        {
            dataField: "serial_number",
            text: "Serial Number",
            sort: false,
        },
        {
            dataField: "product_condition",
            text: "Condition",
            sort: true,
        },
        {
            dataField: "seller_name",
            text: "Seller Name",
            sort: true
        },
        {
            dataField: "order_number",
            text: "Order Number",
            sort: false,
        },
        {
            dataField: "date_received",
            text: "Date Received",
            sort: false,
        },
        {
            dataField: "warranty_expiration",
            text: "Warranty Expiration",
            sort: false,
        },
        {
            dataField: "comment",
            text: "Comment",
            sort: false,
        },
        {
            dataField: "location",
            text: "Location",
            sort: false,
        },
        {
            dataField: "tested",
            text: "Tested",
            sort: false,
            headerAlign: 'center',
            // style: {
            //     textAlign: 'center'
            // }
        },
        {
            dataField: "reserved",
            text: "Reserved",
            sort: false,
            headerAlign: 'center',
            // style: {
            //     textAlign: 'center'
            // }
        },
        {
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
            // style: {
            //     textAlign: 'center'
            // }
        },
        {
            dataField: "remove",
            text: "Remove",
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
            // style: {
            //     textAlign: 'center'
            // }
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
                selectedInventory.push(row);
            } else {
                // Remove Inventory from list
                var index = selectedInventory.indexOf(row);
                if (index !== -1) {
                    selectedInventory.splice(index, 1);
                }
            }
            console.log(selectedInventory);

        },
        onSelectAll: (isSelect: any, rows: IInventory[], e: any) => {
            if (isSelect === true) {
                for (var i = 0; i < rows.length; i++) {
                    selectedInventory.push(rows[i]);
                }
            } else {
                selectedInventory.splice(0, (selectedInventory.length))
            }
            console.log(selectedInventory);
        }
    };
    return (
        <div>
            <br />
            <div>
                <div>
                    <div className='d-flex justify-content-between' style={{ marginBottom: 5 }}>
                        <Button variant='dark'>Edit Inventory</Button>
                        <input type='text'
                            className="form-control custom-input"
                            placeholder="0"
                            value={numSelected}
                            readOnly={true}
                            style={{ width: 70 }}
                        />
                    </div>
                </div>
            </div>
            <BootstrapTable
                keyField='serial_number'
                data={fake_data_inner}
                columns={inventory_columns}
                bootstrap4
                condensed
                classes="table table-dark table-hover table-striped"
                noDataIndication="Table is Empty"
                pagination={paginationFactory(options)}
                selectRow={selectRow}
            />
        </div>
    );
};

export const InventoryTable = withRouter(InventoryTableComponent);

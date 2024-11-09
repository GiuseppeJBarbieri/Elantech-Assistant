/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import EditReceivedProductOrderModal from '../Modals/Receiving/EditReceivedProductOrderModal';
import ReceivingAddProductModal from '../Modals/Receiving/ReceivingAddProductModal';

interface ExpandedReceivingRowProps extends HTMLAttributes<HTMLDivElement> {
}

const ExpandedReceivingRowComponent: FunctionComponent<ExpandedReceivingRowProps> = () => {
    const [editProductSwitch, setEditProductSwitch] = useState(false);
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [addProductSwitch, setAddProductSwitch] = useState(false);

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
    const rankFormatterEdit = () => {
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
                <div onClick={() => {
                    setEditProductSwitch(true);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterRemove = () => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log('Remove Column')} >
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
            dataField: 'product_number',
            text: 'Product Number',
            sort: true,
        },
        {
            dataField: 'product_type',
            text: 'Type',
            sort: true,
        },
        {
            dataField: 'brand',
            text: 'Brand',
            sort: true,
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true,
        },
        {
            dataField: 'condition_upon_delivery',
            text: 'CUD',
            sort: true,
        },
        {
            dataField: 'added_to_inventory',
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
    const fake_data = [
        {
            quantity: 1,
            product_number: '875001-B21',
            condition_upon_delivery: 'New',
            added_to_inventory: 'Yes',
            added_by: 'Giuseppe',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
        {
            quantity: 3,
            product_number: '875001-B21',
            condition_upon_delivery: 'New',
            added_to_inventory: 'Yes',
            added_by: 'Giuseppe',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
        {
            quantity: 12,
            product_number: '875001-B21',
            condition_upon_delivery: 'Used',
            added_to_inventory: 'No',
            added_by: 'Giuseppe',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
    ];
    const options = {
        custom: true,
        sizePerPage: 5,
        totalSize: fake_data.length

    };
    return (
        <div style={{ padding: 20 }} className='expandedProductRow'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Received Products</Navbar.Brand>
                <Nav className="me-auto" style={{ marginBottom: -3 }}>
                    <Nav.Link onClick={() => {
                        setAddProductSwitch(true);
                    }}>Add Product</Nav.Link>
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
                                    data={fake_data}
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
                editProductSwitch &&
                <div className='modal-dialog'>
                    <EditReceivedProductOrderModal
                        modalVisible={editProductSwitch}
                        onClose={async () => {
                            setEditProductSwitch(false);
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

export default ExpandedReceivingRowComponent;

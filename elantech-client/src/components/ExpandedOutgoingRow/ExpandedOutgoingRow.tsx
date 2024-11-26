/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EditReceivedProductOrderModal } from '../Modals/Receiving/EditReceivedProductOrderModal';
import { ReceivingAddProductModal } from '../Modals/Receiving/ReceivingAddProductModal';

interface ExpandedOutgoingRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
}

const ExpandedOutgoingRowComponent: FunctionComponent<ExpandedOutgoingRowProps> = (_props) => {
    const [editProductSwitch, setEditProductSwitch] = useState(false);
    const [addInventorySwitch] = useState(false);
    const [addProductSwitch, setAddProductSwitch] = useState(false);

    const rankFormatterViewMore = (_: any, _data: any, _index: any) => {
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
                <div onClick={(_e) => {
                    // console.log('View More');
                }}
                >
                    <ThreeDots style={{ fontSize: 20, color: 'white' }} />
                </div>
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
            dataField: 'condition',
            text: 'Condition',
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
            dataField: 'view',
            text: 'View More',
            sort: false,
            formatter: rankFormatterViewMore,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },

    ];
    const fake_data = [
        {
            quantity: 3,
            product_number: '804331-B21',
            condition: 'Refurbished',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
        {
            quantity: 4,
            product_number: '804331-B22',
            condition: 'Refurbished',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
        {
            quantity: 23,
            product_number: '804331-B23',
            condition: 'Refurbished',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
        },
        {
            quantity: 57,
            product_number: '804331-B24',
            condition: 'Refurbished',
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
                <Navbar.Brand>Products in Order</Navbar.Brand>
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
                        }}
                    />
                </div>
            }
        </ div>
    );
};

export const ExpandedOutgoingRow = withRouter(ExpandedOutgoingRowComponent);
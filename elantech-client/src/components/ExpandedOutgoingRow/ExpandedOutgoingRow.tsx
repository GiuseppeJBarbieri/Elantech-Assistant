import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Pencil, Trash, Plus, ThreeDots } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AddInventoryModal } from '../AddInventoryModal/AddInventoryModal';
import { EditReceivedProductOrderModal } from '../EditReceivedProductInOrderModal/EditReceivedProductOrderModal';
import { ReceivingAddProductModal } from '../ReceivingAddProductModal/ReceivingAddProductModal';

interface ExpandedOutgoingRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
}

const ExpandedOutgoingRowComponent: FunctionComponent<ExpandedOutgoingRowProps> = (props) => {
    const [editProductSwitch, setEditProductSwitch] = useState(false);
    const [addInventorySwitch, setAddInventorySwitch] = useState(false);
    const [addProductSwitch, setAddProductSwitch] = useState(false);

    const rankFormatterViewMore = (_: any, data: any, index: any) => {
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
                    console.log('View More');
                }}
                >
                    <ThreeDots style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column_inner = [
        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: false,
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
        },
        {
            id: 3,
            dataField: "condition",
            text: "Condition",
            sort: true,
        },
        {
            id: 4,
            dataField: "product_type",
            text: "Type",
            sort: true,
        },
        {
            id: 5,
            dataField: "brand",
            text: "Brand",
            sort: true,
        },
        {
            id: 6,
            dataField: "description",
            text: "Description",
            sort: true,
        },
        {
            id: 7,
            dataField: "view",
            text: "View More",
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
                    <AddInventoryModal
                        modalVisible={addInventorySwitch}
                        onClose={async () => {
                            setAddInventorySwitch(false);
                        }}
                    />
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
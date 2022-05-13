import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Plus, Pencil, Trash } from "react-bootstrap-icons";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from "react-bootstrap-table2-paginator";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ExpandedProductRow } from "../ExpandedProductRow/ExpandedProductRow";


interface AddReceivingOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const AddReceivingOrderModalComponent: FunctionComponent<AddReceivingOrderModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);

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
                    for (var i = 0; i < setQuotedProducts.length; i++) {
                        if (quotedProducts[i] === data) {
                            quotedProducts.splice(i, 1);
                            setQuotedProducts([...quotedProducts]);
                            break;
                        }
                    }
                }}
                >
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const column = [
        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
        },
        {
            id: 2,
            dataField: "alt_1",
            text: "Alt 1",
            sort: true,
        },
        {
            id: 2,
            dataField: "alt_2",
            text: "Alt 2",
            sort: true,
        },
        {
            id: 2,
            dataField: "alt_3",
            text: "Alt 3",
            sort: true,
        },
        {
            id: 2,
            dataField: "alt_4",
            text: "Alt 4",
            sort: true,
        },
        {
            id: 3,
            dataField: "product_type",
            text: "Type",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 4,
            dataField: "brand",
            text: "Brand",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 5,
            dataField: "description",
            text: "Description",
            sort: false,
        }
    ];
    const column_inner = [
        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
        },
        {
            id: 3,
            dataField: "product_type",
            text: "Type",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 4,
            dataField: "brand",
            text: "Brand",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 5,
            dataField: "description",
            text: "Description",
            sort: false,
        },
        {
            id: 6,
            dataField: "condition",
            text: "Condition",
            sort: false,
        },
        {
            id: 7,
            dataField: "price",
            text: "Price",
            sort: false,
        },
        {
            id: 8,
            dataField: "remove",
            text: "Remove",
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
            quantity: 130,
            product_number: '804331-B21',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '99999999',
            alt_2: '809461-001',
            alt_3: '875056-002',
            alt_4: '871820-003',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'search 2',
            product_type: 'CPU',
            brand: 'Dell',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '88888888',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'Search 1',
            product_type: 'Memory',
            brand: 'Lenovo',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '7777777777',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'text 1',
            product_type: 'SSD',
            brand: 'IBM',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '877946-001',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'text 2',
            product_type: 'HDD',
            brand: 'Cisco',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '877946-001',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'Apples',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '877946-001',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'Oranges',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '877946-001',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
        {
            quantity: 130,
            product_number: 'Pears',
            product_type: 'Raid Controller',
            brand: 'HPE',
            description: 'HPE Smart Array P408i-a SR Gen10 Controller',
            last_added: '2022-01-29',
            alt_1: '877946-001',
            alt_2: '809461-001',
            alt_3: '875056-001',
            alt_4: '871820-001',
            ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
            website_link: 'https://elantechit.com/hpe-804331-b21',
            quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
            related_tags: 'DL380G10',
        },
    ];
    const options = {
        custom: true,
        totalSize: fake_data.length
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header
                    style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }}
                    closeButton
                >
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Receiving Order</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>
                            Please enter order information.
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' >
                                <ul>
                                    <li key='1' style={{ listStyle: 'none' }}>
                                        <Spinner animation="border" role="status" />
                                    </li>
                                    <li key='2' style={{ listStyle: 'none' }}>
                                        <label>Loading...</label>
                                    </li>
                                </ul>
                            </div>
                            :
                            <Form className="d-grid" >
                                <h3 style={{ fontWeight: 300 }}>Order Information</h3>
                                <hr />
                                <p style={{ fontWeight: 300 }}>
                                    Please enter all information below, as it is required.
                                </p>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                <Form.Label style={{ fontWeight: 300 }}>PO Number</Form.Label>
                                                <Form.Control id="comments" type="text" placeholder="PO Number" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                <Form.Label style={{ fontWeight: 300 }}>Order Type</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option>Choose Order Type</option>
                                                    <option value="Order">Order</option>
                                                    <option value="RMA">RMA</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                <Form.Label style={{ fontWeight: 300 }}>Seller</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option>Choose Seller</option>
                                                    <option value="New Factory Sealed">Company 1</option>
                                                    <option value="New Opened Box">Company 2</option>
                                                    <option value="Renew">Company 3</option>
                                                    <option value="Used">Company 4</option>
                                                    <option value="Damaged">Company 5</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                <Form.Label style={{ fontWeight: 300 }}>Date Received</Form.Label>
                                                <Form.Control id="dateReceived" type="date" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{ fontWeight: 300 }}>Comments</Form.Label>
                                                <Form.Control id="comments" type="text" placeholder="Comments" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                                <br />
                                <br />
                                <h3 style={{ fontWeight: 300 }}>Product Information</h3>
                                <hr />
                                <p style={{ fontWeight: 300 }}>Please select all products in this order.</p>
                                <div>
                                    <Container>
                                        <div className='d-flex justify-content-between'>
                                            <div className="d-flex">
                                                <Form.Group className="mb-1" style={{ marginRight: 5 }}>
                                                    <Form.Control id="quantity" type="text" placeholder="Quantity" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Choose Condition</option>
                                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                                        <option value="New Opened Box">New Opened Box</option>
                                                        <option value="Renew">Renew</option>
                                                        <option value="Used">Used</option>
                                                        <option value="Damaged">Damaged</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                            <div style={{ float: 'right' }}>
                                                <Form.Group className="mb-3">
                                                    <Button variant="secondary">Submit</Button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                                <br />
                                <p style={{ fontWeight: 300 }}>Please select a product and enter the information above.</p>
                                <Container>
                                    <div style={{ width: 200 }}>
                                        <Form.Group className="md-2">
                                            <Form.Control id="search" type="text" placeholder="Search Product" />
                                        </Form.Group>
                                        <br />
                                    </div>

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
                                                        key='product_table'
                                                        {...paginationTableProps}
                                                        keyField="product_number"
                                                        bootstrap4
                                                        condensed
                                                        data={fake_data}
                                                        columns={column}
                                                        selectRow={selectRow}
                                                        classes="table table-dark table-hover table-striped table-responsive"
                                                        noDataIndication="Table is Empty"
                                                        expandRow={{
                                                            onlyOneExpanding: true,
                                                            renderer: (row, index) => {
                                                                return (
                                                                    <ExpandedProductRow
                                                                        selectedProduct={row} />
                                                                )
                                                            }
                                                        }}
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
                                </Container>
                                <br />
                                <h3 style={{ fontWeight: 300 }}>Products in Order</h3>
                                <hr />
                                <p style={{ fontWeight: 300 }}>Review all products below.</p>
                                <div>
                                    <Container>
                                        <BootstrapTable
                                            keyField='product_number'
                                            data={fake_data}
                                            columns={column}
                                            bootstrap4
                                            classes="table table-dark table-hover table-striped"
                                            noDataIndication="Table is Empty"
                                        />
                                    </Container>
                                </div>

                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('')
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export const AddReceivingOrderModal = withRouter(AddReceivingOrderModalComponent);
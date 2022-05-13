import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface ViewQuotedProductsModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const ViewQuotedProductsModalComponent: FunctionComponent<ViewQuotedProductsModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const column = [
        {
            id: 1,
            dataField: "quantity",
            text: "QTY",
            sort: true,
            headerAlign: 'center',
            style: {
                textAlign: 'center',
            }
        },
        {
            id: 2,
            dataField: "product_number",
            text: "Product Number",
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            id: 3,
            dataField: "alt_1",
            text: "Alt 1",
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            id: 3,
            dataField: "alt_2",
            text: "Alt 2",
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            id: 3,
            dataField: "alt_3",
            text: "Alt 3",
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            id: 3,
            dataField: "alt_4",
            text: "Alt 4",
            sort: true,
            style: {
                maxWidth: 180
            }
        },
        {
            id: 8,
            dataField: "brand",
            text: "Brand",
            sort: true,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 9,
            dataField: "description",
            text: "Description",
            sort: false,
            style: {
                maxWidth: 280
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
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >View Quote</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Quoted products from this quote IDK what to put here.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' style={{ margin: 'auto', textAlign: 'center', verticalAlign: 'middle' }} >
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
                            <Form className="container d-grid" >
                                <Row>
                                    <Col>
                                        <Form.Label style={{ fontWeight: 300, fontSize: 18 }}>Company Information</Form.Label>
                                        <hr />
                                        <div className="container" style={{ display: 'inline-grid' }}>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Type: Broker</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Name: Kings Collectables</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Company Rep: Giuseppe</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Phone Number: 631-278-8517</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Email: giuseppe@elantechus.com</Form.Label>
                                        </div>
                                    </Col>
                                    <br />
                                    <br />
                                    <Col>
                                        <Form.Label style={{ fontWeight: 300, fontSize: 18 }}>Quote Information</Form.Label>
                                        <hr />
                                        <div className="container" style={{ display: 'inline-grid' }}>
                                            <Form.Label style={{ fontWeight: 300 }}>Quoter: Giuseppe</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Date: 04-29-2022</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Time: 4:06 PM</Form.Label>
                                            <Form.Label style={{ fontWeight: 300 }}>Total Quote: $2,500.00</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <hr />
                                <BootstrapTable
                                    bootstrap4
                                    condensed
                                    columns={column}
                                    keyField="serial_number"
                                    data={fake_data}
                                    classes="table table-dark table-hover table-striped"
                                    noDataIndication="Table is Empty"

                                />
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)', display: 'left' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                console.log('');
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const ViewQuotedProductsModal = withRouter(ViewQuotedProductsModalComponent);

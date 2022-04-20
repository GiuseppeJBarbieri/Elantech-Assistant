import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { Plus, Pencil, Trash } from "react-bootstrap-icons";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from "react-bootstrap-table2-paginator";
import { DebounceInput } from "react-debounce-input";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ICompany from '../../types/ICompany';
import IProduct from "../../types/IProduct";
import IQuotedProduct from "../../types/IQuotedProduct";
import { ExpandedProductRow } from "../ExpandedProductRow/ExpandedProductRow";

interface AddMultiQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedCompany: ICompany | undefined;
}

const AddMultiQuoteModalComponent: FunctionComponent<AddMultiQuoteModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [condition, setCondition] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const product_number = '';
    const [selectedProduct, setSelectedProduct] = useState<IProduct>();
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [quotedProduct, setQuotedProduct] = useState<IQuotedProduct>(
        {
            quantity: 0,
            product_number: '',
            product_type: '',
            brand: '',
            description: '',
            condition: '',
            price: 0
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

                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
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
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
            style: {
                textAlign: 'center'
            }
        },
        {
            id: 9,
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
        clickToSelect: true,
        onSelect: (row: IProduct, isSelect: boolean, rowIndex: Number, e: any) => {
            if (isSelect === true) {
                // Select product
                setSelectedProduct(row);
            } else {
                // Remove product
                setSelectedProduct(undefined);
            }
        },
    };
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Create Quote</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter quote information.</p>
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
                            <Form className="container d-grid" >
                                <h3 style={{ fontWeight: 300 }}>Select Products</h3>
                                <p style={{ fontWeight: 300 }}>First select a product, add the quote information, then click add quote when finished.</p>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div>
                                            <input type='text'
                                                className="form-control custom-input"
                                                placeholder="Search Product"
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div style={{ marginRight: 5 }}>
                                            <Form.Select aria-label="Default select example" >
                                                <option>Choose Condition</option>
                                                <option value="New Factory Sealed">New Factory Sealed</option>
                                                <option value="New Opened Box">New Opened Box</option>
                                                <option value="Renew">Renew</option>
                                                <option value="Used">Used</option>
                                                <option value="Damaged">Damaged</option>
                                            </Form.Select>
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <input type='text'
                                                className="form-control custom-input"
                                                placeholder="QTY"
                                                style={{ width: 75 }}
                                            />
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <input type='text'
                                                className="form-control custom-input"
                                                placeholder="Price"
                                                style={{ width: 100 }}
                                            />
                                        </div>
                                        <div>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    // Add quoted product to list
                                                    setQuotedProduct({
                                                        ...quotedProduct,
                                                        quantity: (quantity),
                                                        product_number: (selectedProduct?.product_number),
                                                        product_type: (selectedProduct?.product_type),
                                                        brand: (selectedProduct?.brand),
                                                        description: (selectedProduct?.description),
                                                        condition: condition,
                                                        price: price,
                                                    });
                                                    quotedProducts.push(quotedProduct);
                                                    setQuotedProducts([...quotedProducts]);
                                                }}
                                            >
                                                <Plus style={{ marginTop: -3, marginLeft: -10 }} />Add Quote
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
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
                                </div>
                                <hr />
                                <br />
                                <div>
                                    <h3 style={{ fontWeight: 300 }}>Quoted Products</h3>
                                    <hr />
                                    <BootstrapTable
                                        keyField='serial_number'
                                        data={quotedProducts}
                                        columns={column_inner}
                                        bootstrap4
                                        condensed
                                        classes="table table-dark table-hover table-striped"
                                        noDataIndication="Table is Empty"
                                    />
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

export const AddMultiQuoteModal = withRouter(AddMultiQuoteModalComponent);
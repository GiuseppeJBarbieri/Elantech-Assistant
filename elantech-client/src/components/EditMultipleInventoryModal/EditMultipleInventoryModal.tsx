import React, { HTMLAttributes, FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import IInventory from "../../types/IInventory";

interface EditMultipleInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedInventory: IInventory[];
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const EditMultipleInventoryComponent: FunctionComponent<EditMultipleInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [editInventoryList, setEditInventoryList] = useState<IInventory[]>(props.selectedInventory);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const inventory_columns = [
        {
            dataField: "serial_number",
            text: "Serial Number",
            sort: false,
        },
        {
            dataField: "condition",
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
        },
    ];
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
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Edit Inventory </h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter inventory information.</p>
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
                            <div>
                                <div>
                                    <h2 style={{ fontWeight: 300 }}>Editable Fields</h2>
                                    <Form className="d-grid" >
                                        <div className='d-flex justify-content-between'>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Condition</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                    // value={editInventory.condition}
                                                    // onChange={(e) => setEditInventory({ ...editInventory, condition: (e.target.value) })}
                                                    >
                                                        <option>Choose Condition</option>
                                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                                        <option value="New Opened Box">New Opened Box</option>
                                                        <option value="Renew">Renew</option>
                                                        <option value="Used">Used</option>
                                                        <option value="Damaged">Damaged</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Seller</Form.Label>
                                                    <Form.Select aria-label="Default select example" >
                                                        <option>Choose Seller</option>
                                                        <option value="New Factory Sealed">Ebay</option>
                                                        <option value="New Opened Box">Company 1</option>
                                                        <option value="Renew">Company 2</option>
                                                        <option value="Used">Company 3</option>
                                                        <option value="Damaged">Company 4</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Order Number</Form.Label>
                                                    <Form.Control
                                                        id="orderNumber" type="text" placeholder="Order Number"
                                                    // value={editInventory.order_number}
                                                    // onChange={(e) => setEditInventory({ ...editInventory, order_number: (e.target.value) })}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Date Received</Form.Label>
                                                    <Form.Control id="orderNumber" type="date" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Warranty Expiration</Form.Label>
                                                    <Form.Control id="orderNumber" type="date" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control
                                                        id="comments" type="text" placeholder="Comments"
                                                    // value={editInventory.comment}
                                                    // onChange={(e) => setEditInventory({ ...editInventory, comment: (e.target.value) })}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control
                                                        id="location" type="text" placeholder="Location"
                                                    // value={editInventory.location}
                                                    // onChange={(e) => setEditInventory({ ...editInventory, location: (e.target.value) })}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Tested</Form.Label>
                                                    <InputGroup>
                                                        <div key={`inline-radio-2`}>
                                                            <Form.Check
                                                                inline
                                                                defaultChecked
                                                                label="Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-3'}
                                                                onClick={() => {
                                                                    console.log('Not Tested');
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Not Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-4'}
                                                                onClick={() => {
                                                                    console.log('Not Tested');
                                                                }}
                                                            />
                                                        </div>
                                                    </InputGroup>
                                                </Form.Group>
                                                <div className="mb-3" style={{ textAlign: 'center', display: 'grid', marginTop: 47, height: 40 }}>
                                                    <Button variant="dark">Submit Changes</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <hr />
                                <div>
                                    <BootstrapTable
                                        keyField='serial_number'
                                        data={editInventoryList}
                                        columns={inventory_columns}
                                        bootstrap4
                                        classes="table table-dark table-hover table-striped"
                                        noDataIndication="Table is Empty"
                                        selectRow={selectRow}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={() => {
                                props.onClose();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditMultipleInventoryModal = withRouter(EditMultipleInventoryComponent);
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { defaultAlert } from '../../../constants/Defaults';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { requestUpdateInventory } from '../../../utils/Requests';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';

interface EditMultipleInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedInventory: IInventory[];
    onClose: () => Promise<void>;
    modalVisible: boolean;
    getAllInventory: (productId: number) => void
    getAllProducts: () => void
    selectedProduct: IProduct;
}

const EditMultipleInventoryComponent: FunctionComponent<EditMultipleInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [inventoryTableList, setInventoryTableList] = useState<IInventory[]>([]);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [alert, setAlert] = useState(defaultAlert);
    const [attributes, setAttributes] = useState({
        condition: undefined as unknown as string,
        warrantyExpiration: undefined as unknown as string,
        isTested: true,
        dateTested: undefined as unknown as string,
        comment: undefined as unknown as string,
        location: undefined as unknown as string,
    })
    const columns = [
        {
            dataField: 'serialNumber',
            text: 'Serial Number',
            sort: false,
        },
        {
            dataField: 'condition',
            text: 'Condition',
            sort: true,
        },
        {
            dataField: 'sellerName',
            text: 'Seller Name',
            sort: true
        },
        {
            dataField: 'orderNumber',
            text: 'Order Number',
            sort: false,
        },
        {
            dataField: 'warrantyExpiration',
            text: 'Warranty Expiration',
            sort: false,
        },
        {
            dataField: 'comment',
            text: 'Comment',
            sort: false,
        },
        {
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            dataField: 'dateTested',
            text: 'Date Tested',
            sort: false,
        },
        {
            dataField: 'isTested',
            text: 'Tested',
            sort: false,
            headerAlign: 'center',
        }
    ];
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row: IInventory, isSelect: boolean) => {
            if (isSelect === true) {
                // Add inventory to list
                selectedInventoryList.push(row);
                setSelectedInventoryList([...selectedInventoryList]);
            } else {
                // Remove Inventory from list
                const index = selectedInventoryList.indexOf(row);
                selectedInventoryList.splice(index, 1);
                setSelectedInventoryList([...selectedInventoryList]);
            }
        },
        onSelectAll: (isSelect: any, rows: IInventory[]) => {
            if (isSelect === true) {
                for (let i = 0; i < rows.length; i++) {
                    selectedInventoryList.push(rows[i]);
                }
                setSelectedInventoryList([...selectedInventoryList]);
            } else {
                setSelectedInventoryList([]);
            }
        },
    };
    const submitChanges = () => {
        // Make changes on selected items
        selectedInventoryList.forEach((selectedInventory) => {
            Object.keys(attributes).forEach((key, index) => {
                if (attributes[key] !== undefined) {
                    selectedInventory[key] = attributes[key];
                }
            })
        });
        // Add To Inventory List
        const newInventoryList: IInventory[] = [];
        inventoryTableList.forEach(inventory => {
            let found = false;
            selectedInventoryList.forEach(selectedInventory => {
                if (inventory.serialNumber === selectedInventory.serialNumber) {
                    newInventoryList.push(selectedInventory);
                    found = true;
                }
            });
            if (!found) {
                newInventoryList.push(inventory);
            }
            found = false;
        });
        setInventoryTableList([]);
        setTimeout(async () => {
            setInventoryTableList(JSON.parse(JSON.stringify(newInventoryList)));
        }, 500)
    };
    const finish = () => {
        setIsSaving(true);
        inventoryTableList.forEach((inventory) => {
            setTimeout(async () => {
                try {
                    await requestUpdateInventory(inventory);
                } catch (err) {
                    setAlert({ ...alert, label: `${err}`, show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                    setIsSaving(false);
                    return;
                }
            }, 500)
        });
        props.getAllProducts();
        props.getAllInventory(props.selectedProduct.id as number)
        props.onClose();
    }
    const setInventoryList = (inventoryList: IInventory[]) => {
        setInventoryTableList(JSON.parse(JSON.stringify(inventoryList)));
    }
    useEffect(() => {
        setInventoryList(props.selectedInventory);
    }, [setInventoryTableList])
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
                            <SpinnerBlock />
                            :
                            <div>
                                <div>
                                    <h2 style={{ fontWeight: 300 }}>Editable Fields</h2>
                                    <Form className="d-grid" >
                                        <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                        <div className='d-flex justify-content-between'>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Condition</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                        value={attributes.condition}
                                                        onChange={(e) => setAttributes({ ...attributes, condition: (e.target.value) })}
                                                    >
                                                        <option value={undefined}>Choose Condition</option>
                                                        <option value="New Factory Sealed">New Factory Sealed</option>
                                                        <option value="New Opened Box">New Opened Box</option>
                                                        <option value="Renew">Renew</option>
                                                        <option value="Used">Used</option>
                                                        <option value="Damaged">Damaged</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control
                                                        id="comments" type="text" placeholder="Comments"
                                                        value={attributes.comment}
                                                        onChange={(e) => setAttributes({ ...attributes, comment: (e.target.value) })}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control
                                                        id="location" type="text" placeholder="Location"
                                                        value={attributes.location}
                                                        onChange={(e) => setAttributes({ ...attributes, location: (e.target.value.toString()) })}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Date Tested</Form.Label>
                                                    <Form.Control id="dateTested" type="date"
                                                        value={attributes.dateTested}
                                                        onChange={(e) => setAttributes({ ...attributes, dateTested: (e.target.value) })} />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Warranty Expiration</Form.Label>
                                                    <Form.Control id="orderNumber" type="date"
                                                        value={attributes.warrantyExpiration}
                                                        onChange={(e) => setAttributes({ ...attributes, warrantyExpiration: (e.target.value) })} />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Tested</Form.Label>
                                                    <InputGroup>
                                                        <div key={'inline-radio-2'}>
                                                            <Form.Check
                                                                inline
                                                                defaultChecked
                                                                label="Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-3'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, isTested: (true) })
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Not Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-4'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, isTested: (false) })
                                                                }}
                                                            />
                                                        </div>
                                                    </InputGroup>
                                                </Form.Group>
                                                <div className="mb-3" style={{ textAlign: 'center', display: 'grid', marginTop: 47, height: 40 }}>
                                                    <Button variant="dark" onClick={() => submitChanges()}>Submit Changes</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <hr />
                                <div>
                                    <BootstrapTable
                                        keyField='serialNumber'
                                        data={inventoryTableList}
                                        columns={columns}
                                        bootstrap4
                                        classes="table table-dark table-hover table-striped"
                                        noDataIndication="Table is Empty"
                                        selectRow={selectRow as SelectRowProps<IInventory>}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="dark" onClick={() => finish()}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const EditMultipleInventoryModal = withRouter(EditMultipleInventoryComponent);
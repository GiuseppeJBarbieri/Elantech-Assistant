/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { defaultAlert } from '../../../constants/Defaults';
import IInventory from '../../../types/IInventory';
import IProduct from '../../../types/IProduct';
import { requestUpdateMultipleInventory } from '../../../utils/Requests';
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

    const attributeState = {
        condition: undefined as unknown as string,
        warrantyExpiration: undefined as unknown as string,
        tested: undefined as unknown as boolean | undefined,
        testedDate: undefined as unknown as string,
        comment: undefined as unknown as string,
        location: undefined as unknown as string,
    }
    const [attributes, setAttributes] = useState(attributeState)

    const handleConditionSort = (order: string) => {
        if (order === 'desc') {
            selectedInventoryList.sort((a, b) => b.condition.localeCompare(a.condition));
        } else {
            selectedInventoryList.sort((a, b) => a.condition.localeCompare(b.condition));
        }
    }
    const columns = [
        {
            id: 1,
            dataField: 'serialNumber',
            text: 'Serial Number',
            sort: false,
        },
        {
            id: 2,
            dataField: 'condition',
            text: 'Condition',
            sort: true,
            onSort: (field: any, order: string) => {
                handleConditionSort(order);
            }
        },
        {
            id: 3,
            dataField: 'receiving.company.name',
            text: 'Company Name',
            sort: false,
        },
        {
            id: 4,
            dataField: 'receiving.purchaseOrderNumber',
            text: 'Order Number',
            sort: false,
        },
        {
            id: 5,
            dataField: 'receiving.dateReceived',
            text: 'Date Received',
            sort: true,
        },
        {
            id: 6,
            dataField: 'warrantyExpiration',
            text: 'Warranty Expiration',
            sort: false,
        },
        {
            id: 7,
            dataField: 'comment',
            text: 'Comment',
            sort: false,
        },
        {
            id: 8,
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            id: 9,
            dataField: 'testedDate',
            text: 'Date Tested',
            sort: false,
        },
        {
            id: 10,
            dataField: 'tested',
            text: 'Tested',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: 'reserved',
            text: 'Reserved',
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
            (Object.keys(attributes) as (keyof typeof attributes)[]).forEach((key, index) => {
                if (attributes[key] !== undefined) {
                    (selectedInventory[key] as string | boolean) = attributes[key];
                }
            })
        });
        const updatedList = inventoryTableList.map(oldItem => {
            const newItem = selectedInventoryList.find(newItem => newItem.id === oldItem.id);
            return newItem ? newItem : oldItem;
        });

        setAttributes(attributeState);
        setInventoryTableList(updatedList);
        console.log(selectedInventoryList);
    };
    const finish = () => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                // This should really just pass the whole list instead of a single item
                await requestUpdateMultipleInventory(inventoryTableList);
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
                return;
            }
            props.getAllProducts();
            props.getAllInventory(props.selectedProduct.id as number)
            props.onClose();
        }, 500)
    }
    const setInventoryList = (inventoryList: IInventory[]) => {
        setInventoryTableList(inventoryList);
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
                                                        value={attributes.testedDate}
                                                        onChange={(e) => setAttributes({ ...attributes, testedDate: (e.target.value) })} />
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
                                                    <InputGroup style={{ textAlign: 'center', paddingTop: 7 }}>
                                                        <div key={'inline-radio-2'}>
                                                            <Form.Check
                                                                inline
                                                                defaultChecked
                                                                label="Don't Change"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-4'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: undefined })
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-3'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: (true) })
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Not Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-4'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: (false) })
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
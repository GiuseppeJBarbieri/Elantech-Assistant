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
import './EditMultipleInventoryModal.css';

const dateFormatter = (cell: string | Date | undefined | null) => {
    if (!cell) return '';
    try {
        return new Date(cell).toISOString().split("T")[0];
    } catch (e) {
        return '';
    }
};

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
        dataField: 'receiving.company.name',
        text: 'Company Name',
        sort: false,
    },
    {
        dataField: 'receiving.purchaseOrderNumber',
        text: 'Order Number',
        sort: false,
    },
    {
        dataField: 'receiving.dateReceived',
        text: 'Date Received',
        sort: true,
        formatter: dateFormatter,
    },
    {
        dataField: 'warrantyExpiration',
        text: 'Warranty Expiration',
        sort: false,
        formatter: dateFormatter,
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
        dataField: 'testedDate',
        text: 'Date Tested',
        sort: false,
        formatter: dateFormatter,
    },
    { dataField: 'tested', text: 'Tested', sort: false, headerAlign: 'center' },
    { dataField: 'reserved', text: 'Reserved', sort: false, headerAlign: 'center' },
];

interface EditMultipleInventoryModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    selectedInventory: IInventory[];
    onClose: () => void;
    onSuccess: () => void;
    modalVisible: boolean;
    selectedProduct: IProduct;
}

const EditMultipleInventoryComponent: FunctionComponent<EditMultipleInventoryModalProps> = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [inventoryTableList, setInventoryTableList] = useState<IInventory[]>([]);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [alert, setAlert] = useState(defaultAlert);
    const tableRef: any = React.useRef();

    const defaultAttributes = {
        condition: '',
        warrantyExpiration: '',
        tested: null as boolean | null,
        testedDate: '',
        comment: '',
        location: '',
    };
    const [attributes, setAttributes] = useState(defaultAttributes);

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row: IInventory, isSelect: boolean) => {
            setSelectedInventoryList(prevList =>
                isSelect ? [...prevList, row] : prevList.filter(item => item.serialNumber !== row.serialNumber)
            );
        },
        onSelectAll: (isSelect: any, rows: IInventory[]) => {
            setSelectedInventoryList(isSelect ? rows : []);
        },
    };

    const submitChanges = () => {
        if (selectedInventoryList.length === 0) {
            setAlert({ ...alert, label: 'Please select at least one item to edit.', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 3000);
            return;
        }

        const updatedList = inventoryTableList.map(item => {
            if (selectedInventoryList.some(selected => selected.serialNumber === item.serialNumber)) {
                const changes: Partial<IInventory> = {};
                if (attributes.condition !== defaultAttributes.condition) changes.condition = attributes.condition;
                if (attributes.location !== defaultAttributes.location) changes.location = attributes.location;
                if (attributes.warrantyExpiration !== defaultAttributes.warrantyExpiration) changes.warrantyExpiration = new Date(attributes.warrantyExpiration);
                if (attributes.comment !== defaultAttributes.comment) changes.comment = attributes.comment;
                if (attributes.testedDate !== defaultAttributes.testedDate) changes.testedDate = new Date(attributes.testedDate);
                if (attributes.tested !== defaultAttributes.tested) changes.tested = attributes.tested as boolean;
                return { ...item, ...changes };
            }
            return item;
        });

        setInventoryTableList(updatedList);
        if (tableRef.current?.selectionContext) {
            tableRef.current.selectionContext.selected = [];
        }
        setSelectedInventoryList([]);
        setAttributes(defaultAttributes);
    };

    const finish = () => {
        setIsSaving(true);
        setTimeout(async () => {
            try {
                await requestUpdateMultipleInventory(inventoryTableList);
                props.onSuccess();
                props.onClose();
            } catch (err) {
                setAlert({ ...alert, label: `${err}`, show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            }
        }, 500);
    };

    useEffect(() => {
        setInventoryTableList(props.selectedInventory);
    }, [props.selectedInventory]);

    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className="modal-header-edit-multi" closeButton>
                    <Modal.Title>
                        <h2 className="modal-title-edit-multi" >Edit Inventory </h2>
                        <p className="modal-title-sub-edit-multi">Please enter inventory information.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-edit-multi">
                    <div className='container d-grid gap-2 container-edit-multi'>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <div>
                                <div>
                                    <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                    <Form className="d-grid" >
                                        <h2 className="form-title-edit-multi">Editable Fields</h2>
                                        <div className="form-container-edit-multi">
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Condition</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                        value={attributes.condition}
                                                        onChange={(e) => setAttributes({ ...attributes, condition: e.target.value })}
                                                    >
                                                        <option value={''}>Choose Condition</option>
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
                                                        onChange={(e) => setAttributes({ ...attributes, comment: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control
                                                        id="location" type="text" placeholder="Location"
                                                        value={attributes.location}
                                                        onChange={(e) => setAttributes({ ...attributes, location: e.target.value })}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Date Tested</Form.Label>
                                                    <Form.Control id="dateTested" type="date"
                                                        value={attributes.testedDate}
                                                        onChange={(e) => setAttributes({ ...attributes, testedDate: e.target.value })} />
                                                </Form.Group>
                                            </div>
                                            <div className="container">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Warranty Expiration</Form.Label>
                                                    <Form.Control id="orderNumber" type="date"
                                                        value={attributes.warrantyExpiration}
                                                        onChange={(e) => {
                                                            setAttributes({ ...attributes, warrantyExpiration: e.target.value })
                                                        }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Tested Status</Form.Label>
                                                    <InputGroup className="radio-group-container-edit-multi">
                                                        <div>
                                                            <Form.Check
                                                                inline
                                                                defaultChecked
                                                                label="Don't Change"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-5'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: null });
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-3'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: true });
                                                                }}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Not Tested"
                                                                name='group2'
                                                                type={'radio'}
                                                                id={'inline-radio-4'}
                                                                onClick={() => {
                                                                    setAttributes({ ...attributes, tested: false });
                                                                }}
                                                            />
                                                        </div>
                                                    </InputGroup>
                                                </Form.Group>
                                                <div className="mb-3 submit-button-container-edit-multi">
                                                    <Button variant="dark" onClick={() => submitChanges()}>Submit Changes</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <hr />
                                <div>
                                    <BootstrapTable
                                        ref={tableRef}
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
                <Modal.Footer className="modal-footer-edit-multi">
                    <div className="footer-button-container-edit-multi">
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
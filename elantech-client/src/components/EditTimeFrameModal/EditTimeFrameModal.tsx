import axios from "axios";
import moment from "moment";
import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";
import IDriver from "../../types/IDriver";

import IStore from '../../types/IStore';
import ITimeFrame from "../../types/ITimeFrame";

interface EditTimeFrameModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getTimeFrames: (driverId: number, orderDate: Date) => void;
    selectedStoreString: string;
    selectedTimeFrame: ITimeFrame;
    selectedDriver: IDriver;
    isVisible: boolean;
}

const EditTimeFrameModalComponent: FunctionComponent<EditTimeFrameModalProps> = (props) => {
    const [storeList, setStoreList] = useState<IStore[]>([]);
    const [selectedStore, setSelectedStore] = useState<number>();
    const [isSaving, setIsSaving] = useState(false);

    const [editedTimeFrame, setEditedTimeFrame] =
        useState<ITimeFrame>({
            orderId: props.selectedTimeFrame.orderId,
            storeId: selectedStore,
            driverId: props.selectedTimeFrame.driverId,
            customerName: props.selectedTimeFrame.customerName,
            town: props.selectedTimeFrame.town,
            orderNumber: props.selectedTimeFrame.orderNumber,
            timeFrame: props.selectedTimeFrame.timeFrame,
            orderDate: props.selectedTimeFrame.orderDate
        });

    useEffect(() => {
        axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
            .then((response) => {
                const _storeList = response?.data?.payload;
                setStoreList(_storeList);
                for (var i = 0; i < _storeList.length; i++) {
                    if (_storeList[i].storeName?.toLocaleLowerCase === props.selectedStoreString.toLocaleLowerCase) {
                        setSelectedStore(i + 1);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const editTimeFrame = async () => {
        setIsSaving(true);
        setTimeout(() => {
            axios.put(`${BASE_API_URL}timeFrames`, editedTimeFrame, { withCredentials: true })
                .then((response) => {
                    props.getTimeFrames(Number(props.selectedDriver.driverId), props.selectedTimeFrame.orderDate);
                    setIsSaving(false);
                    props.onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 500);
    };
    return (
        <Modal backdrop="static" show={props.isVisible} onHide={props.onClose} className='bg-dark'>
            <Modal.Header closeButton>
                <Modal.Title style={{ display: '' }}>
                    <h4 style={{ verticalAlign: '' }} >Editing Time Frame for </h4>
                    <h4 style={{ fontWeight: 500, marginLeft: 5 }}>{props.selectedDriver.name} on {moment(props.selectedTimeFrame.orderDate).format("MM/DD/YYYY")}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'red', fontSize: 18, fontWeight: 400 }}>
                Please enter time frame information.
            </Modal.Body>
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
                    <Form className="container d-grid">
                        <div className="form-group mb-3">
                            <Form.Label>Store</Form.Label>
                            <select id="inputState"
                                onChange={(e) => {
                                    setEditedTimeFrame({ ...editedTimeFrame, storeId: Number(e.target.value) })
                                }}
                                className="form-control"
                                value={selectedStore}
                            >
                                {storeList.map((store, i) => {
                                    return <option value={i + 1}>{store.storeName}</option>
                                }
                                )}
                            </select>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.customerName} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, customerName: (e.target.value) })} type="text" placeholder="Customer Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.town} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, town: (e.target.value) })} id="town" type="text" placeholder="Town"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.orderNumber} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, orderNumber: (e.target.value) })} id="orderNumber" type="text" placeholder="Order Number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Frame</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.timeFrame} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, timeFrame: (e.target.value) })} id="timeFrame" type="text" placeholder="Time Frame"
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="primary" onClick={async () => {
                            editTimeFrame();
                            setEditedTimeFrame({
                                orderId: 0,
                                storeId: 0,
                                driverId: 0,
                                customerName: '',
                                town: '',
                                orderNumber: '',
                                timeFrame: '',
                                orderDate: new Date()
                            });
                        }}>
                            Edit Time Frame
                        </Button>
                    </Form>
                }
            </div>
        </Modal>
    );
};

export const EditTimeFrameModal = withRouter(EditTimeFrameModalComponent);
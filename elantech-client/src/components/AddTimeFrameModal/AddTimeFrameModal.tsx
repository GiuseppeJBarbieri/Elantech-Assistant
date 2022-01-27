import axios from "axios";
import moment from "moment";
import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";
import IDriver from "../../types/IDriver";
import IStore from '../../types/IStore';
import ITimeFrame from "../../types/ITimeFrame";

interface AddTimeFrameModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalState: { modalVisible: boolean, selectedDriver: IDriver };
    getTimeFrames: (driverId: number, orderDate: Date) => void;
    selectedDate: string;
}

const AddTimeFrameModalComponent: FunctionComponent<AddTimeFrameModalProps> = (props) => {
    const [storeList, setStoreList] = useState<IStore[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    
    const [timeFrame, setTimeFrame] =
        useState<ITimeFrame>({
            orderId: 0,
            storeId: 0,
            driverId: props.modalState.selectedDriver.driverId,
            customerName: '',
            town: '',
            orderNumber: '',
            timeFrame: '',
            orderDate: new Date(props.selectedDate)
        });
    

    useEffect(() => {
        axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
            .then((response) => {
                setStoreList(response?.data?.payload);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addTimeFrame = async (close: boolean) => {
        setIsSaving(true);
        setTimeout(() => {
            // Trimming out store id b/c validation doesn't require
            const _timeFrame = { ...timeFrame };
            delete _timeFrame.orderId;
            axios.post(`${BASE_API_URL}timeFrames`, _timeFrame, { withCredentials: true })
                .then((response) => {
                    props.getTimeFrames(Number(props.modalState.selectedDriver.driverId), new Date(props.selectedDate));
                    setTimeFrame({
                        orderId: 0,
                        storeId: 0,
                        driverId: props.modalState.selectedDriver.driverId,
                        customerName: '',
                        town: '',
                        orderNumber: '',
                        timeFrame: '',
                        orderDate: new Date(props.selectedDate)
                    });
                    setIsSaving(false);
                    if(close) {
                        props.onClose();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsSaving(false);
                });
        }, 400);
    };
    
    return (
        <Modal backdrop="static" show={props.modalState.modalVisible} onHide={props.onClose} className='bg-dark'>
            <Modal.Header closeButton>
                <Modal.Title style={{ display: '' }}>
                    <h4 style={{ verticalAlign: '' }} >Adding Time Frame for </h4>
                    <h4 style={{ fontWeight: 500, marginLeft: 5 }}>{props.modalState.selectedDriver.name} on {moment(props.selectedDate).format("MM/DD/YYYY")}</h4>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'red', fontSize: 18, fontWeight: 400 }}>
                Please enter time frame information.
                Date:
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
                                    setTimeFrame({ ...timeFrame, storeId: Number(e.target.value) })
                                }}
                                className="form-control"
                                style={{ color: 'grey' }}
                                value={timeFrame.storeId}
                                placeholder="Choose Store..."
                            >
                                <option key='0' value={0}>Choose Store...</option>
                                {storeList.map((store) => <option value={store.storeId}>{store.storeName}</option>)}
                            </select>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                value={timeFrame.customerName} onChange={(e) => setTimeFrame({ ...timeFrame, customerName: (e.target.value) })} type="text" placeholder="Customer Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control
                                value={timeFrame.town} onChange={(e) => setTimeFrame({ ...timeFrame, town: (e.target.value) })} id="town" type="text" placeholder="Town"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control
                                value={timeFrame.orderNumber} onChange={(e) => setTimeFrame({ ...timeFrame, orderNumber: (e.target.value) })} id="orderNumber" type="text" placeholder="Order Number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Frame</Form.Label>
                            <Form.Control
                                value={timeFrame.timeFrame} onChange={(e) => setTimeFrame({ ...timeFrame, timeFrame: (e.target.value) })} id="timeFrame" type="text" placeholder="Time Frame"
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" onClick={async () => {
                            addTimeFrame(false);
                        }}>
                            Add Time Frame
                        </Button>
                        <hr />
                        <Button variant="primary" onClick={async () => {
                            addTimeFrame(true);
                        }}>
                            Finish Time Frames
                        </Button>
                    </Form>
                }
            </div>
        </Modal>
    );
};

export const AddTimeFrameModal = withRouter(AddTimeFrameModalComponent);
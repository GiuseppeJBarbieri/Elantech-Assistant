import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedRow } from './ExpandedRow';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './TimeFrameTable.css';
// import ITimeFrame from '../../types/ITimeFrame';
import { Spinner } from 'react-bootstrap';
import IDriver from '../../types/IDriver';
import { Plus } from 'react-bootstrap-icons';
import { AddTimeFrameModal } from '../AddTimeFrameModal/AddTimeFrameModal';
import ITimeFrame from '../../types/ITimeFrame';

interface TimeFrameTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IDriver[];
    isPending: boolean;
    selectedDate: string;
    getTimeFrames: (driverId: number, orderDate: Date) => void;
    timeFrameList: ITimeFrame[];
    isNestedTableLoading: boolean;
}

const TimeFrameTableComponent: FunctionComponent<TimeFrameTableProps> = (props) => {

    const [modalState, setModalState] = useState<{ modalVisible: boolean, selectedDriver: IDriver }>({ modalVisible: false, selectedDriver: {} });
    
    const rankFormatter = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => { e.stopPropagation() }}
            >
                <div onClick={(e) => {
                    setModalState({ modalVisible: true, selectedDriver: data });
                }}
                >
                    <Plus
                        style={{ fontSize: 20, color: 'white' }}
                    />
                </div>
            </div>
        );
    };
    const columns = [
        {
            id: 1,
            dataField: "driverId",
            text: "Driver ID",
            sort: true,
            headerAttrs: { width: 150 },
            attrs: { width: 50 }
        },
        {
            id: 2,
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            id: 3,
            dataField: "addTimeFrame",
            text: "Add Time Frame",
            sort: false,
            formatter: rankFormatter,
            headerAttrs: { width: 150 },
            attrs: { width: 50 }
        }
    ];
    return (
        <div>
            {props.isPending ?
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
                <div key='drivers'>
                    <hr />
                    {/** Shows drivers */}
                    <BootstrapTable
                        keyField="driverId"
                        bootstrap4
                        data={props.data}
                        columns={columns}
                        classes="table table-dark table-condensed table-hover table-striped"
                        expandRow={{
                            onlyOneExpanding: true,
                            renderer: (row, index) => {
                                return (
                                    <ExpandedRow
                                        key='expandRowKey'
                                        data={{ driver: row, orderDate: props.selectedDate }}
                                        getTimeFrames={props.getTimeFrames}
                                        timeFrameList={props.timeFrameList}
                                        isNestedTableLoading={props.isNestedTableLoading}
                                    />
                                )
                            }
                        }}
                        pagination={paginationFactory({ sizePerPage: 4 })}
                    />
                </div>
            }
            {
                // if true then render this
                modalState.modalVisible &&
                <AddTimeFrameModal
                    modalState={modalState}
                    getTimeFrames={props.getTimeFrames}
                    selectedDate={props.selectedDate}
                    onClose={async () => {
                        setModalState({ ...modalState, modalVisible: false });
                    }}
                />
            }
            
        </div >
    );
};

export const TimeFrameTable = withRouter(TimeFrameTableComponent);

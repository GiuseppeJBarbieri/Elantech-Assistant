import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './DriverTable.css';
import IDriver from '../../types/IDriver';
import { Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

interface DriverTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IDriver[];
    isPending: boolean;
    onDriverRemoved: (driverId: number) => void;
}

const DriverTableComponent: FunctionComponent<DriverTableProps> = ({ history, data, isPending, onDriverRemoved }) => {
    const rankFormatterRemove = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                }}
                onClick={() => onDriverRemoved(data.driverId)}
            >
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );

    };

    const column = [
        {
            id: 1,
            dataField: "driverId",
            text: "ID",
            sort: true,
            headerAttrs: { width: 100 },
            attrs: { width: 100 }
        },
        {
            id: 2,
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            id: 3,
            dataField: "removeStore",
            text: "Remove",
            sort: false,
            formatter: rankFormatterRemove,
            headerAttrs: { width: 75 },
            attrs: { width: 75 }
        }
    ];
    
    return (
        <div>
            {isPending ?
                <div className='spinnerDiv' >
                    <ul>
                        <li style={{ listStyle: 'none' }}>
                            <Spinner animation="border" role="status" />
                        </li>
                        <li style={{ listStyle: 'none' }}>
                            <label>Loading...</label>
                        </li>
                    </ul>
                </div>
                :
                <div>
                    <hr />
                    <BootstrapTable
                        key='driversTbl'
                        bootstrap4
                        columns={column}
                        keyField="driverId"
                        data={data}
                        classes="table table-dark table-condensed table-hover table-striped"
                        pagination={paginationFactory({ sizePerPage: 10 })}
                    />
                </div>
            }
        </div >
    );
};

export const DriverTable = withRouter(DriverTableComponent);
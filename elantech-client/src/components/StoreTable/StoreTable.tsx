import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Spinner } from 'react-bootstrap';
import IStore from '../../types/IStore';
import './StoreTable.css'
import { Trash } from 'react-bootstrap-icons';

/**
 * TODO
 * This should be abstracted to a customFactory so these components can be reusable 
 */
interface StoreTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IStore[];
    isPending: boolean;
    onStoreRemoved: (storeId: number) => void;
}

const StoreTableComponent: FunctionComponent<StoreTableProps> = ({ history, data, isPending, onStoreRemoved }) => {

    const rankFormatterRemove = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                }}
                onClick={() => onStoreRemoved(data.storeId)}
            >
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );

    };
    
    const columns = [
        {
            id: 1,
            dataField: "storeId",
            text: "ID",
            sort: true,
            headerAttrs: { width: 75 },
            attrs: { width: 50 }
        },
        {
            id: 2,
            dataField: "storeName",
            text: "Name",
            sort: true,
            headerAttrs: { width: 175 },
            attrs: { width: 50 }
        },
        {
            id: 3,
            dataField: "emailAddress",
            text: "Email Address",
            sort: true
        },
        {
            id: 4,
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
                        key='storesTbl'
                        bootstrap4
                        keyField="storeId"
                        data={data}
                        columns={columns}
                        classes="table table-dark table-condensed table-hover table-striped"
                        pagination={paginationFactory({ sizePerPage: 10 })}
                    />
                </div>
            }
        </div >
    );
};

export const StoreTable = withRouter(StoreTableComponent);
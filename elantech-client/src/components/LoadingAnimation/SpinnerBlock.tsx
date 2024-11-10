import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import './SpinnerBlock.css'

const SpinnerBlockComponent: React.FunctionComponent = () => {
    return (
        <div className={'spinnerDiv'}>
            <ul>
                <li key='1' style={{ listStyle: 'none' }}>
                    <Spinner animation="border" role="status" />
                </li>
                <li key='2' style={{ listStyle: 'none' }}>
                    <label>Loading...</label>
                </li>
            </ul>
        </div>
    );
};

export default SpinnerBlockComponent;
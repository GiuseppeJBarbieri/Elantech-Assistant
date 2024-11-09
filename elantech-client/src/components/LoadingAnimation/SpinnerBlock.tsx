import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import './SpinnerBlock.css'
interface SpinnerBlockProps extends React.HTMLAttributes<HTMLDivElement> { }

const SpinnerBlockComponent: React.FunctionComponent<SpinnerBlockProps> = () => {
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
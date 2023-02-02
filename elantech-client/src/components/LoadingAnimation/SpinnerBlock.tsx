import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './SpinnerBlock.css'
interface SpinnerBlockProps extends RouteComponentProps, React.HTMLAttributes<HTMLDivElement> { }

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

export const SpinnerBlock = withRouter(SpinnerBlockComponent);
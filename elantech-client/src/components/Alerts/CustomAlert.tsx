
import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Alert } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface CustomAlertProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    label: string;
    showAlert: boolean;
    type: string;
}

const CustomAlertComponent: FunctionComponent<CustomAlertProps> = (props) => {
    return (
        <div>
            <Alert key={props.type} variant={props.type} show={props.showAlert}>
                {props.label}
            </Alert>
        </div>
    );
};

export const CustomAlert = withRouter(CustomAlertComponent);

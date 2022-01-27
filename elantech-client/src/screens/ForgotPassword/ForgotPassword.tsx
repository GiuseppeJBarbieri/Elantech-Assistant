import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './ForgotPassword.css';

interface ForgotPasswordProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {}

export const ForgotPasswordLayout: FunctionComponent<ForgotPasswordProps> = ({ history }) => {
  return (
    <div
      className="ForgotPassword"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}
    >
      <h1>
          FORGOT PASSWORD
      </h1>
      <button type="button" onClick={() => history.push(PAGE_ROUTES.LOGIN)}>BACK TO LOGIN</button>
    </div>
  );
};

export const ForgotPassword = withRouter(ForgotPasswordLayout);

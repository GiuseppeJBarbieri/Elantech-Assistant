import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './Register.css';

interface RegisterProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {}

export const RegisterLayout: FunctionComponent<RegisterProps> = ({ history }) => {
  return (
    <div
      className="Register"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}
    >
      <h1>
          REGISTER
      </h1>
      <button type="button" onClick={() => history.push(PAGE_ROUTES.LOGIN)}>BACK TO LOGIN</button>
    </div>
  );
};

export const Register = withRouter(RegisterLayout);

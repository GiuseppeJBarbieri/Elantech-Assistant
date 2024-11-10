import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './ForgotPassword.css';

export const ForgotPasswordLayout: FunctionComponent = () => {
  const navigate = useNavigate();
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
      <button type="button" onClick={() => navigate(PAGE_ROUTES.LOGIN)}>BACK TO LOGIN</button>
    </div>
  );
};

export default ForgotPasswordLayout;

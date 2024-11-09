import React, { FunctionComponent, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './ForgotPassword.css';

interface ForgotPasswordProps extends HTMLAttributes<HTMLDivElement> {}

export const ForgotPasswordLayout: FunctionComponent<ForgotPasswordProps> = () => {
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

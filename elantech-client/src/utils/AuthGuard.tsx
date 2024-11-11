
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from './Auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FunctionComponent<AuthGuardProps> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
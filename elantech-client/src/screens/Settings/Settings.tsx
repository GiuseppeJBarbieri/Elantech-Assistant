import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { clearCookie } from '../../utils/Auth';

import './Settings.css';

interface SettingsProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsLayout: FunctionComponent<SettingsProps> = ({ history, loggedIn, setLoggedIn }) => {
  const title = 'Settings';

  const logoutClicked = (): void => {
    clearCookie();
    setLoggedIn(false);
    history.push(PAGE_ROUTES.LOGIN);
  };

  return (
    <div className="Settings">
      {title}
      <button type="button" onClick={logoutClicked}>Logout</button>
    </div>
  );
};

export const Settings = withRouter(SettingsLayout);

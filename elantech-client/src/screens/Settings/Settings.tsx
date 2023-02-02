/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';


import './Settings.css';

interface SettingsProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsLayout: FunctionComponent<SettingsProps> = ({ history, loggedIn, setLoggedIn }) => {
  // const title = 'Settings';

  // const logoutClicked = (): void => {
  //   clearCookie();
  //   setLoggedIn(false);
  //   history.push(PAGE_ROUTES.LOGIN);
  // };

  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Settings</h2>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>

        </div>
      </div>
    </section >
  );
};

export const Settings = withRouter(SettingsLayout);

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

import './Settings.css';

interface SettingsProps extends HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsLayout: FunctionComponent<SettingsProps> = ({ loggedIn, setLoggedIn }) => {
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Settings</h2>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          {/* Add your settings content here */}
        </div>
      </div>
    </section>
  );
};

export default SettingsLayout;

import * as React from 'react';
import { FunctionComponent } from 'react';

import './NotFound.css';

const NotFound: FunctionComponent = () => {
  const title = 'NOT FOUND';

  return (
    <div className="NotFound text-white container">
      {title}
    </div>
  );
};

export default NotFound;

import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

registerServiceWorker();

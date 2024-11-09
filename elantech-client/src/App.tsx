import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// PS initialization
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../src/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { isLoggedIn } from './utils/Auth';
import SideNavBar from './components/SideNavBar/SideNavBar';
import TopToolBar from './components/TopToolBar/TopToolBar';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import Register from './screens/Register/Register';
import Settings from './screens/Settings/Settings';
import Home from './screens/Home/Home';
import Quotes from './screens/Quotes/Quotes';
import Receiving from './screens/Receiving/Receiving';
import Procurement from './screens/Procurement/Procurement';
import Outgoing from './screens/Outgoing/Outgoing';
import BrokerBin from './screens/BrokerBin/BrokerBin';

import NotFound from './screens/NotFound/NotFound';

interface AppProps {
  width?: string;
}

const App: React.FunctionComponent<AppProps> = (props) => {
  const [panelVisible, setPanelVisible] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);
  return (
    <Router>
      <div className="App">
        {loggedIn && <TopToolBar setPanelVisible={setPanelVisible} />}
        {loggedIn && <SideNavBar panelVisible={panelVisible} setPanelVisible={setPanelVisible} />}

        <Routes>
          {/* Initial route based on if currently logged in */}
          <Route path="/" element={
            loggedIn ?
              <Navigate to="/home" /> :
              <Navigate to="/login" />
          } />

          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/receiving" element={<Receiving />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/outgoing" element={<Outgoing />} />
          <Route path="/brokerBin" element={<BrokerBin />} />
          <Route path="/settings" element={<Settings loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>
    </Router>
  );
}

export default (App);

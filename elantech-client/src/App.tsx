import * as React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';

// PS initialization
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../src/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { isLoggedIn } from './utils/Auth';
import { SideNavBar } from './components/SideNavBar/SideNavBar';
import { TopToolBar } from './components/TopToolBar/TopToolBar';
import { Login } from './screens/Login/Login';
import { ForgotPassword } from './screens/ForgotPassword/ForgotPassword';
import { Register } from './screens/Register/Register';
import { Home } from './screens/Home/Home';
import { Settings } from './screens/Settings/Settings';
import { Drivers } from './screens/Drivers/Drivers';
import { Stores } from './screens/Stores/Stores';
import NotFound from './screens/NotFound/NotFound';

interface AppProps {
  width?: string;
}

const App: React.FunctionComponent<AppProps> = (props) => {
  const [panelVisible, setPanelVisible] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);

  return (
    <HashRouter>
      <div className="App">
        {loggedIn && <TopToolBar setPanelVisible={setPanelVisible} />}
        {loggedIn && <SideNavBar panelVisible={panelVisible} setPanelVisible={setPanelVisible} />}
      
          <Switch>
            {/* Initial route based on if currently logged in */}
            <Route exact path="/" render={() => {
              return (
                loggedIn ?
                  <Redirect to="/home" /> :
                  <Redirect to="/login" />
              );
            }} />

            <Route exact path="/login" render={() => <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/home" component={Home} />
            <Route exact path="/drivers" component={Drivers} />
            <Route exact path="/stores" component={Stores} />
            <Route exact path="/settings" render={() => <Settings loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

            <Route component={NotFound} />
            
          </Switch>
        
      </div>
    </HashRouter>
  );
}

export default (App);

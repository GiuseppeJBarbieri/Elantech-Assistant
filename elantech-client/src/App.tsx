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
import { Settings } from './screens/Settings/Settings';
import { Home } from './screens/Home/Home';
import { Quotes } from './screens/Quotes/Quotes';
import { Receiving } from './screens/Receiving/Receiving';
import { useEffect } from 'react';
import SocketService from './utils/SocketService';

import NotFound from './screens/NotFound/NotFound';
import { NewProduct } from './screens/sub-screens/products/NewProduct';
import { NewProductSuccess } from './screens/sub-screens/products/NewProductSuccess';
// import AuthGuard from './utils/AuthGuard';

interface AppProps {
  width?: string;
}

const App: React.FunctionComponent<AppProps> = (props) => {
  const [panelVisible, setPanelVisible] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);
  useEffect(() => {
    // Initialize socket connection when app starts
    SocketService.connect();

    // Cleanup on app unmount
    return () => {
      SocketService.disconnect();
    };
  }, []);
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
          {/* <AuthGuard> */}
          <Route exact path="/home" render={() => <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/quotes" component={Quotes} />
          <Route exact path="/receiving" component={Receiving} />
          <Route exact path="/settings" render={() => <Settings loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route exact path="/new-product" component={NewProduct} />
          <Route exact path="/new-product/success" component={NewProductSuccess} />
          {/* </AuthGuard> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default (App);

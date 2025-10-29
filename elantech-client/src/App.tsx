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
import { NewProduct } from './screens/SubScreens/Products/NewProduct/NewProduct';
import { NewProductSuccess } from './screens/SubScreens/Products/NewProduct/NewProductSuccess';
import { EditProductSuccess } from './screens/SubScreens/Products/EditProduct/EditProductSuccess';
import { EditProduct } from './screens/SubScreens/Products/EditProduct/EditProduct';
import { DeleteProduct } from './screens/SubScreens/Products/DeleteProduct/DeleteProduct';
import { DeleteProductSuccess } from './screens/SubScreens/Products/DeleteProduct/DeleteProductSuccess';

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
          <Route exact path="/edit-product" component={EditProduct} />
          <Route exact path="/edit-product/success" component={EditProductSuccess} />
          <Route exact path="/delete-product" component={DeleteProduct} />
          <Route exact path="/delete-product/success" component={DeleteProductSuccess} />
          {/* </AuthGuard> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default (App);

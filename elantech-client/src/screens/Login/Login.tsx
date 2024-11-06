/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useState, FunctionComponent, HTMLAttributes } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../constants/API';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { CustomAlert } from '../../components/Alerts/CustomAlert';
import { defaultAlert } from '../../constants/Defaults';
import './Login.css';

interface LoginProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginLayout: FunctionComponent<LoginProps> = ({ history, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(defaultAlert);
  const loginClicked = () => {
    const PASSWORD_REGEX = /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/;
    if (!email) {
      // alert('email cannot be empty!');
    } else if (!PASSWORD_REGEX.exec(password)) {
      // alert(`Passwords must have at least:
      // \n8 characters
      // \nOne upper case
      // \nOne lower case
      // \nOne number
      // \nOne special character
      // `);

    } else {
      const data = {
        username: email,
        password,
      };

      axios.post(`${BASE_API_URL}user/login`, data, { withCredentials: true })
        .then(() => {
          setLoggedIn(true);
          history.push(PAGE_ROUTES.HOME);
        })
        .catch((err) => {
          setPassword('');
          setAlert({ ...alert, label: `${err}`, show: true });
          setTimeout(() => setAlert({ ...alert, show: false }), 3000);
        });
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      loginClicked();
    }
  };
  return (
    <div className="Login login-section text-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bottom: 0, position: 'absolute' }}>
      <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
      <div style={{ margin: 'auto' }}>
        <div className='container rounded  frame' style={{ textAlign: 'center', padding: 150 }}>
          <h2 style={{ 'marginBottom': 10, fontWeight: 400 }}>Welcome Back</h2>
          <p style={{ 'marginBottom': 25, fontWeight: 200, color: '#878787' }}>Elantech Management System</p>
          <div className='container' style={{ 'maxWidth': 350, 'borderRadius': '15px !important' }}>
            <input required type='text' className="form-control" placeholder="Enter Email" style={{ 'marginBottom': 10, 'textAlign': 'center', 'backgroundColor': '#0f0f0f', 'borderColor': '#202020', 'color': '#fff', height: 45 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className="form-control" placeholder="Password" style={{ 'marginBottom': 15, 'textAlign': 'center', 'backgroundColor': '#0f0f0f', 'borderColor': '#202020', 'color': '#fff', height: 45 }} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
            <hr style={{ 'maxWidth': '80%', 'margin': 'auto', 'marginBottom': 15 }} />
            <button type='button' className='btn btn-primary form-control' style={{ 'marginBottom': 10, height: 45 }} onClick={loginClicked} >Login</button>
            <div className='d-flex justify-content-between'>
              <Link to="/forgotPassword" style={{ textDecoration: 'none' }}>
                <p className="forgotPassword">Forgot password?</p>
              </Link>
              <p style={{ 'marginLeft': 10, 'marginRight': 10 }}>|</p>
              <Link to="/register" style={{ textDecoration: 'none' }} >
                <p className="rtd">Create an account</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Login = withRouter(LoginLayout);


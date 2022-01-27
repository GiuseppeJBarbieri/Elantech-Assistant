import React, { useState, FunctionComponent, HTMLAttributes } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

import { BASE_API_URL } from '../../constants/API';
import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './Login.css';

interface LoginProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginLayout: FunctionComponent<LoginProps> = ({ history, loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginClicked = () => {
    const PASSWORD_REGEX = /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/;
    if (!email) {
      alert('email cannot be empty!');
    } else if (!PASSWORD_REGEX.exec(password)) {
      alert(`Passwords must have at least:
      \n8 characters
      \nOne upper case
      \nOne lower case
      \nOne number
      \nOne special character
      `);
    } else {
      const data = {
        username: email,
        password,
      };

      axios.post(`${BASE_API_URL}users/login`, data, { withCredentials: true })
        .then(() => {
          setLoggedIn(true);
          history.push(PAGE_ROUTES.HOME);
        })
        .catch(() => {
          // TODO: Hide loading spinner and display error message
          setPassword('');
          alert('Incorrect credentials');
        });
    }
  };

  return (
    <div className="Login login-section text-white" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bottom: 0, position: 'absolute' }}>
      <div className='bg-dark' style={{ margin: 'auto' }}>
        <div style={{ borderWidth: 50, borderColor: 'white' }}>
          <div className='container rounded border-white border' style={{ textAlign: 'center', padding: 50 }}>

            <h1 className='neonText' style={{ 'marginBottom': 30, fontWeight: 300 }}>Elantech Assistant</h1>
            <h2 style={{ 'marginBottom': 25, fontWeight: 300 }}>Sign In</h2>

            <form className='container' style={{ 'maxWidth': 350 }}>

              <input type='email' className="form-control" placeholder="Enter Email" style={{ 'marginBottom': 15, 'textAlign': 'center' }} onChange={(e) => setEmail(e.target.value)} />
              <input type='password' className="form-control" placeholder="Password" style={{ 'marginBottom': 15, 'textAlign': 'center' }} onChange={(e) => setPassword(e.target.value)} />

              <hr style={{ 'maxWidth': '80%', 'margin': 'auto', 'marginBottom': 15 }} />
              <button type='submit' className='btn btn-primary form-control' style={{ 'marginBottom': 5 }} onClick={loginClicked} >Login</button>

              <div className='d-flex justify-content-between'>
                <Link to="/forgotPassword" style={{ textDecoration: 'none' }}>
                  <p className="forgotPassword">Forgot password?</p>
                </Link>
                <p>|</p>
                <Link to="/register" style={{ textDecoration: 'none' }} >
                  <p className="rtd">Create an account</p>
                </Link>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export const Login = withRouter(LoginLayout);

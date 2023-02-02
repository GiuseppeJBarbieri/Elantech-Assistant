import axios from 'axios';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BASE_API_URL } from '../../constants/API';

import { PAGE_ROUTES } from '../../constants/PageRoutes';
import IUser from '../../types/IUser';

import './Register.css';

interface RegisterProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const RegisterLayout: FunctionComponent<RegisterProps> = ({ history }) => {
  const [newUser, setNewUser] = useState<IUser>(
    {
      userTypeId: 1,
      email: 'giuseppe@elantechus.com',
      firstName: 'Giuseppe',
      lastName: 'Barbieri',
      password: 'Admin123!',
      phoneNumber: '631-278-8517',
    }
  );
  const registerClicked = () => {
    
    // const PASSWORD_REGEX = /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/;
    axios.post(`${BASE_API_URL}users/`, newUser, { withCredentials: true })
        .then(() => {
          history.push(PAGE_ROUTES.HOME);
        })
        .catch(() => {
          alert('Incorrect credentials');
        });
  };
  return (
    <section className="text-white login-main-section overflow-auto">
      <div className="Register" style={{ padding: 20 }} >
        <h2 style={{ fontWeight: 300 }}>Create new account.</h2>
        <p style={{ fontWeight: 300, paddingLeft: 2 }}>Please enter the information below.</p>
        <hr />
        <Form className="container d-grid" style={{}}>
          <div style={{ paddingLeft: 5, paddingRight: 5 }}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: (e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: (e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: (e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                type="text"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: (e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: (e.target.value) })}
              />
            </Form.Group>
          </div>
          <hr />

          <Button variant="primary" type="submit" onClick={registerClicked}>
            Create Account
          </Button>
          <br />
          <Button variant="primary" type="submit" onClick={() => history.push(PAGE_ROUTES.LOGIN)}>
            Back
          </Button>
        </Form>
      </div>
    </section >
  );
};

export const Register = withRouter(RegisterLayout);

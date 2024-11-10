import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../constants/API';

import { PAGE_ROUTES } from '../../constants/PageRoutes';
import IUser from '../../types/IUser';

import './Register.css';

export const RegisterLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<IUser>(
    {
      email: 'giuseppe@elantechus.com',
      firstName: 'Giuseppe',
      lastName: 'Barbieri',
      password: 'Admin123!',
      phoneNumber: '631-278-8517',
    }
  );

  const registerClicked = () => {
    axios.post(`${BASE_API_URL}users/`, newUser, { withCredentials: false })
      .then(() => {
        navigate(PAGE_ROUTES.HOME);
      })
      .catch(() => {
        alert('Incorrect credentials');
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerClicked();
  };

  return (
    <div className="register-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            id="firstName"
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterLayout;

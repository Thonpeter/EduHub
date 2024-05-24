'use client';

import { useState } from 'react';
import styled from 'styled-components';

const FormContainerWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  position: relative;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #333;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  color: #0070f3;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
    outline: none;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0051c7;
    transform: translateY(-2px);
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #0070f3;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0051c7;
  }
`;

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <FormContainerWrapper>
      <FormContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <FormTitle>Login</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
        <ForgotPasswordLink href="/forgot-password">
          Forgot your password?
        </ForgotPasswordLink>
      </FormContainer>
    </FormContainerWrapper>
  );
};

export default LoginForm;
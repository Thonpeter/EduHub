'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD88TzzcIw3mWjE3ap07W3gJkebVo76ptI',
  authDomain: 'eduhub-7d060.firebaseapp.com',
  projectId: 'eduhub-7d060',
  storageBucket: 'eduhub-7d060.appspot.com',
  messagingSenderId: '1009687179178',
  appId: '1:1009687179178:web:c6ba2222f617b4f08ec5d3',
  measurementId: 'G-X9DG7LY1E9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// Styled components
const FormContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #444;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const GoogleLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -15px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: -15px;
  margin-bottom: 20px;
`;

const SignupForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signup successful', user);

      // Send email verification
      await sendEmailVerification(user);

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setSuccess('Signup successful! Please check your email for verification.');

      // Redirect to profile page or any other desired page
      router.push('/profile');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(`An error occurred during sign-up: ${error.message}`);
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signup with Google successful', user);

      // Additional user data setup or redirection logic here
      setSuccess('Signup with Google successful!');

      // Redirect to profile page or any other desired page
      router.push('/profile');
    } catch (error) {
      console.error('Error signing up with Google:', error.message);
      setError(`An error occurred during Google sign-up: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <FormTitle>Sign Up</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
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
            minLength={6}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
      <GoogleButton type="button" onClick={handleGoogleSignup} disabled={loading}>
        <GoogleLogo src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
        {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
      </GoogleButton>
    </FormContainer>
  );
};

export default SignupForm;
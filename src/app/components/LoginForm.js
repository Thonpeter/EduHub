'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import Dashboard from './Dashboard';

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
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

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

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess('');
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login successful', user);
        setSuccess('Login successful!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error.message);
        if (error.code === 'auth/user-not-found') {
          setError('No account found with this email. Please sign up first.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else {
          setError(`An error occurred during login: ${error.message}`);
        }
      }
  
      setLoading(false);
    };
  
    const handleGoogleLogin = async () => {
      setLoading(true);
      setError('');
      setSuccess('');
  
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
  
        // Update the user's display name if it doesn't exist
        if (!user.displayName) {
          const displayName = user.email.split('@')[0];
          await updateProfile(user, { displayName });
        }
  
        console.log('Login with Google successful', user);
        setSuccess('Login with Google successful!');
        router.push('/Dashboard');
      } catch (error) {
        console.error('Error logging in with Google:', error.message);
        setError(`An error occurred during Google login: ${error.message}`);
      }
  
      setLoading(false);
    };
  
    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess('Password reset email sent! Please check your inbox.');
      } catch (error) {
        console.error('Error sending password reset email:', error.message);
        setError(`An error occurred while sending the password reset email: ${error.message}`);
      }
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <GoogleButton type="button" onClick={handleGoogleLogin} disabled={loading}>
            <GoogleLogo src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
            {loading ? 'Logging in with Google...' : 'Login with Google'}
          </GoogleButton>
          <ForgotPasswordLink href="#" onClick={handleForgotPassword}>
            Forgot your password?
          </ForgotPasswordLink>
        </FormContainer>
      </FormContainerWrapper>
    );
  };
  
  export default LoginForm;
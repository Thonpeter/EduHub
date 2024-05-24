'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
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
const analytics = getAnalytics(app);

const AccountPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const UserInfoContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfoItem = styled.div`
  margin-bottom: 10px;
`;

const UserInfoLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const UserInfoValue = styled.span`
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0051c7;
  }
`;

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <AccountPageContainer>
      <PageTitle>Account Details</PageTitle>
      <UserInfoContainer>
        <UserInfoItem>
          <UserInfoLabel>Name: </UserInfoLabel>
          <UserInfoValue>{user.displayName}</UserInfoValue>
        </UserInfoItem>
        <UserInfoItem>
          <UserInfoLabel>Email: </UserInfoLabel>
          <UserInfoValue>{user.email}</UserInfoValue>
        </UserInfoItem>
        {/* Add more user info items as needed */}
      </UserInfoContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </AccountPageContainer>
  );
};

export default AccountPage;
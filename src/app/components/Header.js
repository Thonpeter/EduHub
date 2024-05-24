'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(!showSignupForm);
    setShowLoginForm(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>EduHub</div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/subjects" className={styles.navLink}>
              Subjects
            </Link>
          </li>
          <li className={styles.navItem}>
            <button className={styles.navLink} onClick={handleLoginClick}>
              Login
            </button>
          </li>
          <li className={styles.navItem}>
            <button className={styles.navLink} onClick={handleSignupClick}>
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
      {(showLoginForm || showSignupForm) && (
        <div className={styles.overlay}>
          {showLoginForm && (
            <div className={styles.formContainer}>
              <LoginForm onClose={() => setShowLoginForm(false)} />
            </div>
          )}
          {showSignupForm && (
            <div className={styles.formContainer}>
              <SignupForm onClose={() => setShowSignupForm(false)} />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
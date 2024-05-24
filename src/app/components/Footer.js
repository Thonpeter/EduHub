import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>&copy; 2023 EduHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
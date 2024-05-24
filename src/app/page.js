import styles from './page.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to EduHub</h1>
        <p className={styles.description}>
          A platform for seamless education material management and sharing.
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Comprehensive Subjects</h2>
          <p className={styles.featureDescription}>
            Explore a wide range of subjects and courses tailored to your learning needs.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Seamless Material Management</h2>
          <p className={styles.featureDescription}>
            Easily upload, organize, and access your study materials in one centralized platform.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Interactive Learning</h2>
          <p className={styles.featureDescription}>
            Engage with interactive videos, quizzes, and assessments to enhance your learning experience.
          </p>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "EduHub has revolutionized the way I study. It's so convenient to have all my materials in one place!"
          </p>
          <p className={styles.testimonialAuthor}>- John Doe</p>
        </div>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "I love how interactive and engaging the learning experience is on EduHub. It makes studying fun!"
          </p>
          <p className={styles.testimonialAuthor}>- Jane Smith</p>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Start Your Learning Journey Today</h2>
        <p className={styles.ctaDescription}>
          Sign up now and gain access to a world of knowledge at your fingertips.
        </p>
        <button className={styles.ctaButton}>Sign Up</button>
      </section>
    </div>
  );
};

export default HomePage;
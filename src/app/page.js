import styles from './page.module.css';

const HomePage = () => {
  const features = [
    {
      title: "Comprehensive Subjects",
      description: "Explore a wide range of subjects and courses tailored to your learning needs.",
      icon: "📚",
    },
    {
      title: "Seamless Material Management",
      description: "Easily upload, organize, and access your study materials in one centralized platform.",
      icon: "📁",
    },
    {
      title: "Interactive Learning",
      description: "Engage with interactive videos, quizzes, and assessments to enhance your learning experience.",
      icon: "🎓",
    },
    {
      title: "Personalized Learning Paths",
      description: "Customize your learning journey with courses and materials that suit your goals.",
      icon: "🛤️",
    },
    {
      title: "Collaborative Tools",
      description: "Work with peers and mentors using our built-in collaboration tools.",
      icon: "🤝",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with our detailed analytics and reporting features.",
      icon: "📊",
    }
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to EduHub</h1>
        <p className={styles.description}>
          A platform for seamless education material management and sharing.
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>

      <section id="features" className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <div className={styles.icon}>{feature.icon}</div>
            <h2 className={styles.featureTitle}>{feature.title}</h2>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </section>

      <section id="testimonials" className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonialCarousel}>
          {[
            {
              text: "EduHub has revolutionized the way I study. It's so convenient to have all my materials in one place!",
              author: "John Doe",
            },
            {
              text: "I love how interactive and engaging the learning experience is on EduHub. It makes studying fun!",
              author: "Jane Smith",
            },
            {
              text: "EduHub's personalized learning paths have helped me stay focused and achieve my goals.",
              author: "Michael Brown",
            },
            {
              text: "The collaborative tools make it easy to work with my classmates and mentors.",
              author: "Emily Davis",
            },
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className={styles.cta}>
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

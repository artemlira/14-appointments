import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.header}>
        <p className={styles.kicker}>About</p>
        <h1>Про додаток</h1>
        <p>
          Це навчальний медичний workspace для CRUD-операцій з пацієнтами.
          Архітектура вже підготовлена до розширення окремими модулями для лікарів
          та записів на прийом.
        </p>
      </section>

      <section className={styles.stack}>
        <article className={styles.infoBlock}>
          <h2>Frontend</h2>
          <p>React, React Router, Redux Toolkit Query та CSS Modules.</p>
        </article>
        <article className={styles.infoBlock}>
          <h2>Backend</h2>
          <p>Express API з JSON-сховищем для навчальної роботи з даними.</p>
        </article>
      </section>
    </div>
  )
}

export default AboutPage;

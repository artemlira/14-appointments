import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Clinic operations</p>
          <h1>Керування пацієнтами, лікарями та записами в одному місці</h1>
          <p className={styles.lead}>
            Робочий простір для щоденної роботи клініки: швидкий доступ до пацієнтів,
            майбутніх лікарів і записів на прийом.
          </p>
        </div>
        <div className={styles.summaryPanel}>
          <div>
            <span className={styles.metric}>01</span>
            <span className={styles.label}>Активний модуль</span>
          </div>
          <div>
            <span className={styles.metric}>03</span>
            <span className={styles.label}>Заплановані розділи</span>
          </div>
        </div>
      </section>

      <section className={styles.modules} aria-label="Модулі системи">
        <article className={styles.moduleCard}>
          <span className={styles.moduleIcon}>P</span>
          <h2>Пацієнти</h2>
          <p>Пошук, створення, редагування і видалення медичних карток.</p>
        </article>
        <article className={styles.moduleCard}>
          <span className={styles.moduleIcon}>D</span>
          <h2>Лікарі</h2>
          <p>Майбутній розділ для спеціалістів, графіків і контактів.</p>
        </article>
        <article className={styles.moduleCard}>
          <span className={styles.moduleIcon}>A</span>
          <h2>Записи</h2>
          <p>Основа для календаря прийомів, статусів і швидкого планування.</p>
        </article>
      </section>
    </div>
  )
}

export default HomePage;

import styles from './PageHeader.module.css';

function PageHeader({kicker, title, description, action}) {
  return (
    <section className={styles.header}>
      <div>
        {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
        <h1>{title}</h1>
        {description ? <p className={styles.subtitle}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  )
}

export default PageHeader;

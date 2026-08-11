import styles from './DetailsPanel.module.css';

function DetailsPanel({title, children}) {
  return (
    <section className={styles.panel}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  )
}

export function InfoGrid({children}) {
  return <div className={styles.grid}>{children}</div>
}

export function InfoItem({label, value, fullWidth = false}) {
  return (
    <div className={`${styles.item} ${fullWidth ? styles.fullWidth : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || 'Не вказано'}</span>
    </div>
  )
}

export default DetailsPanel;

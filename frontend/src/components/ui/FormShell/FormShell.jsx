import styles from './FormShell.module.css';

function FormShell({children, onSubmit, submitLabel, submitting}) {
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      {children}

      {submitLabel ? (
        <div className={styles.actions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={submitting}
          >
            {submitLabel}
          </button>
        </div>
      ) : null}
    </form>
  )
}

export function FormSection({title, children}) {
  return (
    <section className={styles.formSection}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function FormGrid({children}) {
  return <div className={styles.grid}>{children}</div>
}

export function Field({label, fullWidth = false, children}) {
  return (
    <label className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}

export default FormShell;

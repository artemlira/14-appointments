import styles from './DataTable.module.css';

function DataTable({title, count, columns, children, emptyMessage}) {
  const hasRows = Boolean(children);

  return (
    <section className={styles.tableShell}>
      <div className={styles.tableHeader}>
        <h2>{title}</h2>
        {count !== undefined ? <span>{count} записів</span> : null}
      </div>

      {hasRows ? (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      ) : (
        <div className={styles.empty}>{emptyMessage ?? 'Записів поки немає'}</div>
      )}
    </section>
  )
}

export default DataTable;

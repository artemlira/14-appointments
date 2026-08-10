import styles from './ListToolbar.module.css';

function ListToolbar({children}) {
  return <section className={styles.toolbar}>{children}</section>
}

export default ListToolbar;

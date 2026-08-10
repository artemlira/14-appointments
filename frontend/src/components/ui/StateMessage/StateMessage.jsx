import styles from './StateMessage.module.css';

function StateMessage({children}) {
  return <div className={styles.state}>{children}</div>
}

export default StateMessage;

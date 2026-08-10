import {Link} from "react-router";
import styles from './ActionButton.module.css';

function ActionButton({children, to, variant = 'primary', className = '', ...props}) {
  const buttonClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link
        className={buttonClassName}
        to={to}
        {...props}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={buttonClassName}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default ActionButton;

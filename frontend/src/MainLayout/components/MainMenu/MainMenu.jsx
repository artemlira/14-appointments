import styles from './MainMenu.module.css';
import {routes} from "@/router/router";
import {NavLink} from "react-router";

function MainMenu() {
  const routesList = routes[0].children;

  return (
    <nav className={styles.mainMenu}>
      <div className={styles.brand}>
        <span className={styles.logo}>M</span>
        <div>
          <span className={styles.name}>MedDesk</span>
          <span className={styles.caption}>Clinic workspace</span>
        </div>
      </div>
      <ul className={styles.list}>
        {
          routesList.map((route, index) => (
            <li
              key={index}
              className={styles.item}
            >
              <NavLink
                to={route.path}
                end={route.path === '/'}
                className={({isActive}) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >{route.meta.title}</NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default MainMenu;

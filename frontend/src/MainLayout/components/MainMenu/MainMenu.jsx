import styles from './MainMenu.module.css';
import {routes} from "@/router/router";
import {NavLink} from "react-router";

function MainMenu() {
  const routesList = routes[0].children;

  return (
    <nav className={styles.mainMenu}>
      <ul className={styles.list}>
        {
          routesList.map((route, index) => (
            <li
              key={index}
              className={styles.item}
            >
              <NavLink
                to={route.path}
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

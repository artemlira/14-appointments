import styles from './MainLayout.module.css';
import MainMenu from "@/MainLayout/components/MainMenu";
import {Outlet} from "react-router";

function MainLayout() {

  return (
    <div className={styles.mainLayout}>
      <MainMenu/>
      <main className={styles.content}>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout;

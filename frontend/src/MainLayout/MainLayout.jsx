import styles from './MainLayout.module.css';
import MainMenu from "@/MainLayout/components/MainMenu";
import {Outlet} from "react-router";

function MainLayout() {

  return (
    <div className={styles.mainLayout}>
      <MainMenu/>
      <Outlet/>
    </div>
  )
}

export default MainLayout;

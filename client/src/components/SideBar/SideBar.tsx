import { NavLink } from "react-router-dom";
import styles from "./sideBar.module.css";
import cl from "classnames";

interface LinkStates {
   isActive: boolean;
}

export const SideBar = () => {
   const getStyles = ({ isActive }: LinkStates) =>
      isActive ? cl(styles.link, styles.linkAactive) : styles.link;

   return (
      <section className={styles.sideBar}>
         <h2 className={styles.appTitle}>Оптимальный режим работы станции</h2>
         {/* <ul> */}
         <NavLink className={getStyles} to="/boilers">
            ХОП котельного цеха
         </NavLink>
         <NavLink className={getStyles} to="/turbines">
            ХОП турбинного цеха
         </NavLink>
         {/* </ul> */}
      </section>
   );
};

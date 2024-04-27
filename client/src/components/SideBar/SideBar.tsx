import { Link } from 'react-router-dom';
import styles from './sideBar.module.css';

export const SideBar = () => {
    return (
        <section className={styles.sideBar}>
            <h2 className={styles.appTitle}>Оптимальный режим работы станции</h2>
            {/* <ul> */}
            <Link className={styles.link} to="/boilers">ХОП котельного цеха</Link>
            <Link className={styles.link} to="/turbines">ХОП турбинного цеха</Link>
            {/* </ul> */}
        </section>
    );
};


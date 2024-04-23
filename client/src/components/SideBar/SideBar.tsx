import styles from './sideBar.module.css';

export const SideBar = () => {
    return (
        <section className={styles.sideBar}>
            <h2>Оптимальный режим работы станции</h2>
            <ul>
                <li>Оптимальное оборудование</li>
                <li>ХОП котла</li>
                <li>ХОП котельного цеха</li>
            </ul>
        </section>
    );
};


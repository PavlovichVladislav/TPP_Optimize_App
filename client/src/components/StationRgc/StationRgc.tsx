import styles from "./stationRgc.module.css";

export const StationRgc = () => {
   return (
      <div>
         <div className="layout">
            <h2 className={styles.title}>Расчёт ХОП станции</h2>
            <div className={styles.subtitle}>
               Предварительно должны быть посчитаны ХОП котельного и турбинного цехов
            </div>
         </div>
      </div>
   );
};

import { Button } from "@skbkontur/react-ui";
import { useAppSelector } from "../../hooks/redux";
import styles from "./stationRgc.module.css";

export const StationRgc = () => {
   const { summerRgc, winterRgc, offSeaasonRgc } = useAppSelector((state) => state.turbineReducer);
   const { boilerShopRgc } = useAppSelector((state) => state.boilerReducer);

   // Флаг, который сообщает о том, что посчитаны ХОП котельного и турбинного цехов
   // Т.е. можно считать хоп станции
   const enoughData = Boolean(summerRgc && winterRgc && offSeaasonRgc && boilerShopRgc);

   const onCalcStationRGC = () => {
      console.log('calc');
   }

   return (
      <div>
         <div className="layout">
            <h2 className={styles.title}>Расчёт ХОП станции</h2>
            <div className={styles.subtitle}>
               Предварительно должны быть посчитаны ХОП котельного и турбинного цехов
               <br/>
               {enoughData ? "данных хватает" : "Не хватает данных"}
            </div>
            <div className={styles.footerWrapper}>
               <Button use="primary" size="medium" onClick={onCalcStationRGC} disabled={!enoughData}>
                  Рассчитать
               </Button>
            </div>
         </div>
      </div>
   );
};

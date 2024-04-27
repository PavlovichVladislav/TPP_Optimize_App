import { FC } from "react";

import { BoilerIcon } from "./BoilerIcon";
import styles from "./boilerCard.module.css";
import { Boiler } from "../../types/types";
import { Button } from "@skbkontur/react-ui";

interface Props {
   boiler: Boiler;
   selected?: boolean;
   onAddBoiler?: (number: number) => void;
   onDeleteBoiler?: (number: number) => void;
}

export const BoilerCard: FC<Props> = ({ boiler, selected, onAddBoiler, onDeleteBoiler }) => {
   const { station_number, heat_performance, mark, starts_number } = boiler;

   const renderSelectBtn = () => {
      if (onDeleteBoiler && onAddBoiler) {
         return selected ? (
            <Button use="primary" size="medium" onClick={() => onDeleteBoiler(station_number)}>
               Удалить
            </Button>
         ) : (
            <Button use="primary" size="medium" onClick={() => onAddBoiler(station_number)}>
               Добавить
            </Button>
         );
      }

      return null;
   };

   return (
      <div className={styles.cardWrapper}>
         <div className={styles.cardDescr}>
            <BoilerIcon />
            <div>
               <h3 className={styles.cardTitle}>Котёл. Станционный номер:{station_number}</h3>
               <div className={styles.charWrapper}>
                  Марка котла: <span className={styles.charValue}>{mark}</span>
               </div>
               <div className={styles.charWrapper}>
                  Номинальная макисмальная производительность:{" "}
                  <span className={styles.charValue}>{heat_performance} т/ч</span>
               </div>
               <div className={styles.charWrapper}>
                  Число запусков с начала эксплуатации{" "}
                  <span className={styles.charValue}>{starts_number}</span>
               </div>
            </div>
         </div>
         <div className={styles.cardFooter}>
            {renderSelectBtn()}
         </div>
      </div>
   );
};

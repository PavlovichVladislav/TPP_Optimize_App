import { FC } from "react";
import { Boiler } from "../OptimalEquipment/OptimalEquipment";
import { BoilerIcon } from "./BoilerIcon";
import styles from "./boilerCard.module.css";

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
         return (
            selected ? (
               <button onClick={() => onDeleteBoiler(station_number)}>Удалить</button>
            ) : (
               <button onClick={() => onAddBoiler(station_number)}>Добавить</button>
            )
         )
      }

      return null;
   }
 
   return (
      <div className={styles.cardWrapper}>
         <BoilerIcon />
         <div>
            <div className={styles.cardHeader}>
               <h3>Котёл. Станционный номер:{station_number}</h3>
               {renderSelectBtn()}
            </div>
            <div>Марка котла: {mark}</div>
            <div>Номинальная макисмальная производительность: {heat_performance} т/ч</div>
            <div>Число запусков с начала эксплуатации {starts_number}</div>
         </div>
      </div>
   );
};

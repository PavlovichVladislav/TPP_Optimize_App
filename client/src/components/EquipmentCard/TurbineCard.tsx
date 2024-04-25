import { FC } from "react";
import { Turbine } from "../OptimalEquipment/OptimalEquipment";
import { BoilerIcon } from "./BoilerIcon";
import styles from "./boilerCard.module.css";

interface Props {
   selected?: boolean;
   turbine: Turbine;
   onAddTurbine?: (number: number) => void;
   onDeleteTurbine?: (number: number) => void;
}

export const TurbineCard: FC<Props> = ({ turbine, selected, onAddTurbine, onDeleteTurbine }) => {
   const { station_number, mark, electricity_power, power_generation, thermal_power } = turbine;

   const renderSelectBtn = () => {
      if (onAddTurbine && onDeleteTurbine) {
         return selected ? (
            <button onClick={() => onDeleteTurbine(station_number)}>Удалить</button>
         ) : (
            <button onClick={() => onAddTurbine(station_number)}>Добавить</button>
         );
      }

      return null;
   };

   return (
      <div className={styles.cardWrapper}>
         <BoilerIcon />
         <div>
            <div className={styles.cardHeader}>
               <h3>Турбина. Станционный номер: ТГ{station_number}</h3>
               {renderSelectBtn()}
            </div>
            <div>Марка турбины: {mark}</div>
            <div>Установленная электрическая мощность: {electricity_power} т/ч</div>
            <div>Тепловая мощность, Гкал/ час {power_generation}</div>
            <div>Выработка электроэнергии в отчетном году кВтч {thermal_power}</div>
         </div>
      </div>
   );
};

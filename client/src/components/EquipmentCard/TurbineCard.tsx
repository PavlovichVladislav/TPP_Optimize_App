import { FC } from "react";
import styles from "./boilerCard.module.css";
import { Button } from "@skbkontur/react-ui";
import { TurbineIcon } from "../TurbineShopRgc/TurbineIcon";
import { FuelConsumptionTable } from "../FuelConsumptionTable/FuelConsumptionTable";
import { SteamConsumption } from "../../types/types";
import { ITurbine } from "../../types/redux";

interface Props {
   selected?: boolean;
   turbine: ITurbine;
   onAddTurbine?: (number: number) => void;
   onDeleteTurbine?: (number: number) => void;
   onSubmit?: (station_number: number, steamConsumption: SteamConsumption) => void;
}

export const TurbineCard: FC<Props> = ({
   turbine,
   selected,
   onAddTurbine,
   onDeleteTurbine,
   onSubmit,
}) => {
   const { station_number, mark, electricity_power, power_generation, thermal_power } = turbine;

   const renderSelectBtn = () => {
      if (onAddTurbine && onDeleteTurbine) {
         return selected ? (
            <Button use="primary" size="medium" onClick={() => onDeleteTurbine(station_number)}>
               Удалить
            </Button>
         ) : (
            <Button use="primary" size="medium" onClick={() => onAddTurbine(station_number)}>
               Добавить
            </Button>
         );
      }

      return null;
   };

   return (
      <div className={styles.cardWrapper}>
         <div className={styles.cardDescr}>
            <TurbineIcon />
            <div>
               <h3 className={styles.cardTitle}>Турбина. Станционный номер: ТГ{station_number}</h3>
               <div className={styles.charWrapper}>
                  Марка турбины: <span className={styles.charValue}>{mark}</span>
               </div>
               <div className={styles.charWrapper}>
                  Установленная электрическая мощность:{" "}
                  <span className={styles.charValue}>{electricity_power} т/ч</span>
               </div>
               <div className={styles.charWrapper}>
                  Тепловая мощность, Гкал/ час{" "}
                  <span className={styles.charValue}>{power_generation}</span>
               </div>
               <div className={styles.charWrapper}>
                  Выработка электроэнергии в отчетном году кВтч{" "}
                  <span className={styles.charValue}>{thermal_power}</span>
               </div>
            </div>
         </div>
         <div className={styles.cardFooter}>{renderSelectBtn()}</div>
         {selected && onSubmit && (
            <FuelConsumptionTable
               onSubmit={(values: number[]) => {
                  onSubmit(station_number, {turbine_mark: mark, steam_consumption: values});
               }}
            />
         )}
      </div>
   );
};

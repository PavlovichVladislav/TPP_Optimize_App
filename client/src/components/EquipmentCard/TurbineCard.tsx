import { FC } from "react";
import styles from "./boilerCard.module.css";
import { Button } from "@skbkontur/react-ui";
import { TurbineIcon } from "../TurbineShopRgc/TurbineIcon";
import { InputTable } from "../InputTable/InputTable";
import { SteamConsumption } from "../../types/types";
import { ITurbine } from "../../types/redux";

interface Props {
   selected?: boolean;
   turbine: ITurbine;
   onAddTurbine?: (number: number) => void;
   onDeleteTurbine?: (number: number) => void;
   onSubmit?: (station_number: number, steamConsumption: SteamConsumption) => void;
}

const mockData = {
   '3': [28.3, 35.7, 27, 25.2, 15.1, 10.6, 23.7, 17.2, 27.8, 29, 35.6, 36.6],
   '4': [35.3, 25.9, 35.3, 35.3, 21.6, 13.9, 25.2, 22.3, 22.7, 38.5, 33.2, 38.5],
   '5': [38.9, 30.1, 35.2, 0, 0, 0, 0, 15.6, 15.3, 40.3, 42.7, 41.3],
   '6': [70.2, 47.6, 63.1, 53.1, 0, 0, 0, 0, 0, 20.2, 51.3, 51.0],
   '7': [63.7, 54.7, 78, 48.2, 0, 0, 0, 31, 26.1, 56.8, 62.3, 61.8],
   '8': [95.4, 80.9, 82.5, 76.5, 43.6, 22.4, 33, 31.5, 33.1, 68.6, 65.5, 55.3],
   '9': [91.1, 76.2, 81.8, 71.6, 29.4, 0, 0, 0, 0, 0, 67, 70.3],
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
            <InputTable
               value={mockData[station_number]}
               onSubmit={(values: number[]) => {
                  onSubmit(station_number, {turbine_mark: mark, steam_consumption: values});
               }}
            />
         )}
      </div>
   );
};

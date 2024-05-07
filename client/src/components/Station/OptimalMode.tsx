import { Button, Input } from "@skbkontur/react-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./OptimalMode.module.css";
import { InputTable } from "../InputTable/InputTable";
import { setFuelPrice } from "../../store/reducers/StationSlice";
import { useState } from "react";

const OptimalMode = () => {
   const { offSeasonStationRgc, summerStationRgc, winterStationRgc, fuelPrice } = useAppSelector(
      (state) => state.stationReducer
   );
   const [demandDataLen, setDemandDataLen] = useState<number>(0);

   const dispatch = useAppDispatch();
   const enoughData = offSeasonStationRgc && summerStationRgc && winterStationRgc;

   const calcStationOptimalMode = () => {
      console.log("calc");
   };

   const onInputFuelPrice = (values: number[]) => {
      dispatch(setFuelPrice(values));
   };

   const onInputDemand = (values) => {
    console.log(values);
   }

   const renderDemandTable = () => {
    if (demandDataLen && demandDataLen > 1) {
        return <div>табличка для спроса</div>
    }
   }

   return (
      <div className="layout">
         <h2 className={styles.title}>Расчёт оптимального режима работы станции </h2>
         <div className={styles.subtitle}>
            Предварительно должен быть посчитан ХОП станции
            <br />
            {enoughData ? "данных хватает" : "Не хватает данных"}
         </div>
         <div className={styles.footerWrapper}>
            <Button
               use="primary"
               size="medium"
               onClick={calcStationOptimalMode}
               disabled={!enoughData}
            >
               Рассчитать
            </Button>
         </div>
         <InputTable onSubmit={onInputFuelPrice} />
         <Input
            type="number"
            placeholder="Укажите кол-во данных спроса"
            value={String(demandDataLen)}
            onValueChange={(value) => {
                console.log(value);
                setDemandDataLen(value);
            }}
         />
         <Button
            use="primary"
            size="medium"
            onClick={calcStationOptimalMode}
            disabled={!demandDataLen}
         >
            Подтвердить количество
         </Button>
         {renderDemandTable()}
      </div>
   );
};

export default OptimalMode;

import { Button, Input } from "@skbkontur/react-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./OptimalMode.module.css";
import { InputTable } from "../InputTable/InputTable";
import {
   setDemand,
   setFuelPrice,
   setSummerOptimalMode,
   setWinterOptimalMode,
   setOffSeasonOptimalMode,
} from "../../store/reducers/StationSlice";
import { useState } from "react";
import { DemandInputTable } from "../DemandInputTable/DemandInputTable";
import OptimizeApi from "../../Api/OptimizeApi";
import ResultTable from "../ResultTable/ResulTable";

const OptimalMode = () => {
   const {
      offSeasonStationRgc,
      summerStationRgc,
      winterStationRgc,
      fuelPrice,
      demand,
      summerOptimalMode,
      winterOptimalMode,
      offSeasonOptimalMode,
   } = useAppSelector((state) => state.stationReducer);
   const [demandDataLen, setDemandDataLen] = useState<number>(0);
   const optimizeApi = new OptimizeApi();
   const dispatch = useAppDispatch();
   const enoughData = offSeasonStationRgc && summerStationRgc && winterStationRgc;

   const enoughSummerData = demand && summerStationRgc;
   const enoughWinterData = demand && winterStationRgc;
   const enoughOffSeasonData = demand && offSeasonStationRgc;

   const onCalcStationOptimalMode = async () => {
      if (enoughSummerData) {
         const summerOptimalMode = await optimizeApi.calcStationOptimalMode({
            demand,
            fuelPrice,
            stationRGC: summerStationRgc,
            season: "summer",
         });

         const { up_percent, zero_percent } = summerOptimalMode;

         dispatch(
            setSummerOptimalMode({
               up_percent,
               zero_percent,
            })
         );
      }

      if (enoughWinterData) {
         const winterOptimalMode = await optimizeApi.calcStationOptimalMode({
            demand,
            fuelPrice,
            stationRGC: winterStationRgc,
            season: "winter",
         });

         const { up_percent, zero_percent } = winterOptimalMode;

         dispatch(
            setWinterOptimalMode({
               up_percent,
               zero_percent,
            })
         );
      }

      if (enoughOffSeasonData) {
         const offSeasonOptimalMode = await optimizeApi.calcStationOptimalMode({
            demand,
            fuelPrice,
            stationRGC: offSeasonStationRgc,
            season: "offSeason",
         });

         const { up_percent, zero_percent } = offSeasonOptimalMode;

         dispatch(
            setOffSeasonOptimalMode({
               up_percent,
               zero_percent,
            })
         );
      }
   };

   const onInputFuelPrice = (values: number[]) => {
      // dispatch(setFuelPrice(values));
      dispatch(
         setFuelPrice([
            314.66, 290.3, 346.13, 327.89, 306.26, 335.53, 409.96, 346.85, 371.01, 366.85, 427.21,
            536,
         ])
      );
   };

   const onInputDemandTable = (pg: number[], price: number[]) => {
      dispatch(setDemand({ pg, price }));

      dispatch(
         setDemand({
            pg: [14000, 17000, 20000, 22000, 24000, 27000],
            price: [1153.823537, 1058.174361, 967.885009, 910.6697875, 855.837, 778.053614],
         })
      );
   };

   const renderDemandTable = () => {
      if (demandDataLen && demandDataLen > 1) {
         return <DemandInputTable size={demandDataLen} onSubmit={onInputDemandTable} />;
      }
   };

   const renderResultTables = () => {
      return (
         <>
            {summerOptimalMode && (
               <>
                  <h3 className={styles.mt4}>Лето </h3>
                  <ResultTable
                     column1={summerOptimalMode?.zero_percent}
                     column2={summerOptimalMode?.up_percent}
                  />
               </>
            )}
            {winterOptimalMode && (
               <>
                  <h3 className={styles.mt4}>Зима </h3>
                  <ResultTable
                     column1={winterOptimalMode?.zero_percent}
                     column2={winterOptimalMode?.up_percent}
                  />
               </>
            )}
            {offSeasonOptimalMode && (
               <>
                  <h3 className={styles.mt4}>Осень </h3>
                  <ResultTable
                     column1={offSeasonOptimalMode?.zero_percent}
                     column2={offSeasonOptimalMode?.up_percent}
                  />
               </>
            )}
         </>
      );
   };

   return (
      <div className="layout">
         <h2 className={styles.title}>
            Расчёт оптимального режима <br /> работы станции{" "}
         </h2>
         <div className={styles.subtitle}>
            Предварительно должен быть посчитан ХОП станции
            <br />
         </div>
         <div className={styles.footerWrapper}>
            <Button
               use="primary"
               size="medium"
               onClick={onCalcStationOptimalMode}
               disabled={!enoughData}
               className={styles.btn}
            >
               {enoughData ? "Рассчитать" : "Не хватает данных"}
            </Button>
         </div>
         <h3 className={styles.priceTitle}>Цена топлива</h3>
         <InputTable
            value={[
               314.66, 290.3, 346.13, 327.89, 306.26, 335.53, 409.96, 346.85, 371.01, 366.85,
               427.21, 536,
            ]}
            onSubmit={onInputFuelPrice}
         />
         <h3 className={styles.priceTitle}>Укажите кол-во данных спроса</h3>
         <Input
            className={styles.mt4}
            type="number"
            value={String(demandDataLen)}
            onValueChange={(value) => {
               console.log(value);
               setDemandDataLen(+value);
            }}
         />
         {renderDemandTable()}
         {renderResultTables()}
      </div>
   );
};

export default OptimalMode;

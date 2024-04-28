import { useEffect, useState } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { Button } from "@skbkontur/react-ui";
import { TurbineCard } from "../EquipmentCard/TurbineCard";
import { SteamConsumption } from "../../types/types";
import { Table } from "../Table/Table";

export interface Turbine {
   station_number: number;
   mark: string;
   electricity_power: number;
   thermal_power: number;
   power_generation: number;
}

export interface EquipmentInvenotry {
   boilerNumbers: number[];
   turbines: number[];
}

export interface OptimalTurbinesInventory {
   offSeasonTurbines: Turbine[];
   summerTurbines: Turbine[];
   winterTurbines: Turbine[];
}

export interface TurbineShopRgc {
   flow_char: {
      x: number[]
      y: number[]
   },
   turbines_shop_hop: {
      x: number[]
      y: number[]
   }
}

export const TurbineShopRgc = () => {
   const [turbines, setTurbines] = useState<Turbine[]>([]);
   const [turbineNumbers, setTurbineNumbers] = useState<number[]>([]);
   const [optimalTurbines, setOptimalTurbines] = useState<OptimalTurbinesInventory | undefined>(
      undefined
   );
   const optimizeApi = new OptimizeApi();
   const [steamConsumptions, setSteamConsumptions] = useState<SteamConsumption[]>([]);

   const [summerRgc, setSummerRgc] = useState<TurbineShopRgc | undefined>();

   const getTurbines = async () => {
      const { turbines } = await optimizeApi.getTurbines();

      setTurbines(turbines);
   };

   useEffect(() => {
      getTurbines();
   }, []);

   const addTurbine = (number: number) => {
      console.log(number);
      console.log("add");

      setTurbineNumbers([...turbineNumbers, number]);
   };

   const deleteTurbine = (number: number) => {
      setTurbineNumbers(turbineNumbers.filter((turbineNumber) => turbineNumber !== number));
   };

   const onCalcEquipment = async () => {
      const { optimalTurbines } = await optimizeApi.calcOptimaTurbines(turbineNumbers);

      setOptimalTurbines(optimalTurbines);
   };

   const onCalcTurbineShopRgc = async () => {
      if (optimalTurbines) {
         const summerTurbinesData: SteamConsumption[] = optimalTurbines.summerTurbines.map(
            (turbine) => steamConsumptions[turbine.station_number]
         );

         const winterTurbinesData: SteamConsumption[] = optimalTurbines.winterTurbines.map(
            (turbine) => steamConsumptions[turbine.station_number]
         );

         const offSeasonTurbinesData: SteamConsumption[] = optimalTurbines.offSeasonTurbines.map(
            (turbine) => steamConsumptions[turbine.station_number]
         );
   
         const { turbineShopRgc } = await optimizeApi.calcTurbinesShopRGC({
            season: "summer",
            turbinesData: summerTurbinesData
         });

         const winterShopRgc = await optimizeApi.calcTurbinesShopRGC({
            season: "winter",
            turbinesData: winterTurbinesData
         });

         const offSeasonShopRgc = await optimizeApi.calcTurbinesShopRGC({
            season: "offSeason",
            turbinesData: offSeasonTurbinesData
         });
   
         console.log(turbineShopRgc);
         console.log(winterShopRgc);
         console.log(offSeasonShopRgc);

         setSummerRgc(turbineShopRgc)
      }
   };

   const renderContent = () => {
        if (summerRgc) {
           return (
              <>
                 <Table
                    firstRow={summerRgc.flow_char.x}
                    secondRow={summerRgc.flow_char.y}
                    title="Лето. Расходная характеристика"
                 />
                  <Table
                    firstRow={summerRgc.turbines_shop_hop.x}
                    secondRow={summerRgc.turbines_shop_hop.y}
                    title="Лето. ХОП турбинного цеха"
                 />
                 {/*
                 <Graph
                    xData={boilerShopRgc.summerBoilerShopRGC.Q}
                    yData={boilerShopRgc.summerBoilerShopRGC.b}
                    graphTitle="Хоп"
                    xAxisLabel="Q"
                    yAxisLabel="b"
                 /> */}
              </>
           );
        }

      if (optimalTurbines) {
         return (
            <>
               {optimalTurbines?.summerTurbines && (
                  <div>
                     <h2>Лето </h2>
                     <div>
                        {optimalTurbines?.summerTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </div>
               )}
               {optimalTurbines?.offSeasonTurbines && (
                  <div>
                     <h2>Межсезонье </h2>
                     <div>
                        {optimalTurbines?.offSeasonTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </div>
               )}
               {optimalTurbines?.winterTurbines && (
                  <div>
                     <h2>Зима </h2>
                     <div>
                        {optimalTurbines?.winterTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </div>
               )}
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={onCalcTurbineShopRgc}>
                     Рассчитать ХОП
                  </Button>
               </div>
            </>
         );
      }

      const onSubmit = (station_number: number, steamConsumption: SteamConsumption) => {
         const transformedConsumptions: SteamConsumption[] = steamConsumptions;
         transformedConsumptions[station_number] = steamConsumption;

         setSteamConsumptions(transformedConsumptions);
      };

      console.log(steamConsumptions);

      return (
         <>
            <div className={styles.equipmentWrapper}>
               <div>
                  {turbines.map((turbine) => (
                     <TurbineCard
                        key={turbine.station_number}
                        selected={turbineNumbers.includes(turbine.station_number)}
                        turbine={turbine}
                        onAddTurbine={addTurbine}
                        onDeleteTurbine={deleteTurbine}
                        onSubmit={onSubmit}
                     />
                  ))}
               </div>
            </div>
            <div className={styles.footerWrapper}>
               <Button use="primary" size="medium" onClick={onCalcEquipment}>
                  Рассчитать
               </Button>
            </div>
         </>
      );
   };

   return (
      <section className={styles.optimalEquipment}>
         <div className="layout">
            <h2 className={styles.title}>Оптимальный состав оборудования</h2>
            <div className={styles.subtitle}>
               Выберите оборудование, которое есть у вас в наличии
            </div>
         </div>
         {renderContent()}
      </section>
   );
};


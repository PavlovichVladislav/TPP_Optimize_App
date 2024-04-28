import { useEffect, useState } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { BoilerCard } from "../EquipmentCard/BoilerCard";
import { Table } from "../Table/Table";
import { Boiler, OptimalBoilersInventory } from "../../types/types";
import { Button } from "@skbkontur/react-ui";

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

export interface BoilerRgc {
   Q: number[];
   b: number[];
}

export interface BoilerShopRgc {
   offSeasonBoilerShopRGC: BoilerRgc;
   summerBoilerShopRGC: BoilerRgc;
   winterBoilerShopRGC: BoilerRgc;
}

export const BoilerShopRgc = () => {
   // to:do в redux
   const [boilers, setBoilers] = useState<Boiler[]>([]);
   const optimizeApi = new OptimizeApi();
   // to:do в redux
   const [boilerNumbers, setBoilerNumbers] = useState<number[]>([]);
   // to:do в redux
   const [optimalBoilers, setOptimalBoilers] = useState<OptimalBoilersInventory | undefined>(
      undefined
   );
   const [boilerShopRgc, setBoilerShopRgc] = useState<BoilerShopRgc | undefined>(undefined);

   const getEquipment = async () => {
      const { boilers } = await optimizeApi.getBoilers();

      setBoilers(boilers);
      // setTurbines(turbines);
   };

   useEffect(() => {
      getEquipment();
   }, []);

   const addBoiler = (number: number) => {
      setBoilerNumbers([...boilerNumbers, number]);
   };

   const deleteBoiler = (number: number) => {
      setBoilerNumbers(boilerNumbers.filter((boilerNumber) => boilerNumber !== number));
   };

   const onCalcEquipment = async () => {
      const { optimalBoilers } = await optimizeApi.calcOptimaBoilers(boilerNumbers);

      setOptimalBoilers(optimalBoilers);
   };

   const calcBoilerShopRGC = async () => {
      const { boilerShopRgc } = await optimizeApi.calcBoilerShopRGC(optimalBoilers!);

      setBoilerShopRgc(boilerShopRgc);
   };

   const renderContent = () => {
      if (boilerShopRgc) {
         return (
            <>
               <Table
                  title="ХОП лето"
                  firstRow={boilerShopRgc.summerBoilerShopRGC.b}
                  secondRow={boilerShopRgc.summerBoilerShopRGC.Q}
               />
               {/* 
               <Graph 
                  xData={boilerShopRgc.summerBoilerShopRGC.Q}
                  yData={boilerShopRgc.summerBoilerShopRGC.b}
                  graphTitle="Хоп"
                  xAxisLabel="Q"
                  yAxisLabel="b"
               /> */}

               <Table
                  title="ХОП зима"
                  firstRow={boilerShopRgc.winterBoilerShopRGC.b}
                  secondRow={boilerShopRgc.winterBoilerShopRGC.Q}
               />
               <Table
                  title="ХОП межсезонье"
                  firstRow={boilerShopRgc.offSeasonBoilerShopRGC.b}
                  secondRow={boilerShopRgc.offSeasonBoilerShopRGC.Q}
               />
            </>
         );
      }

      if (optimalBoilers) {
         return (
            <>
               <>
                  {optimalBoilers?.summerBoilers && (
                     <div>
                        <h2>Лето </h2>
                        <div>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
                  {optimalBoilers?.offSeasonBoilers && (
                     <div>
                        <h2>Межсезонье </h2>
                        <div>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
                  {optimalBoilers?.offSeasonBoilers && (
                     <div>
                        <h2>Зима </h2>
                        <div>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
               </>
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={calcBoilerShopRGC}>
                     Рассчитать ХОП
                  </Button>
               </div>
            </>
         );
      }

      return (
         <>
            <div className={styles.equipmentWrapper}>
               <div>
                  {boilers.map((boiler) => (
                     <BoilerCard
                        key={boiler.station_number}
                        selected={boilerNumbers.includes(boiler.station_number)}
                        boiler={boiler}
                        onAddBoiler={addBoiler}
                        onDeleteBoiler={deleteBoiler}
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
         <div className={styles.headerWrapper}>
            <h2 className={styles.title}>Оптимальный состав оборудования</h2>
            <div className={styles.subtitle}>
               Выберите оборудование, которое есть у вас в наличии
            </div>
         </div>
         {renderContent()}
      </section>
   );
};

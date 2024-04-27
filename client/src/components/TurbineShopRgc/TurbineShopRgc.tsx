import { useEffect, useState } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { Button } from "@skbkontur/react-ui";
import { TurbineCard } from "../EquipmentCard/TurbineCard";

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

export const TurbineShopRgc = () => {
   const [turbines, setTurbines] = useState<Turbine[]>([]);
   const [turbineNumbers, seTurbineNumbers] = useState<number[]>([]);
   const [optimalTurbines, setOptimalTurbines] = useState<OptimalTurbinesInventory | undefined>(
      undefined
   );
   const optimizeApi = new OptimizeApi();
   
   const getTurbines = async () => {
      const { turbines } = await optimizeApi.getTurbines();

      setTurbines(turbines);
   };

   useEffect(() => {
      getTurbines();
   }, []);

   const addTurbine = (number: number) => {
      seTurbineNumbers([...turbineNumbers, number]);
   };

   const deleteTurbine = (number: number) => {
      seTurbineNumbers(turbineNumbers.filter((turbineNumber) => turbineNumber !== number));
   };

   const onCalcEquipment = async () => {
      const { optimalTurbines } = await optimizeApi.calcOptimaTurbines(turbineNumbers);

      setOptimalTurbines(optimalTurbines);
   };

   const onCalcTurbineShopRgc = async () => {
    console.log('optimal');
   }

   const renderContent = () => {
    //   if (boilerShopRgc) {
    //      return (
    //         <>
    //            <Table
    //               firstRow={boilerShopRgc.summerBoilerShopRGC.b}
    //               secondRow={boilerShopRgc.summerBoilerShopRGC.Q}
    //            />
    //            {/* 
    //            <Graph 
    //               xData={boilerShopRgc.summerBoilerShopRGC.Q}
    //               yData={boilerShopRgc.summerBoilerShopRGC.b}
    //               graphTitle="Хоп"
    //               xAxisLabel="Q"
    //               yAxisLabel="b"
    //            /> */}

    //            <Table
    //               firstRow={boilerShopRgc.winterBoilerShopRGC.b}
    //               secondRow={boilerShopRgc.winterBoilerShopRGC.Q}
    //            />
    //            <Table
    //               firstRow={boilerShopRgc.offSeasonBoilerShopRGC.b}
    //               secondRow={boilerShopRgc.offSeasonBoilerShopRGC.Q}
    //            />
    //         </>
    //      );
    //   }

      if (optimalTurbines) {
         return (
            <>
                  <div className={styles.equipmentWrapper}>
                     {optimalTurbines?.summerTurbines && (
                        <div>
                           <h2>Лето </h2>
                           {optimalTurbines?.summerTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                     {optimalTurbines?.offSeasonTurbines && (
                        <div>
                           <h2>Межсезонье </h2>
                           {optimalTurbines?.offSeasonTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                     {optimalTurbines?.winterTurbines && (
                        <div>
                           <h2>Зима </h2>
                           {optimalTurbines?.winterTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                  </div>
               <Button use="primary" size="medium" onClick={onCalcTurbineShopRgc}>Рассчитать ХОП</Button>
            </>
         );
      }

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
                     />
                  ))}
               </div>
            </div>
            <Button use="primary" size="medium" onClick={onCalcEquipment}>Рассчитать</Button>
         </>
      );
   };

   return (
      <section className={styles.optimalEquipment}>
         <h2>Оптимальный состав оборудования</h2>
         <div>Выберите оборудование, которое есть у вас в наличии</div>
         {renderContent()}
      </section>
   );
};


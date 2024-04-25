import { useEffect, useState } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { BoilerCard } from "../EquipmentCard/BoilerCard";
import { TurbineCard } from "../EquipmentCard/TurbineCard";

export interface Boiler {
   station_number: number;
   mark: string;
   heat_performance: number;
   starts_number: number;
}

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

export interface OptimalBoilersInventory {
   offSeasonBoilers: Boiler[];
   summerBoilers: Boiler[];
   winterBoilers: Boiler[];
}

export interface OptimalTurbinesInventory {
   offSeasonTurbines: Turbine[];
   summerTurbines: Turbine[];
   winterTurbines: Turbine[];
}

export const OptimalEquipment = () => {
   const [boilers, setBoilers] = useState<Boiler[]>([]);
   const [turbines, setTurbines] = useState<Turbine[]>([]);
   const optimizeApi = new OptimizeApi();

   const [boilerNumbers, setBoilerNumbers] = useState<number[]>([]);
   const [turbineNumbers, seTurbineNumbers] = useState<number[]>([]);

   const [optimalBoilers, setOptimalBoilers] = useState<OptimalBoilersInventory | undefined>(
      undefined
   );
   const [optimalTurbines, setOptimalTurbines] = useState<OptimalTurbinesInventory | undefined>(
      undefined
   );

   const getEquipment = async () => {
      const { boilers, turbines } = await optimizeApi.getEquipment();

      setBoilers(boilers);
      setTurbines(turbines);
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

   const addTurbine = (number: number) => {
      seTurbineNumbers([...turbineNumbers, number]);
   };

   const deleteTurbine = (number: number) => {
      seTurbineNumbers(turbineNumbers.filter((turbineNumber) => turbineNumber !== number));
   };

   const onCalcEquipment = async () => {
      const { optimalBoilers, optimalTurbines } = await optimizeApi.calcOptimalEquipment(
         boilerNumbers,
         turbineNumbers
      );

      setOptimalBoilers(optimalBoilers);
      setOptimalTurbines(optimalTurbines);
   };

   const renderContent = () => {
      if (optimalBoilers || optimalTurbines) {
         return (
            <>
               {optimalBoilers && (
                  <div className={styles.equipmentWrapper}>
                     {optimalBoilers?.summerBoilers && (
                        <div>
                           <h2>Лето </h2>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     )}
                     {optimalBoilers?.offSeasonBoilers && (
                        <div>
                           <h2>Межсезонье </h2>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     )}
                     {optimalBoilers?.offSeasonBoilers && (
                        <div>
                           <h2>Зима </h2>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     )}
                  </div>
               )}
               {optimalTurbines && (
                  <div className={styles.equipmentWrapper}>
                     {optimalTurbines?.summerTurbines && (
                        <div>
                           <h2>Лето </h2>
                           {optimalTurbines?.summerTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                     {optimalBoilers?.offSeasonBoilers && (
                        <div>
                           <h2>Межсезонье </h2>
                           {optimalTurbines?.offSeasonTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                     {optimalBoilers?.offSeasonBoilers && (
                        <div>
                           <h2>Зима </h2>
                           {optimalTurbines?.winterTurbines.map((turbine) => (
                              <TurbineCard key={turbine.station_number} turbine={turbine} />
                           ))}
                        </div>
                     )}
                  </div>
               )}
            </>
         );
      }

      return (
         <>
            <div>Выберите оборудование, которое есть у вас в наличии</div>
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
            <button onClick={onCalcEquipment}>Рассчитать</button>
         </>
      );
   };

   return (
      <section className={styles.optimalEquipment}>
         <h2>Оптимальный состав оборудования</h2>
         {renderContent()}
      </section>
   );
};

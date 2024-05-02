import { useEffect } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { BoilerCard } from "../EquipmentCard/BoilerCard";
import { Table } from "../Table/Table";
import { Button } from "@skbkontur/react-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
   addInventoryBoiler,
   deleteInventoryBoiler,
   setBoilerShopRgc,
   setBoilers,
   setOptimalBoilersInventory,
} from "../../store/reducers/BoilersSlice";

export const BoilerShopRgc = () => {
   const { boilers, inventoryBoilerNumbers, optimalBoilers, boilerShopRgc } = useAppSelector(
      (state) => state.boilerReducer
   );
   const dispatch = useAppDispatch();
   const optimizeApi = new OptimizeApi();

   // Получаем список оборудования
   const getEquipment = async () => {
      const { boilers } = await optimizeApi.getBoilers();

      dispatch(setBoilers(boilers));
   };

   // Получаем список оборудования при первой отрисовке компонента
   useEffect(() => {
      getEquipment();
   }, []);

   const addBoiler = (number: number) => {
      dispatch(addInventoryBoiler(number));
   };

   const deleteBoiler = (number: number) => {
      dispatch(deleteInventoryBoiler(number));
   };

   const onCalcEquipment = async () => {
      const optimalBoilers = await optimizeApi.calcOptimaBoilers(inventoryBoilerNumbers);

      dispatch(setOptimalBoilersInventory(optimalBoilers));
   };

   const calcBoilerShopRGC = async () => {
      const { boilerShopRgc } = await optimizeApi.calcBoilerShopRGC(optimalBoilers!);

      dispatch(setBoilerShopRgc(boilerShopRgc));
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
                        selected={inventoryBoilerNumbers.includes(boiler.station_number)}
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

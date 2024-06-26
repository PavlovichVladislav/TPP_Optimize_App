import { useEffect } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { BoilerCard } from "../EquipmentCard/BoilerCard";
import { Table } from "../Table/Table";
import { Button, Gapped } from "@skbkontur/react-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
   addInventoryBoiler,
   clearOptimalBoilersInventory,
   deleteInventoryBoiler,
   setBoilerShopRgc,
   clearShopRgc,
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

   const onCalcBoilerShopRGC = async () => {
      const { boilerShopRgc } = await optimizeApi.calcBoilerShopRGC(optimalBoilers!);

      dispatch(setBoilerShopRgc(boilerShopRgc));
   };

   // Очищаем состав котельного оборудования, чтоб увидеть
   // список с выбором оборудования
   const onClearOptimalBoilers = () => {
      dispatch(clearOptimalBoilersInventory());
   };

   // Очищаем ХОП, чтоб отобразился экран оборудования
   const onClearRgc = () => {
      dispatch(clearShopRgc());
   };

   const renderContent = () => {
      if (boilerShopRgc) {
         return (
            <Gapped vertical gap={24} className={styles.tablesWrapper}>
               <div className={styles.headerWrapper}>
                  <h2 className={styles.title}>ХОП котельного цеха</h2>
                  <div className={styles.subtitle}>
                     Для подобранного оптимального состава оборудования <br /> рассчитаны значения
                     ХОП по сезонам года
                  </div>
               </div>
               <div className="layout">
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
               </div>
               <div className="layout">
                  <Table
                     title="ХОП зима"
                     firstRow={boilerShopRgc.winterBoilerShopRGC.b}
                     secondRow={boilerShopRgc.winterBoilerShopRGC.Q}
                  />
               </div>
               <div className="layout">
                  <Table
                     title="ХОП межсезонье"
                     firstRow={boilerShopRgc.offSeasonBoilerShopRGC.b}
                     secondRow={boilerShopRgc.offSeasonBoilerShopRGC.Q}
                  />
               </div>
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={onClearRgc}>
                     Вернуться к оборудованию
                  </Button>
               </div>
            </Gapped>
         );
      }

      if (optimalBoilers) {
         return (
            <>
               <Gapped vertical gap={24} className={styles.tablesWrapper}>
                  <div className={styles.headerWrapper}>
                     <h2 className={styles.title}>Оптимальный состав оборудования</h2>
                     <div className={styles.subtitle}>
                        Для выбранного оборудования подобран оптимальный состав по <br /> сезонам
                        года
                     </div>
                  </div>
                  {optimalBoilers?.summerBoilers && (
                     <div>
                        <h2 className={styles.seasonName}>Лето </h2>
                        <div>
                           {optimalBoilers.summerBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
                  {optimalBoilers?.winterBoilers && (
                     <div>
                        <h2 className={styles.seasonName}>Зима </h2>
                        <div>
                           {optimalBoilers.winterBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
                  {optimalBoilers?.offSeasonBoilers && (
                     <div>
                        <h2 className={styles.seasonName}>Межсезонье </h2>
                        <div>
                           {optimalBoilers.offSeasonBoilers.map((boiler) => (
                              <BoilerCard key={boiler.station_number} boiler={boiler} />
                           ))}
                        </div>
                     </div>
                  )}
               </Gapped>
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={onClearOptimalBoilers}>
                     Вернуться к выбору
                  </Button>
                  <Button use="primary" size="medium" onClick={onCalcBoilerShopRGC}>
                     Рассчитать ХОП
                  </Button>
               </div>
            </>
         );
      }

      return (
         <>
            <div className={styles.headerWrapper}>
               <h2 className={styles.title}>Оптимальный состав оборудования</h2>
               <div className={styles.subtitle}>
                  Выберите оборудование, которое есть у вас в наличии
               </div>
            </div>
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

   return <section className={styles.optimalEquipment}>{renderContent()}</section>;
};

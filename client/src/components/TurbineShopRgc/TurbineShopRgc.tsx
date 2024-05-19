import { useEffect } from "react";
import styles from "./optimalEquipment.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import { Button, Gapped } from "@skbkontur/react-ui";
import { TurbineCard } from "../EquipmentCard/TurbineCard";
import { SteamConsumption } from "../../types/types";
import { Table } from "../Table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
   addInventoryTurbine,
   clearOptimalTurbinesInventory,
   deleteInventoryTurbine,
   setOffSeasonRgc,
   setOptimalTurbinesInventory,
   setSteamConsumptions,
   setSummerRgc,
   setTurbines,
   setWinterRgc,
   clearShopRgc,
} from "../../store/reducers/TurbineSlice";

export const TurbineShopRgc = () => {
   const {
      inventoryTurbineNumbers,
      turbines,
      optimalTurbines,
      steamConsumptions,
      summerRgc,
      winterRgc,
      offSeasonRgc,
   } = useAppSelector((state) => state.turbineReducer);

   const optimizeApi = new OptimizeApi();
   const dispatch = useAppDispatch();

   const getTurbines = async () => {
      const { turbines } = await optimizeApi.getTurbines();

      dispatch(setTurbines(turbines));
   };

   useEffect(() => {
      getTurbines();
   }, []);

   const addTurbine = (number: number) => {
      dispatch(addInventoryTurbine(number));
   };

   const deleteTurbine = (number: number) => {
      dispatch(deleteInventoryTurbine(number));
   };

   const onCalcEquipment = async () => {
      const optimalTurbines = await optimizeApi.calcOptimaTurbines(inventoryTurbineNumbers);

      dispatch(setOptimalTurbinesInventory(optimalTurbines));
   };

   const onClearOptimalBoilers = () => {
      dispatch(clearOptimalTurbinesInventory());
   };

   const onCalcTurbineShopRgc = async () => {
      if (optimalTurbines) {
         if (optimalTurbines.summerTurbines) {
            const summerTurbinesData: SteamConsumption[] = optimalTurbines.summerTurbines.map(
               (turbine) => steamConsumptions[turbine.station_number]
            );

            const summerShopRgc = await optimizeApi.calcTurbinesShopRGC({
               season: "summer",
               turbinesData: summerTurbinesData,
            });

            dispatch(setSummerRgc(summerShopRgc));
         }

         if (optimalTurbines.winterTurbines) {
            const winterTurbinesData: SteamConsumption[] = optimalTurbines.winterTurbines.map(
               (turbine) => steamConsumptions[turbine.station_number]
            );

            const winterShopRgc = await optimizeApi.calcTurbinesShopRGC({
               season: "winter",
               turbinesData: winterTurbinesData,
            });

            dispatch(setWinterRgc(winterShopRgc));
         }

         if (optimalTurbines.offSeasonTurbines) {
            const offSeasonTurbinesData: SteamConsumption[] = optimalTurbines.offSeasonTurbines.map(
               (turbine) => steamConsumptions[turbine.station_number]
            );

            const offSeasonShopRgc = await optimizeApi.calcTurbinesShopRGC({
               season: "offSeason",
               turbinesData: offSeasonTurbinesData,
            });

            dispatch(setOffSeasonRgc(offSeasonShopRgc));
         }
      }
   };

   // Очищаем ХОП, чтоб отобразился экран оборудования
   const onClearRgc = () => {
      dispatch(clearShopRgc());
   };

   const renderContent = () => {
      if (summerRgc || winterRgc || offSeasonRgc) {
         return (
            <Gapped gap={24} vertical className={styles.tablesWrapper}>
               <div className="layout">
                  <h2 className={styles.title}>ХОП турбинного цеха</h2>
                  <div className={styles.subtitle}>
                     Для подобранного оптимального состава оборудования <br /> рассчитаны значения
                     ХОП по сезонам года
                  </div>
               </div>
               {summerRgc && (
                  <div className="layout">
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
                  </div>
               )}
               {winterRgc && (
                  <div className="layout">
                     <Table
                        firstRow={winterRgc.flow_char.x}
                        secondRow={winterRgc.flow_char.y}
                        title="Зима. Расходная характеристика"
                     />
                     <Table
                        firstRow={winterRgc.turbines_shop_hop.x}
                        secondRow={winterRgc.turbines_shop_hop.y}
                        title="Зима. ХОП турбинного цеха"
                     />
                  </div>
               )}
               {offSeasonRgc && (
                  <div className="layout">
                     <Table
                        firstRow={offSeasonRgc.flow_char.x}
                        secondRow={offSeasonRgc.flow_char.y}
                        title="Межсезонье. Расходная характеристика"
                     />
                     <Table
                        firstRow={offSeasonRgc.turbines_shop_hop.x}
                        secondRow={offSeasonRgc.turbines_shop_hop.y}
                        title="Межсезонье. ХОП турбинного цеха"
                     />
                  </div>
               )}
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={onClearRgc}>
                     Вернуться к оборудованию
                  </Button>
               </div>
            </Gapped>
         );
      }

      if (optimalTurbines) {
         return (
            <Gapped vertical gap={24} className={styles.tablesWrapper}>
               <div className="layout">
                  <h2 className={styles.title}>Оптимальный состав оборудования</h2>
                  <div className={styles.subtitle}>
                     Для выбранного оборудования подобран оптимальный состав по <br /> сезонам года
                  </div>
               </div>
               {optimalTurbines?.summerTurbines && (
                  <>
                     <h2 className={styles.seasonName}>Лето </h2>
                     <div>
                        {optimalTurbines?.summerTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </>
               )}
               {optimalTurbines?.offSeasonTurbines && (
                  <>
                     <h2 className={styles.seasonName}>Межсезонье </h2>
                     <div>
                        {optimalTurbines?.offSeasonTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </>
               )}
               {optimalTurbines?.winterTurbines && (
                  <>
                     <h2 className={styles.seasonName}>Зима </h2>
                     <div>
                        {optimalTurbines?.winterTurbines.map((turbine) => (
                           <TurbineCard key={turbine.station_number} turbine={turbine} />
                        ))}
                     </div>
                  </>
               )}
               <div className={styles.footerWrapper}>
                  <Button use="primary" size="medium" onClick={onClearOptimalBoilers}>
                     Вернуться к выбору
                  </Button>
                  <Button use="primary" size="medium" onClick={onCalcTurbineShopRgc}>
                     Рассчитать ХОП
                  </Button>
               </div>
            </Gapped>
         );
      }

      const onSubmit = (station_number: number, steamConsumption: SteamConsumption) => {
         const transformedConsumptions: SteamConsumption[] = [...steamConsumptions];

         transformedConsumptions[station_number] = steamConsumption;

         dispatch(setSteamConsumptions(transformedConsumptions));
      };

      return (
         <>
            <div className="layout">
               <h2 className={styles.title}>Оптимальный состав оборудования</h2>
               <div className={styles.subtitle}>
                  Выберите оборудование, которое есть у вас в наличии
               </div>
            </div>
            <div className={styles.equipmentWrapper}>
               <div>
                  {turbines.map((turbine) => (
                     <TurbineCard
                        key={turbine.station_number}
                        selected={inventoryTurbineNumbers.includes(turbine.station_number)}
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

   return <section className={styles.optimalEquipment}>{renderContent()}</section>;
};

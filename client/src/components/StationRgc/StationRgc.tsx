import { Button, Gapped } from "@skbkontur/react-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./stationRgc.module.css";
import OptimizeApi from "../../Api/OptimizeApi";
import {
   setOffSeasonStationRgc,
   setSummerStationRgc,
   setWinterStationRgc,
} from "../../store/reducers/StationSlice";
import { Table } from "../Table/Table";

export const StationRgc = () => {
   const { summerRgc, winterRgc, offSeasonRgc } = useAppSelector((state) => state.turbineReducer);
   const { boilerShopRgc } = useAppSelector((state) => state.boilerReducer);
   const { summerStationRgc, winterStationRgc, offSeasonStationRgc } = useAppSelector(
      (state) => state.stationReducer
   );
   const api = new OptimizeApi();
   const dispatch = useAppDispatch();

   // Флаг, который сообщает о том, что посчитаны ХОП котельного и турбинного цехов
   // Т.е. можно считать хоп станции
   const enoughData = Boolean(summerRgc && winterRgc && offSeasonRgc && boilerShopRgc);
   // Три флага, которые говорят о том, что достаточно данных для того, чтобы посчитать под конкретный сезон
   const enoughSummerData =
      boilerShopRgc?.summerBoilerShopRGC && summerRgc?.flow_char && summerRgc?.turbines_shop_hop;
   const enougWinterData =
      boilerShopRgc?.winterBoilerShopRGC && winterRgc?.flow_char && winterRgc?.turbines_shop_hop;
   const enoughOffSeasonData =
      boilerShopRgc?.offSeasonBoilerShopRGC &&
      offSeasonRgc?.flow_char &&
      offSeasonRgc?.turbines_shop_hop;

   const onCalcStationRGC = async () => {
      if (enoughSummerData) {
         const summerStationRgc = await api.calcStationRGC({
            boilersShopRGC: boilerShopRgc?.summerBoilerShopRGC,
            shopFlowChar: summerRgc?.flow_char,
            turbineShopRGC: summerRgc?.turbines_shop_hop,
         });

         dispatch(setSummerStationRgc(summerStationRgc));
      }

      if (enougWinterData) {
         const winterStationRgc = await api.calcStationRGC({
            boilersShopRGC: boilerShopRgc?.summerBoilerShopRGC,
            shopFlowChar: winterRgc?.flow_char,
            turbineShopRGC: winterRgc?.turbines_shop_hop,
         });

         dispatch(setWinterStationRgc(winterStationRgc));
      }

      if (enoughOffSeasonData) {
         const offSeasonStationRgc = await api.calcStationRGC({
            boilersShopRGC: boilerShopRgc?.summerBoilerShopRGC,
            shopFlowChar: offSeasonRgc?.flow_char,
            turbineShopRGC: offSeasonRgc?.turbines_shop_hop,
         });

         dispatch(setOffSeasonStationRgc(offSeasonStationRgc));
      }
   };

   const renderResultTables = () => {
      if (summerStationRgc || winterStationRgc || offSeasonStationRgc) {
         return (
            <Gapped vertical gap={24} className={styles.tablesWrapper}>
               {summerStationRgc && (
                  <div className="layout">
                     <Table
                        title="ХОП станции лето"
                        firstRow={summerStationRgc.b}
                        secondRow={summerStationRgc.N}
                     />
                  </div>
               )}
               {winterStationRgc && (
                  <div className="layout">
                     <Table
                        title="ХОП станции лето"
                        firstRow={winterStationRgc.b}
                        secondRow={winterStationRgc.N}
                     />
                  </div>
               )}
               {offSeasonStationRgc && (
                  <div className="layout">
                     <Table
                        title="ХОП станции лето"
                        firstRow={offSeasonStationRgc.b}
                        secondRow={offSeasonStationRgc.N}
                     />
                  </div>
               )}
            </Gapped>
         );
      }
   };

   return (
      <div>
         <div className="layout">
            <h2 className={styles.title}>Расчёт ХОП станции</h2>
            <div className={styles.subtitle}>
               Предварительно должны быть посчитаны ХОП котельного и турбинного цехов
            </div>
            <div className={styles.footerWrapper}>
               <Button
                  className={styles.btn}
                  use="primary"
                  size="medium"
                  onClick={onCalcStationRGC}
                  disabled={!enoughData}
               >
                  {enoughData ? "Рассчитать" : "Не хватает данных"}
               </Button>
            </div>
         </div>
         {renderResultTables()}
      </div>
   );
};

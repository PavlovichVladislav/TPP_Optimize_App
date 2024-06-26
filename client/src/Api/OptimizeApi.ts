import axios from "axios";
import { BoilerRgc, OptimalBoilersInventory, OptimalTurbinesData } from "../types/types";
import { FlowChar, IBoiler, OptimalTurbinesInventory, StationDemand, StationRgc, TurbineShopHop, TurbineShopRgc } from "../types/redux";

interface DataForCalcStationRGC {
   turbineShopRGC: TurbineShopHop
   boilersShopRGC: BoilerRgc
   shopFlowChar: FlowChar;
}

interface DataForStationOptimize {
   stationRGC: StationRgc;
   fuelPrice: number[]
   demand: StationDemand;
   season: string;
}

interface StationOptimizeResponse {
   up_percent: number[];
   zero_percent: number[];
}

class OptimizeApi {
   // constructor() {
   //     this.axios = axios.create({
   //         baseURL: 'http://127.0.0.1:4002'
   //     })
   // }

   /**
    * Функция для получения списка котельного обоудования
    * 
    * @returns boilers - список котельного оборудования типа IBoiler
    */
   async getBoilers() {
      const { data: boilers } = await axios.get<IBoiler[]>("http://localhost:4001/api/boilers");

      return { boilers };
   }

   async getTurbines() {
      const { data: turbines } = await axios.get("http://localhost:4001/api/turbines");

      return { turbines };
   }

   async calcOptimaBoilers(boilerNumbers: number[]) {
      const { data: optimalBoilers } = await axios.post<OptimalBoilersInventory>(
         "http://localhost:4001/api/boilers/optimal",
         {
            boilerNumbers,
         }
      );

      return optimalBoilers;
   }

   async calcOptimaTurbines(turbineNumbers: number[]) {
      const { data: optimalTurbines } = await axios.post<OptimalTurbinesInventory>(
         "http://localhost:4001/api/turbines/optimal",
         { turbineNumbers }
      );

      return optimalTurbines;
   }

   async calcBoilerShopRGC(boilersInventory: OptimalBoilersInventory) {
      const { data: boilerShopRgc } = await axios.post(
         "http://localhost:4001/api/boilers/shop-rgc",
         boilersInventory
      );

      return { boilerShopRgc };
   }

   async calcTurbinesShopRGC(turbinesInventory: OptimalTurbinesData) {
      const { data: turbineShopRgc } = await axios.post<TurbineShopRgc>(
         "http://localhost:4001/api/turbines/shop-rgc",
         turbinesInventory
      );

      return turbineShopRgc;
   }

   async calcStationRGC(stationRGCData: DataForCalcStationRGC ) {
      const { data: stationRgc } = await axios.post(
         "http://localhost:4001/api/station/rgc",
         stationRGCData
      );

      return stationRgc;
   }

   async calcStationOptimalMode(stationOptimizeData: DataForStationOptimize) {
      const { data: stationOptimalMode } = await axios.post<StationOptimizeResponse>(
         "http://localhost:4001/api/station/optimize",
         stationOptimizeData
      );

      return stationOptimalMode;
   }
}

export default OptimizeApi;

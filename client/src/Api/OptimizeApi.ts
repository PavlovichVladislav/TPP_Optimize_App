import axios from "axios";
import { OptimalBoilersInventory, OptimalTurbinesInventory } from "../types/types";
import { TurbineShopRgc } from "../components/TurbineShopRgc/TurbineShopRgc";

class OptimizeApi {
   // constructor() {
   //     this.axios = axios.create({
   //         baseURL: 'http://127.0.0.1:4002'
   //     })
   // }

   async getBoilers() {
      const { data: boilers } = await axios.get("http://localhost:4001/api/boilers");

      return { boilers };
   }

   async getTurbines() {
      const { data: turbines } = await axios.get("http://localhost:4001/api/turbines");

      return { turbines };
   }

   async calcOptimaBoilers(boilerNumbers: number[]) {
      const { data: optimalBoilers } = await axios.post(
         "http://localhost:4001/api/boilers/optimal",
         {
            boilerNumbers,
         }
      );

      return { optimalBoilers };
   }

   async calcOptimaTurbines(turbineNumbers: number[]) {
      const { data: optimalTurbines } = await axios.post(
         "http://localhost:4001/api/turbines/optimal",
         { turbineNumbers }
      );

      return { optimalTurbines };
   }

   async calcBoilerShopRGC(boilersInventory: OptimalBoilersInventory) {
      const { data: boilerShopRgc } = await axios.post(
         "http://localhost:4001/api/boilers/shop-rgc",
         boilersInventory
      );

      return { boilerShopRgc };
   }

   async calcTurbinesShopRGC(turbinesInventory: OptimalTurbinesInventory) {
      const { data: turbineShopRgc } = await axios.post<TurbineShopRgc>(
         "http://localhost:4001/api/turbines/shop-rgc",
         turbinesInventory
      );

      return turbineShopRgc;
   }
}

export default OptimizeApi;

import axios from "axios";

class OptimizeApi {
   // constructor() {
   //     this.axios = axios.create({
   //         baseURL: 'http://127.0.0.1:4002'
   //     })
   // }

   async getEquipment() {
      const { data: boilers } = await axios.get("http://localhost:4001/api/boilers");
      const { data: turbines } = await axios.get("http://localhost:4001/api/turbines");

      return { boilers, turbines };
   }

   async calcOptimalEquipment(boilerNumbers: number[], turbineNumbers: number[]) {
      const { data: optimalBoilers } = await axios.post(
         "http://localhost:4001/api/boilers/optimal",
         {
            boilerNumbers,
         }
      );
      const { data: optimalTurbines } = await axios.post(
         "http://localhost:4001/api/turbines/optimal",
         { turbineNumbers }
      );

      return { optimalBoilers, optimalTurbines };
   }
}

export default OptimizeApi;

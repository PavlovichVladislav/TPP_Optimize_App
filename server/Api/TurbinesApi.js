const BaseApi = require("./BaseApi");

class TurbinesApi extends BaseApi {
   constructor() {
      super();
   }

   async getOptimalEquipment(turbines) {
      const result = await this.axios.post("/turbines/get-optimal", turbines);

      return result.data;
   }

   async calcCollectionPoint(steam_consumption, season) {
      const result = await this.axios.post("/turbines/collection-point", {
         steam_consumption,
         season,
      });

      return result.data;
   }

   async calcTurbineRGC(turbine_mark, steam_consumption, season) {
      const result = await this.axios.post("/turbines/turbine-hop", {
         turbine_mark,
         steam_consumption,
         season,
      });

      return result.data;
   }

   async calcTurbinesShopRGC(turbines_data, season) {
      const result = await this.axios.post("/turbines/turbine-shop-hop", {
         turbines_data,
         season,
      });

      return result.data;
   }
}

module.exports = new TurbinesApi();

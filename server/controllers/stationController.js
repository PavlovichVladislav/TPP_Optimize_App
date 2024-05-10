const StationApi = require("../Api/StationApi");
const ApiError = require("../error/ApiError");
const transformFlowCharForApi = require("../utils/transformFlowCharForApi");
const transformRgcForApi = require("../utils/transformRgcToApi");

class StationController {
   /**
    * Хоп станции
    */
   async calcStationRGC(req, res, next) {
      try {
         const { turbineShopRGC, boilersShopRGC, shopFlowChar } = req.body;

         const transformedTurbineShopRgc = transformRgcForApi(turbineShopRGC.x, turbineShopRGC.y);
         const transformedFlowChar = transformFlowCharForApi(shopFlowChar);

         const stationRGC = await StationApi.calcStationRGC(
            transformedTurbineShopRgc,
            boilersShopRGC,
            transformedFlowChar
         );

         return res.json(stationRGC);
      } catch (error) {
         next(new ApiError(500, error.message));
      }
   }

   async getOptimalOperatingMode(req, res, next) {
      try {
         const { stationRGC: hop, fuelPrice, demand, season } = req.body;

         const stationOptimum = await StationApi.getOptimalMode(hop, fuelPrice, demand, season);

         return res.json(stationOptimum);
      } catch (error) {
         next(new ApiError(500, error.message));
      }
   }
}

module.exports = new StationController();

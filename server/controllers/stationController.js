const StationApi = require('../Api/StationApi')
const ApiError = require("../error/ApiError")

class StationController {
    /**
     * Хоп станции
     */
    async calcStationRGC(req, res) {
        const { turbineShopHop, boilersShopHop, shopFlowChar } = req.body;

        const stationRGC = await StationApi.calcStationRGC(
            turbineShopHop,
            boilersShopHop,
            shopFlowChar
        )

        return res.json(stationRGC)
    }

    async getOptimalOperatingMode(req, res) {
        const { hop, fuelPirce, demand, season } = req.body;

        const stationOptimum = await StationApi.getOptimalMode(
            hop,
            fuelPirce,
            demand,
            season
        )

        return res.json(stationOptimum)
    }
}

module.exports = new StationController();
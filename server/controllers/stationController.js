const stationApi = require('../Api/StationApi')
const ApiError = require("../error/ApiError")

class StationController {
    /**
     * Добавление новой турбины в БД
     */
    async calcStationRGC(req, res) {
        const { turbineShopHop, boilersShopHop, shopFlowChar } = req.body;

        const stationRGC = await stationApi.calcStationRGC(
            turbineShopHop,
            boilersShopHop,
            shopFlowChar
        )

        return res.json(stationRGC)
    }
}

module.exports = new StationController();
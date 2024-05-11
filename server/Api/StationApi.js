const BaseApi = require("./BaseApi");

class StationApi extends BaseApi{
    constructor() {
        super();
    }

    async calcStationRGC(turbineShopHop, boilersShopHop, shopFlowChar) {
        const result = await this.axios.post('/station/station-rgc', {
            turbineShopHop,
            boilersShopHop,
            shopFlowChar
        })

        return result.data;
    }

    async getOptimalMode(rgc, fuel_price, demand, season) {
        const result = await this.axios.post('/station/optimize', {
            rgc,
            fuel_price,
            demand,
            season
        })

        return result.data;
    }
}

module.exports = new StationApi();
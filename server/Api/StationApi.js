const BaseApi = require("./BaseApi");

class StationApi extends BaseApi{
    constructor() {
        super();
    }

    async calcStationRGC(turbineShopHop, boilersShopHop, shopFlowChar) {
        const result = await this.axios.post('/station/station-hop', {
            turbineShopHop,
            boilersShopHop,
            shopFlowChar
        })

        return result.data;
    }
}

module.exports = new StationApi();
const BaseApi = require("./BaseApi");


class TurbinesApi extends BaseApi{
    constructor() {
        super();
    }

    async getOptimalEquipment(turbines) {
        const result = await this.axios.post('/turbines/get-optimal', {
            data: [...turbines]
        })

        return result.data;
    }

    
    async calcCollectionPoint(steam_consumption, season) {
        const result = await this.axios.post('/turbines/collection-point', {
            steam_consumption,
            season
        })

        return result.data;
    }

    async calcRGC(mark, steam_consumption) {
        const result = await this.axios.post('/turbines/turbine-hop', {
            mark,
            steam_consumption
        })

        return result.data;
    }
}

module.exports = new TurbinesApi();
const BaseApi = require('./BaseApi');

class BoilersApi extends BaseApi {
    constructor() {
        super();
    }

    async getOptimalEquipment(boilers) {
        const result = await this.axios.post('/boilers/optimal', {boilers})

        return result.data;
    }

    async calcBoilerRGC(Q, efficiency) {
        const result = await this.axios.post('/boilers/boiler-rgc', {
            Q,
            efficiency
        })

        return result.data;
    }

    async calcBoilerShopRGC(boilersRGC) {
        const result = await this.axios.post('/boilers/boiler-shop-rgc', boilersRGC)

        return result.data;
    }
}

module.exports = new BoilersApi();
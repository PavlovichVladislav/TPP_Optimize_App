const BaseApi = require('./BaseApi');

class BoilersApi extends BaseApi {
    constructor() {
        super();
    }

    async getOptimalEquipment(boilers) {
        console.log('gg');
        const result = await this.axios.post('/boilers/optimal', {
            boilers
        })

        return result.data;
    }

    async calcBoilerRGC(load, efficiency) {
        const result = await this.axios.post('/boilers/boiler-rgc', {
            load,
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
const ApiError = require('../error/ApiError');
const BaseApi = require('./BaseApi');

class BoilersApi extends BaseApi {
    constructor() {
        super();
    }

    async getOptimalEquipment(boilers) {
        try {
            const result = await this.axios.post('/boilers/optimal', {
                data: [...boilers]
            })

            return result.data;
        } catch (error) {
            throw new ApiError(500, 'Internal server error')
        }
    }

    async calcBoilerRGC(load, efficiency) {
        try {
            const result = await this.axios.post('/boilers/boiler-hop', {
                load,
                efficiency
            })

            return result.data;
        } catch (error) {
            throw new ApiError(500, 'Internal server error')
        }
    }

    async calcBoilerShopRGC(boilersRGC) {
        try {
            const result = await this.axios.post('/boilers/boiler-shop-hop', boilersRGC)

            return result.data;
        } catch (error) {
            throw new ApiError(500, 'Internal server error')
        }
    }
}

module.exports = new BoilersApi();
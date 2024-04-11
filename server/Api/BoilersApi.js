const axios = require('axios');
const ApiError = require('../error/ApiError');

class BoilersApi {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://127.0.0.1:4002'
        })
    }

    async getOptimalEquipment(boilers) {
        try {
            const result = this.axios.post('/boilers/optimal', {
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
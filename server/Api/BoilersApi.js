const axios = require('axios');

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

            return result;
        } catch (error) {
            console.log(e.message);
        }
    }
}

module.exports = new BoilersApi();
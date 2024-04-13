const axios = require('axios');

class BaseApi {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://127.0.0.1:4002'
        })
    }
}

module.exports = BaseApi;
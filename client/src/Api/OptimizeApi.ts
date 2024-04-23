import axios from "axios";

class OptimizeApi {
    // constructor() {
    //     this.axios = axios.create({
    //         baseURL: 'http://127.0.0.1:4002'
    //     })
    // }

    async getEquipment() {
        const { data } = await axios.get('http://localhost:4001/api/boilers');

        return data;
    }
}

export default OptimizeApi;
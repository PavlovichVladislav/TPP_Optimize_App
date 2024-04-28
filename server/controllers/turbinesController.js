const TurbinesApi = require("../Api/TurbinesApi")
const ApiError = require("../error/ApiError")
const { Turbine } = require("../models/models")
const transformFlowChar = require('../utils/transformFlowChar');
const transformHop = require('../utils/transformHop');

class TurbinesController {
    /**
     * Добавление новой турбины в БД
     */
    async addTurbine(req, res) {
        const turbine = await Turbine.create(req.body)

        return res.json({message: 'Succesful created!', turbine})
    }

    /**
     * Метод для получения всех турбин из БД 
     */
    async getTurbines(req, res) {
        const turbines = await Turbine.findAll()
        
        return res.json(turbines)
    }

    /**
     * Расчёт оптимального состава турбин
     * @param req.body - массив с номерами турбин в наличии у станции 
     * @returns Возвращает комбинации турбин по сезонам года
     */
    async getOptimalEquipment(req, res, next) {
        try {
            const { turbineNumbers } = req.body;
            const turbines = [];
    
            // Находим турбины по их номерам 
            for (const number of turbineNumbers) {
                const turbine = await Turbine.findOne({
                    where: {
                        ['station_number']: number
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
    
                turbines.push(turbine.dataValues);
            }
    
            const result = await TurbinesApi.getOptimalEquipment(turbines)
            console.log(result);
            return res.json(result);
        } catch (error) {
            next(ApiError.internal(error.message))
        }
    }

    /**
     * ХОП турбины
    */
    async calcTurbineRGC(req, res, next) {
        try {
            const { turbine_mark, steam_consumption } = req.body;

            const rgcSummer = await TurbinesApi.calcTurbineRGC(turbine_mark, steam_consumption, "summer");
            const rgcWiner = await TurbinesApi.calcTurbineRGC(turbine_mark, steam_consumption, "winter");
            const rgcOffSeason = await TurbinesApi.calcTurbineRGC(turbine_mark, steam_consumption, "offSeason");
    
            return res.json({
                message: "Turbine rgc",
                mark: rgcSummer.mark,
                summer: {hop: rgcSummer.hop, flowChar: rgcSummer.flow_char},
                winter: {hop: rgcWiner.hop, flowChar: rgcWiner.flow_char},
                offSeason: {hop: rgcOffSeason.hop, flowChar: rgcOffSeason.flow_char},
            })
        } catch (error) {
            next(new ApiError(500, error.message))
        }
    }

    /*
    * ХОП турбинного цеха
    */
    async calcTurbineShopRGC(req, res, next) {
        try {
            const { turbinesData, season } = req.body;

            const rgc = await TurbinesApi.calcTurbinesShopRGC(turbinesData, season);
            const flow_char = transformFlowChar(rgc.flow_char);
            const turbines_shop_hop = transformHop(rgc.turbines_shop_hop);

            return res.json({flow_char, turbines_shop_hop})
        } catch(e) {    
            next(new ApiError(500, e.message))
        }
    }
}

module.exports = new TurbinesController();
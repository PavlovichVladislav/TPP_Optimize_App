const TurbinesApi = require("../Api/TurbinesApi")
const ApiError = require("../error/ApiError")
const { Turbine } = require("../models/models")


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

            const summerCollectionPoint = await TurbinesApi.calcCollectionPoint(steam_consumption, "summer");
            const winterCollectionPoint = await TurbinesApi.calcCollectionPoint(steam_consumption, "winter");
            const offSeasonCollectionPoint = await TurbinesApi.calcCollectionPoint(steam_consumption, "offSeason");
    
            const rgcSummer = await TurbinesApi.calcRGC(turbine_mark, summerCollectionPoint);
            const rgcWiner = await TurbinesApi.calcRGC(turbine_mark, winterCollectionPoint);
            const rgcOffSeason = await TurbinesApi.calcRGC(turbine_mark, offSeasonCollectionPoint);
    
            return res.json({
                message: "Turbine rgc", 
                summer: rgcSummer,
                winter: rgcWiner,
                offSeason: rgcOffSeason
            })
        } catch (error) {
            next(new ApiError(500, error.message))
        }
    }
}

module.exports = new TurbinesController();
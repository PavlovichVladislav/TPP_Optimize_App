const ApiError = require('../error/ApiError')
const { Boiler, BoilerCRFG } = require('../models/models')
const BoilersApi = require('../Api/BoilersApi')

class BoilersController {
    /**
     * Метод для получения всех котлов из БД 
     */
    async getBoilers(req, res, next) {
        const boilers = await Boiler.findAll()
        
        return res.json(boilers)
    }

    /**
     * Добавление нового котла в БД
     */
    async addBoiler(req, res) {
        const boiler = await Boiler.create(req.body)

        return res.json({message: 'Succesful created!', boiler})
    }

    async calcBoilerCRFGS(req, res) {
        const { boiler_mark, load, efficiency } = req.body;

        const boilerCRFGS = await BoilerCRFG.findOne({
            where: {
                ['boiler_mark']: boiler_mark
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (boilerCRFGS) {
            res.json({message: "Already exist at DB", crfg: boilerCRFGS.dataValues})
        }

        const crfg = await BoilersApi.calcCRFGS(load, efficiency);

        const createdCrfg = await BoilerCRFG.create({boiler_mark, ...crfg});

        return res.json({message: "Successful added crfg to DB", createdCrfg})
    }

    /**
     * Расчёт оптимального состава котлов
     * @param req.body - массив с номерами котлов в наличии у станции 
     * @returns Возвращает комбинации котлов по сезонам года
     */
    async getOptimalEquipment(req, res) {
        const { boilerNumbers } = req.body;
        const boilers = [];

        // Находим котлы по их номерам 
        for (const number of boilerNumbers) {
            const boiler = await Boiler.findOne({
                where: {
                    ['station_number']: number
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            boilers.push(boiler.dataValues);
        }

        const result = await BoilersApi.getOptimalEquipment(boilers)

        return res.json(result);
    }
}

module.exports = new BoilersController()
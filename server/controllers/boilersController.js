const ApiError = require('../error/ApiError')
const { Boiler, BoilerRGC } = require('../models/models')
const BoilersApi = require('../Api/BoilersApi')

class BoilersController {
    /**
     * Добавление нового котла в БД
    */
    async addBoiler(req, res) {
        const boiler = await Boiler.create(req.body)

        return res.json({message: 'Succesful created!', boiler})
    }
    
    /**
     * Метод для получения всех котлов из БД 
    */
    async getBoilers(req, res, next) {
        const boilers = await Boiler.findAll()
        
        return res.json(boilers)
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

    /**
     * ХОП для котла
    */
    async calcBoilerRGC(req, res) {
        const { boiler_mark, load, efficiency } = req.body;

        const boilerRGC = await BoilerRGC.findOne({
            where: {
                ['boiler_mark']: boiler_mark
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (boilerRGC) {
            res.json({message: "Already exist at DB", rgc: boilerRGC.dataValues})
        }

        const rgc = await BoilersApi.calcRGC(load, efficiency);

        const createdRGC = await BoilerRGC.create({boiler_mark, ...rgc});

        return res.json({message: "Successful added RGC to DB", createdRGC})
    }

    async calcBoilerShopRGC(req, res) {
        const boilersInventory = req.body;
        const boilersRGCArr = [];

        for (const [key, value] of Object.entries(boilersInventory)) {
            // Если котёл ТП-87А или ТП-81, то ивзлекаем из БД
            // ХОП для котла ТП-80, т.к. они у них одинаковые
            const mark = ['ТП-87А', 'ТП-81'].includes(key) ? 'ТП-80' : key;

            const boilerRGC = await BoilerRGC.findOne({
                where: {
                    ['boiler_mark']: mark
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            // Складываем столько значений ХОП, сколько котлов данного типа
            boilersRGCArr.push(...Array(value).fill(boilerRGC.dataValues));
        }

        const boilerShopRGC = await BoilersApi.calcBoilerShopRGC(boilersRGCArr);

        return res.json(boilerShopRGC);
    }
}

module.exports = new BoilersController()
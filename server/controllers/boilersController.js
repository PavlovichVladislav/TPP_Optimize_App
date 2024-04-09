const ApiError = require('../error/ApiError')
const { Boiler } = require('../models/models')
const BoilersApi = require('../Api/BoilersApi')

class BoilersController {
    async getBoilers(req, res, next) {
        const boilers = await Boiler.findAll()
        
        return res.json(boilers)
    }

    async addBoiler(req, res) {
        const boiler = await Boiler.create(req.body)

        return res.json({message: 'Succesful created!', boiler})
    }

    async getOptimalEquipment(req, res) {
        const { boilerNumbers } = req.body;
        const boilers = [];

        for (const number of boilerNumbers) {
            const boiler = await Boiler.findOne({
                where: {
                    ['station_number']: number
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            console.log('---------------');
            console.log('Найденный котёл!');
            console.log(boiler);

            boilers.push(boiler.dataValues);
        }

        console.log(boilers);

        const result = await BoilersApi.getOptimalEquipment(boilers)

        console.log(result);

        // return res.json(result.data);
    }
}

module.exports = new BoilersController()
const ApiError = require('../error/ApiError')

class BoilersController {
    async getBoilers(req, res, next) {
        const { id } = req.query;

        if (!id) {
            return next(ApiError.badRequest('Hello world!'))
        }

        res.json({message: 'hello!'})
    }

    async addBoiler(req, res) {
        
    }

    async getOptimalEquipment(req, res) {
        
    }
}

module.exports = new BoilersController()
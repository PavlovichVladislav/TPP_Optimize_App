const Router = require('express')
const BoilersController = require('../controllers/boilersController')

const router = new Router()

router.get('/', BoilersController.getBoilers)
router.post('/', BoilersController.addBoiler)
router.post('/optimal', BoilersController.getOptimalEquipment)

module.exports = router

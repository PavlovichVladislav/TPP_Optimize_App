const Router = require('express')
const BoilersController = require('../controllers/boilersController')

const router = new Router()

router.get('/', BoilersController.getBoilers)
router.post('/', BoilersController.addBoiler)
router.post('/optimal', BoilersController.getOptimalEquipment)
router.post('/rgc', BoilersController.calcBoilerRGC)
router.post('/shop-rgc', BoilersController.calcBoilerShopRGC)

module.exports = router

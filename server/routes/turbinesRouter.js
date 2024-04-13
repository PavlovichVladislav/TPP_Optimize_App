const Router = require('express')
const TurbinesController = require('../controllers/turbinesController')
const router = new Router()

router.get('/', TurbinesController.getTurbines)
router.post('/', TurbinesController.addTurbine)
router.post('/optimal', TurbinesController.getOptimalEquipment)
router.post('/rgc', TurbinesController.calcTurbineRGC)

module.exports = router

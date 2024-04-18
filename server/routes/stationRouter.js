const Router = require('express')
const stationController = require('../controllers/stationController')
const router = new Router()

router.post('/rgc', stationController.calcStationRGC)
router.get('/mc', )
router.get('/mr', )
router.get('/optimize', )

module.exports = router

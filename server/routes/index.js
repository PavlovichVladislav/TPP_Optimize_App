const Router = require('express')
const boilersRouter = require('./boilersRouter');
const turbinesRouter = require('./turbinesRouter');
const stationRouter = require('./stationRouter');

const router = new Router()

router.use('/boilers', boilersRouter)
router.use('/turbines', turbinesRouter)
router.use('/station', stationRouter)

module.exports = router

const express = require('express')
const router = express.Router()
const HospitalController = require('../controllers/hospitalController')

router.get('/getAllHospotals', HospitalController.getAllHospotals)
router.get('/getHospital/:hospitalId', HospitalController.getHospital)
router.post('/postHospital', HospitalController.postHospital)
router.patch('/editHospital/:hospitalId', HospitalController.editHospital)
router.delete('/deleteHospital/:hospitalId', HospitalController.deleteHospital)

module.exports = router;
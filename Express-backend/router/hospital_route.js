const express = require('express')
const router = express.Router()
const { getAllHospotals, getHospital, postHospital, editHospital, deleteHospital } = require('../controllers/hospitalController')


router.route('/').get(getAllHospotals).post(postHospital)
router.route('/:hospitalId').patch(editHospital).delete(deleteHospital).get(getHospital)

module.exports = router
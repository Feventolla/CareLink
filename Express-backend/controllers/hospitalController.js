const Hospital = require('../models/hospitalModel')


const getAllHospotals = async(req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json({ message: 'hospitals fetched', hospitals });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getHospital = async(req, res) => {
    try {
        const { hospitalId } = req.params;
        const hospital = await Hospital.findById(hospitalId);

        if (!hospital) {
            res.status(500).json({ message: 'hospital not found' });
        }

        res.status(200).json({ message: 'hospital fetched', hospital });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postHospital = async(req, res) => {
    try {
        const hospital = await Hospital.create(req.body)
        res.status(201).json({
            message: 'hospital created',
            hospital
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const deleteHospital = async(req, res) => {
    try {
        const { hospitalId } = req.params;
        const hospital = await Hospital.findByIdAndDelete(hospitalId);

        if (!hospital) {
            res.status(404).json({ message: "hospital not found" });
        }

        res.status(200).json({ message: 'hospital deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const editHospital = async(req, res) => {
    try {
        const { hospitalId } = req.params
        const hospital = await Hospital.findByIdAndUpdate(hospitalId,
            req.body, { new: true, runValidators: true })
        if (!hospital) {
            res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json({ message: 'Hospital Updated successfully', hospital });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllHospotals,
    getHospital,
    postHospital,
    editHospital,
    deleteHospital
}
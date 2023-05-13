const mongoose = require('mongoose');
const NationalID = require('../models/nationalProfile');

exports.insertData = async(req,res)=>{
    try {
        let promise = req.body.data.map(async(arr)=>{
            const newData = new NationalID ({
                ID:arr.ID,
                fullName:arr.fullName,
                motherName:arr.motherName,
                serialNumber:arr.serialNumber,
                sex:arr.sex,
                registerDate:arr.registerDate,
                endDate:arr.endDate,
                DOB:arr.DOB
        });
        await newData.save();
        })
        Promise.all(promise);
        return res.status(201).json({message: 'successfully inserted data'})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// get all NationalID  data
exports.getAllData = async(req, res) => {
    try {
        const data = await NationalID.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: err.message  });
    }
}

// get single person data
exports.getSinglePerson = async(req, res) => {
    try {
        const person = await NationalID.findOne({serialNumber: req.params.id});
        if (person) {
        return res.status(200).json(person);
        }else{
            return res.status(400).json({message: 'This ID does not exist.'});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
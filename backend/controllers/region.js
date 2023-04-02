const mongoose = require('mongoose');
const Region = require("../models/region");

exports.insertData = async(req,res)=>{
    try {
        let promise = req.body.data.map(async(arr)=>{
            const newData = new Region({
                ID:arr.ID,
                fullName:arr.fullName,
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

exports.getAllData = async(req, res) => {
    try {
        const data = await Region.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: err.message  });
    }
}
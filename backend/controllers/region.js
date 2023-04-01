const mongoose = require('mongoose');
const Region = require("../models/region");

exports.insertData = async(req,res)=>{
    try {
        await Region.insertMany(req.body)
        return res.status(201).json({message: 'successfully inserted data'})
    } catch (error) {
        return res.status(404).json({message:error.message});
    }
}

exports.getAllData = async(req, res) => {
    try {
        const data = await Region.find({});
        return res.json(data)
    } catch (err) {
        console.log(err.message);
    }
}
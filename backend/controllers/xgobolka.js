const mongoose = require('mongoose');
const Gobolka = require("../models/xgobolka");

exports.insertData = async(req,res)=>{
    try {
        await Gobolka.insertMany(req.body)
        return res.status(201).json({message: 'successfully inserted data'})
    } catch (error) {
        return res.status(404).json({message:error.message});
    }
}
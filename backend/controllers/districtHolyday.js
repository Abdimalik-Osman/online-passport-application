const DistrictHolyday = require("../models/districtHolidays");

// get all distinct holydays
exports.getDistrictHolydays = async(req,res)=>{
    try {
        const distinctHolydays = await DistrictHolyday.find({});
        if(!distinctHolydays){
            return res.status(400).json({message:"no distinctHolydays found",status: "fail"});
        }
        return res.status(200).json(distinctHolydays)
    } catch (error) {
        return res.status(500).json({message: error.message,status:'fail'});
    }
}

// get single distinct holyday
exports.getSingleDistrictHolydays = async(req,res)=>{
    try {
        const distinctHolydays = await DistrictHolyday.findOne({districtId: req.params.id});
        if(!distinctHolydays){
            return res.status(400).json({message:"no distinctHolydays found",status: "fail"});
        }
        return res.status(200).json(distinctHolydays)
    } catch (error) {
        return res.status(500).json({message: error.message,status:'fail'});
    }
}
// create new district holyday
exports.createHolyday = async(req,res)=>{
    try {
        const newHolyday = await DistrictHolyday.create(req.body);
        if(newHolyday){
            return res.status(200).json({message:"new record inserted successfully",status:"success"});
        }else{
            return res.status(400).json({message:"error occurred while creating new record",status:"fail"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message,status:"fail"});
    }
}

// update district holyday
exports.updateDistrictHolyday = async(req,res)=>{
    try {
        const updated = await DistrictHolyday.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        if(!updated){
            return res.status(400).json({message:'error while updating district holyday',status:"fail"});
        }
        return res.status(200).json({message:"district Holyday updated",status:"success"});
    } catch (error) {
        return res.status(500).json({message: error.message,status:"fail"});
    }
}

// delete district holyday
exports.deleteDistrictHolyday = async(req,res)=>{
    try {
        const deleted = await DistrictHolyday.findByIdAndRemove(req.params.id);
        if(!deleted){
            return res.status(400).json({message:"error while deleting district holyday",status:"fail"});
        }
        return res.json({message:"district holday deleted successfully",status:"success"});
    } catch (error) {
        return res.status(500).json({message: error.message,status:"fail"})
    }
}
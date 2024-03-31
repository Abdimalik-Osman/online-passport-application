const mongoose = require('mongoose');
const DistrictWorkingHours = require('../models/workingHours');

exports.createWorkingHours = async(req,res)=>{
    try {
    
            const newWorkingHours = await DistrictWorkingHours.create(req.body);
            if(!newWorkingHours){
                return res.status(400).json({message:"error while creating.."});
            }

    return res.status(201).json({message: 'new record inserted successfully'})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.getDistrictWorkingHoursData = async(req,res)=>{
    try {
        const data = await DistrictWorkingHours.find({});
        if(!data) return res.status(400).json({message:"no data found"});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({message:err.message});
        
    }
}

// get single District 
exports.getSingleDistrictWorkingHours = async(req,res)=>{
    try {
        const districtInfo = await DistrictWorkingHours.findOne({districtId:req.params.id});
        if(!districtInfo) return res.status(400).json({message:'no district data found'});
        return res.json(districtInfo);

    } catch (err) {
       return  res.status(500).json({message:err.message});
        
    }
}

//update working hours
 exports.updateWorkingHours = async (req, res) => {
    try {

     const updated = await DistrictWorkingHours.findOneAndUpdate({districtId: req.params.id},req.body,{new:true});
     if(!updated) return res.status(400).json({message:"not updated"});
      res.status(200).json({ message: 'Districts updated successfully' });
  
    //   res.status(200).json({ message: 'District updated successfully', district });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update district' });
    }
  };

  // get district's working hours 
exports.getDistrictWorkingHours = async(req,res)=>{
    try {
      const districtData = await DistrictWorkingHours.findOne({districtId: req.params.id});
      const workingHours = districtData?.workingHours?.map((data)=>{return data})
      return res.status(200).json(workingHours)
    } catch (error) {
      return res.status(500).json({ message:error.message });
    }
  }
const mongoose = require('mongoose');
const District = require('../models/district');
const WorkingHours = require('../models/workingHours');
//create a new district
exports.createDistrict = async(req,res)=>{
    try {
    
            const newDistrict = await District.create(req.body)

    return res.status(201).json({message: 'district successfully inserted'})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
// get district Dat
exports.getDistrictData = async(req,res)=>{
    try {
        const data = await District.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({message:err.message});
        
    }
}

// get single District 
exports.getSingleDistrict = async(req,res)=>{
    try {
        const districtInfo = await District.findOne({"districtInfo._id":req.params.id})
        return res.json(districtInfo?.districtInfo);
    } catch (err) {
       return  res.status(500).json({message:err.message});
        
    }
}
// update District
 exports.updateDistrict = async (req, res) => {
    const { id } = req.params;
  
    try {
      const district = await District.findById(id);
  
      if (!district) {
        return res.status(404).json({ message: 'District not found' });
      }
  
      const defaultDate = new Date();
      defaultDate.setHours(0, 0, 0, 0);
  
      const result = await District.updateMany(
        {},
        { $set: { 'availableDates.$[].date': defaultDate } }
      );
  
      console.log(`Updated ${result.nModified} districts`);
  
      res.status(200).json({ message: 'Districts updated successfully' });
  
    //   res.status(200).json({ message: 'District updated successfully', district });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update district' });
    }
  };

// get state information
exports.getStateData = async(req,res)=>{
  try {z
    const state = await District.findById(req.params.id);
    if (!state) return res.status(400).json({message: 'no state data found'});
    return res.status(200).json(state);
  } catch (error) {
    return res.status(500).json({ message:error.message });
  }
}


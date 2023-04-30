const District = require('../models/district');

exports.createDistrict = async(req,res)=>{
    try {
    
            const newDistrict = new District({
                districtName:req.body.districtName,
              
        });
        await newDistrict.save();

    return res.status(201).json({message: 'district successfully inserted'})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

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
        const districtInfo = await CID.findOne({_id:req.params.id});
        return res.json(districtInfo);
    } catch (err) {
       return  res.status(500).json({message:err.message});
        
    }
}

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
const CID = require('../models/CID');

exports.createData = async(req,res)=>{
    try {
        const promise = req.body.data.map(async(arr)=>{
            const newData = new CID({
                ID:arr.ID,
                fullName:arr.fullName,
                cIdNumber:arr.serialNumber,
                status:arr.status,
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

exports.getCidData = async(req,res)=>{
    try {
        const data = await CID.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({message:err.message});
        
    }
}

// get single person 
exports.getSinglePerson = async(req,res)=>{
    try {
        const person = await CID.findOne({cIdNumber:req.params.cIdNumber});
        return res.json(person);
    } catch (err) {
       return  res.status(500).json({message:err.message});
        
    }
}
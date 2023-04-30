const HolyDay = require('../models/holydays');

exports.createHolyDay = async(req,res)=>{
    try {
    
            const newHolyDay = new HolyDay({
                day:req.body.day,
                month:req.body.month
        });
        await newHolyDay.save();

    return res.status(201).json({message: 'new HolyDay successfully inserted'})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.getHolyDayData = async(req,res)=>{
    try {
        const data = await HolyDay.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({message:err.message});
        
    }
}



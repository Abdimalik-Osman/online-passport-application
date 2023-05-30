const HolyDay = require('../models/holydays');

exports.createHolyDay = async(req,res)=>{
    try {
    
            const newHolyDay = new HolyDay({
                day:req.body.day,
                month:req.body.month
        });
        await newHolyDay.save();

    return res.status(201).json({message: 'new HolyDay successfully inserted',status:"success"})
    } catch (error) {
        return res.status(500).json({message:error.message,status:"fail"});
    }
}

exports.getHolyDayData = async(req,res)=>{
    try {
        const data = await HolyDay.find({});
        return res.json(data)
    } catch (err) {
        return res.status(500).json({message:err.message,status:"fail"});
        
    }
}


// get holy day
exports.getSingleHolyDay = async(req,res)=>{
    try {
        if (new Date(req.body.appointmentDate).getDay() === 5) {
            return res.status(400).json({ message: 'Appointments cannot be booked on Fridays',status:"fail" });
        }
        const selectedAppointment = new Date(req.body.appointmentDate);
        const selectedDay = selectedAppointment.getDate();
        const selectedMonth = selectedAppointment.getMonth() + 1; // Months in JavaScript are zero-indexed, so we add 1 to get the //correct month number 
        const holyDayInfo = await HolyDay.findOne({
          day: selectedDay,
          month: selectedMonth,
        });
    
        if (holyDayInfo) {
          return res.status(400).json({ message: `Selected date is a holy day of ${holyDayInfo?.message}`,status:"fail"});
        }

        return res.status(200).json(holyDayInfo);
    } catch (error) {
        return res.status(500).json({message:error.message,status:"fail"})
    }
}

// 
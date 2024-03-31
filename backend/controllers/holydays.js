const HolyDay = require('../models/holydays');
const DistrictHolyday = require("../models/districtHolidays");
const { listenerCount } = require('../models/CID');
exports.createHolyDay = async(req,res)=>{
    try {
    
            const newHolyDay = await HolyDay.create(req.body);
    if(!newHolyDay) return res.status(400).json({message:"error while creating new holiday",status:"fail"});
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
        
        // console.log("here")
        console.log(req.params.appointmentDate)
        if (new Date(req.params.appointmentDate).getDay() === 5) {
            return res.status(400).json({ message: 'Appointments cannot be booked on Fridays',status:"fail" });
        }
        const selectedAppointment = new Date(req.params.appointmentDate);
        let selectedDay = selectedAppointment.getDate();
        let selectedMonth = selectedAppointment.getMonth() + 1; // Months in JavaScript are zero-indexed, so we add 1 to get the //correct month number 
        const selectedYear = selectedAppointment.getFullYear(); // Months in JavaScript are zero-indexed, so we add 1 to get the //correct month number 
        if(selectedMonth < 10){
            selectedMonth = "0" + selectedMonth;
        }
        if(selectedDay < 10){
            selectedDay = "0" + selectedDay;
        }
        const districtHolyday = await DistrictHolyday.findOne({
            districtId: req.params.id,
            day: selectedDay,
            month: selectedMonth,
            year: selectedYear
        })
       
        const holyDayInfo = await HolyDay.findOne({
          day: selectedDay,
          month: selectedMonth,
        });
    
        if (holyDayInfo) {
          return res.status(400).json({ message: `Selected date is a holy day of ${holyDayInfo?.message}`,status:"fail"});
        }
       
        if (districtHolyday) {
            return res.status(400).json({ message: `Selected date is a holy day of ${districtHolyday?.message}`,status:"fail"});
          }
        return res.status(200).json({message:"you can select it",status:"success"});
    } catch (error) {
        return res.status(500).json({message:error.message,status:"fail"})
    }
}

// 
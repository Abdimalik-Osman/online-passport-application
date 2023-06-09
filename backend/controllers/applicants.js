const Applicant = require("../models/applicants");
const CID = require("../models/CID");
const NationalID = require("../models/nationalProfile");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const District = require("../models/district");
const HolyDay = require("../models/holydays");
const moment = require("moment");
const PaymentLog = require("../models/paymentLog")
const UnAvailableDate = require("../models/unavailableDate")
const AvailableTime = require("../models/availableTime");
const DistrictWorkingHours = require("../models/workingHours");
const nodemailer = require("nodemailer")
// July 1    somalia united day
// October 12   national flag day
// 12 April     Somali National Army
// 26 June      national independence day
// November 21  somali teachers day
// March 8      International Women's Day

// exports.createApplicant = async(req,res)=>{
  
//       // Ensure that the appointment date is not a Friday
//   if (new Date(req.body.appointmentDate).getDay() === 5) {
//     return res.status(400).json({ message: 'Appointments cannot be booked on Fridays' });
//   }
//   const selectedAppointment = new Date(req.body.appointmentDate);
//     const selectedDay = selectedAppointment.getDate();
//     const selectedMonth = selectedAppointment.getMonth() + 1; // Months in JavaScript are zero-indexed, so we add 1 to get the //correct month number 
//     const holyDayInfo = await HolyDay.findOne({
//       day: selectedDay,
//       month: selectedMonth,
//     });

//     if (holyDayInfo) {
//       return res.status(400).json({ message: `Selected date is a holy day of ${holyDayInfo?.message}`});
//     }
//   try {
    
//     let passportExpirationData = new Date();
//         passportExpirationData.setFullYear(
//           passportExpirationData.getFullYear() + 5
//         );
//      // Check if there are available slots for the selected district and date
//      const districtInfo = await District.findById(req.body.districtId);

//      if (!districtInfo) {
//        return res.status(404).json({ message: 'District not found' });
//      }
     
//     //  Check if the selected time falls within the office hours
//     //  const selectedHour = new Date(req.body.appointmentDate).getHours();
//     //  if (selectedHour < 8 || selectedHour >= 12) {
//     //    return res.status(400).json({ message: 'Appointments can only be booked between 8:00am and 12:00pm' });
//     //  }
     
//      // get the filtered date from database
//     const formattedDate = moment(req.body.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
//      const applicantInfo = await Applicant.find({});
//      const filteredData = applicantInfo?.filter((info)=>{
//       return moment(info.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') === formattedDate
//      });
//      const filteredTime= applicantInfo?.filter((info)=>{
//       return info?.appointmentTime == req.body.appointmentTime
//      });
//      if(districtInfo?.dailySlots <= filteredData?.length){
//       return  res.status(400).json({ message: 'the district you selected have reached the daily limit' });
//    }
//     //  console.log( moment(applicantInfo[0]?.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD'))
//     //  console.log(filteredData[0]?.appointmentDate)
//     //  console.log(filteredTime.length)
//      if(districtInfo?.hourlySlots <= filteredTime.length && moment(filteredData[0]?.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') == formattedDate ){
//       return  res.status(400).json({ message: 'the hour you selected reached the hourly limit' });
//    }
    
//     // // get the national ID
//       const nationalData = await NationalID.findOne({
//       serialNumber: Number(req.body.nID),
//     });
//     const nIdExists = await Applicant.findOne({nID:req.body.nID})
    
//     const newApplicant = new Applicant({
//                     fullname: nationalData?.fullName,
//                     motherName: nationalData?.motherName,
//                     phoneNumber: req.body.phoneNumber,
//                     DOB: nationalData?.DOB,
//                     sex: nationalData?.sex,
//                     POB: req.body.POB,
//                     occupation: req.body.occupation,
//                     districtId: req.body.districtId,
//                     appointmentDate:req.body.appointmentDate,
//                     appointmentTime:req.body.appointmentTime,
//                     applyingDate: new Date(),
//                     expireDate: passportExpirationData,
//                     nID:req.body.nID
//                   });
//                      // Save the appointment and update the bookedSlots count for the selected date
//     await newApplicant.save();
//     if(newApplicant){
//       const newPayment = new PaymentLog({
//         applicantId:newApplicant._id,
//         amount:req.body.amount,
//         type:req.body.type
//       });
//       await newPayment.save();
//     }
//     else{
//       return res.status(400).json({message:"new appointment can not be created"})
//     }
//     // selectedDate.bookedSlots += 1;
//     // await districtInfo.save();

//     res.status(201).json({ message: 'Appointment booked successfully' });
//   } catch (error) {
//     return res.status(500).json({ error: error.message})
//   }
// //}

exports.createApplicant = async(req,res)=>{
  
  try {
    
    let passportExpirationData = new Date();
        passportExpirationData.setFullYear(
          passportExpirationData.getFullYear() + 5
        );

           // Find the highest appointmentNumber value in the database
    const highestAppointment = await Appointment.findOne().sort('-appointmentNumber').exec();
    let newAppointmentNumber = 0;
    if (highestAppointment) {
      // Extract the numeric portion of the highest appointmentNumber and increment it
      const lastNumber = parseInt(highestAppointment.appointmentNumber.toString().substr(4));
      newAppointmentNumber = lastNumber + 1;
    } else {
      // If no appointments exist in the database, start with a default value of 1000
      newAppointmentNumber = 1000;
    }
    // Set the appointmentNumber field to the new sequence number
    const appointmentNumber = `APPT${newAppointmentNumber.toString().padStart(4, '0')}`;
     // Check if there are available slots for the selected district and date
     const districtData = await District.findOne({"districtInfo._id":req.body.districtId})
    
     const districtInfo = districtData?.districtInfo?.filter((info)=>{
       return info._id == req.body.districtId
     })
    //  console.log(districtInfo)
     if (!districtInfo) {
       return res.status(400).json({ message: 'District not found' ,status:"fail"});
     }
     
    //  Check if the selected time falls within the office hours
    //  const selectedHour = new Date(req.body.appointmentDate).getHours();
    //  if (selectedHour < 8 || selectedHour >= 12) {
    //    return res.status(400).json({ message: 'Appointments can only be booked between 8:00am and 12:00pm' });
    //  }
     
     // get the filtered date from database
     const formattedDate = moment(req.body.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
     const applicantInfo = await Applicant.find({});
     const filteredData = applicantInfo?.filter((info) => {
       return moment(info.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') === formattedDate && info.districtId.equals(new mongoose.Types.ObjectId(req.body.districtId))
     });
     
     const filteredTime = filteredData?.filter((info) => {
       return info.appointmentTime == req.body.appointmentTime && info.districtId.equals(new mongoose.Types.ObjectId(req.body.districtId))
     });
     
     if (districtInfo[0]?.dailySlots <= filteredData.length && districtInfo[0]?._id.equals(new mongoose.Types.ObjectId(req.body.districtId)) && moment(filteredData[0]?.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') === formattedDate) {
      const newUnavailable = new UnAvailableDate({
        districtId: req.body.districtId,
        date:moment(req.body.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }) 
      await newUnavailable.save()
      return res.status(400).json({ message: 'the district you selected have reached the daily limit',status:"fail" });
    }  
   
   if (districtInfo[0]?.hourlySlots <= filteredTime.length && moment(filteredData[0]?.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') === formattedDate && districtInfo[0]?._id.equals(new mongoose.Types.ObjectId(req.body.districtId))) {
     return res.status(400).json({ message: 'the hour you selected reached the hourly limit',status:"fail" });
   }
   
   // // get the national ID
     const nationalData = await NationalID.findOne({
     serialNumber: Number(req.body.nID),
   });
   const nIdExists = await Applicant.findOne({nID:req.body.nID})
   
   const newApplicant = new Applicant({
                   fullname: nationalData?.fullName,
                   motherName: nationalData?.motherName,
                   phoneNumber: req.body.phoneNumber,
                   DOB: nationalData?.DOB,
                   sex: nationalData?.sex,
                   POB: req.body.POB,
                   occupation: req.body.occupation,
                   districtId: req.body.districtId,
                   appointmentDate:req.body.appointmentDate,
                   appointmentTime:req.body.appointmentTime,
                   applyingDate: new Date(),
                   expireDate: passportExpirationData,
                   nID:req.body.nID,
                   email:req.body.email,
                   emergencyContactNumber:req.body.emergencyContactNumber,
                   emergencyContactName:req.body.emergencyContactName,
                 });
                    // Save the appointment and update the bookedSlots count for the selected date
   await newApplicant.save();
   if(newApplicant){

const districtId = req.body.districtId;
const appointmentDate = moment(req.body.appointmentDate, 'YYYY-MM-DD').startOf('day');
const appointmentTime = req.body.appointmentTime;


// Find the document that matches the districtId and appointmentDate
const isExists = await AvailableTime.findOne({
  districtId: districtId,
  'availableInfo.date': req.body.appointmentDate,
  'availableInfo.time': appointmentTime
});

if (isExists) {
  // Update the availableNumber field in the existing document
  const availableInfo = isExists.availableInfo[0];
  availableInfo.availableNumber = Math.max(0, availableInfo.availableNumber - 1);
  await isExists.save();
}
 else {
  // Create a new document with the districtId and appointmentDate
  const newAvailableTime = new AvailableTime({
    districtId: districtId,
    availableInfo: [{
      date: req.body.appointmentDate,
      time: appointmentTime,
      availableNumber: districtInfo[0]?.hourlySlots -1 // Set the initial availableNumber to 3 (or any other value you prefer)
    }]
  });
  await newAvailableTime.save();
  const districtData = await DistrictWorkingHours.findOne({districtId: districtId});
  const workingHours = districtData?.workingHours?.filter((data)=>{
    console.log(data,"====")
    return data.startTime != appointmentTime});
  console.log(workingHours+"----------")
  workingHours.map(async(info)=>{
    const newDates = new AvailableTime({
      districtId: districtId,
      availableInfo: [{
        date: req.body.appointmentDate,
        time: info.startTime,
        availableNumber: districtInfo[0]?.hourlySlots // Set the initial availableNumber to 3 (or any other value you prefer)
      }]
    });
    await newDates.save();
  })

}
      const newAppointment = new Appointment({
        applicantId: newApplicant._id,
        appointmentNumber:appointmentNumber,
        appointmentDate:req.body.appointmentDate,
        appointmentTime:req.body.appointmentTime
      })
      await newAppointment.save()
      
        const newPayment = new PaymentLog({
        applicantId:newApplicant._id,
        amount:150,
        type:req.body.type
      });
      await newPayment.save();
      if(!newPayment){
        await Applicant.findByIdAndRemove(newApplicant._id)
        await Appointment.findByIdAndRemove(newAppointment._id)
      }
    }
    else{
      return res.status(400).json({message:"new appointment can not be created",status:"fail"})
    }
    const emailBody = `Dear ${newApplicant?.fullname}, your appointment has been scheduled with appointment number ${appointmentNumber}, with ${req.body.appointmentDate} at time ${req.body.appointmentTime}`;
    
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: 'myfather8818@gmail.com',
        pass:'oqsvvrqmzgjhxuux',
        
      }
    })
    const emailOption = {
      from: 'myfather88818@gmail.com',
      to: "engabdimalik8818@gmail.com",
      subject: emailBody,
      text:'Appointment Scheduled'
    }
    
    transport.sendMail(emailOption, (error, info) => {
      if (error) throw error;
    
      console.log(`The email sent ${info.response}`);
    })
    res.status(201).json({ message: 'Appointment booked successfully',status:"success"});
  } catch (error) {
    return res.status(500).json({ error: error.message, status:"fail"})
  }
}

// get all applicants

exports.getAllApplicants = async(req,res)=>{
    try {
        const applicants = await Applicant.find({});
        if(!applicants){
          return res.status(400).json({ message: "no applicants found", status:"fail" });
        }
        return res.status(200).json(applicants);
    } catch (err) {
        return res.status(500).json({ message: err.message, status:"fail" });
    }
}

// get single applicant
exports.getSingleApplicant = async(req,res)=>{
    try {
        const singleApplicant = await Applicant.findOne({_id:req.params.id});
        if(!singleApplicant){
          return res.status(400).json({ message:"not found this applicant", status:"fail" });
        }
        return res.status(200).json(singleApplicant);
    } catch (err) {
        return res.status(500).json({ message:err.message, status:"fail"});
        
    }
}

// delete a singleApplicant
exports.deleteApplicant = async(req, res)=>{
    try {
        await Applicant.findByIdAndRemove({_id:mongoose.Types.ObjectId(req.params.id)});
        return res.status(200).json({message:"Successfully deleted applicant🤣",status:"success"})
    } catch (err) {
        return res.status(500).json({ message:err.message, status:"fail"});
    }
}


// get national ID
exports.getNationalId = async(req,res) =>{
try {
  const data = await NationalID.findById(req.params.id)
  if(!data){
    return res.status(400).json({message:'this National Id does not exist.',status:"fail"})
  }
  return res.status(200).json(data)
} catch (error) {
  return res.status(500).json({message:error.message,status:"fail"})
}
}

// get un available dates
exports.getUnavailableDates = async(req, res)=>{
  try {
    
    const data = await UnAvailableDate.find({
      districtId: req.params.id
    });

    return res.send(data)
  } catch (error) {
    return res.status(500).json({message:error.message, status:"fail"})
  }
}
// get un available dates
exports.getAvailableDates = async(req, res)=>{
  try {
    
    
    const appointmentDate = moment(req.body.appointmentDate, 'YYYY-MM-DD');
    console.log(new Date(req.body.appointmentDate))
    const data = await AvailableTime.find({
      districtId: req.body.id,
      "availableInfo.date": req.body.appointmentDate
    });

    // if(!data || data.length === 0) {
    //   return res.status(400).json({message:"no available information about this appointment"})
    // }
    // const filtered = data?.filter((info) => {
    //   // console.log(moment(info?.availableInfo[0]?.date, 'YYYY-MM-DD').format("YYYY-MM-DD"))
    //   console.log(moment(info?.availableInfo[0]?.date, 'YYYY-MM-DD').format("YYYY-MM-DD"),"----")
    //   console.log( moment(req.body.appointmentDate, 'YYYY-MM-DD').format("YYYY-MM-DD"),
    //   "====")
    //   return info.districtId.equals(req.body.id) && moment(info?.availableInfo[0]?.date, 'YYYY-MM-DD').format("YYYY-MM-DD") === moment(req.body.appointmentDate, 'YYYY-MM-DD').format("YYYY-MM-DD")
    // })
    const filtered = data?.map((info)=>{
      return info?.availableInfo[0]
    })
    // console.log(filtered)
    return res.send(filtered)
  } catch (error) {
    return res.status(500).json({message:error.message, status:"fail"})
  }
}

exports.updateApplicant = async(req,res)=>{
  try {
    const updated = await Applicant.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    if(!updated) return res.status(400).json({message:"Error occurred while updating this applicant..",status:"fail"})
    return res.status(200).json({message:"application updated successfully",status:"success"})
  } catch (error) {
    return res.status(500).json({message:error.message, status:"fail"})
  }
}

exports.viewApplicant = async (req,res) => {
  try {
    if(!req.params.appointmentNumber || req.params.appointmentNumber === undefined){
      return res.stat(404).json({message:"Please enter appointment number",status:"fail"});
    }
    if(!req.params.phoneNumber || req.params.phoneNumber === undefined){
      return res.stat(404).json({message:"Please enter phone number",status:"fail"});
    }
     const applicantInfo = await Appointment.findOne({appointmentNumber:req.params.appointmentNumber, phoneNumber:req.params.phoneNumber})
     if(!applicantInfo) return res.status(400).json({message:"this appointment does not exist",status:"fail"})
     console.log(applicantInfo?._id)
     const applicantData = await Applicant.findOne({phoneNumber:applicantInfo?.phoneNumber})
     if (!applicantData){
      return res.stat(404).json({message:"No applicant data was not found",status:"fail"});
     }
    //  console.log(applicantData)
     return res.status(200).json(applicantData)
  } catch (error) {
    return res.status(500).json({message:error.message, status:"fail"})
  }
}


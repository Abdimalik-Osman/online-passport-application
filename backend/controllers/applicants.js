const Applicant = require("../models/applicants");
const CID = require("../models/CID");
const NationalID = require("../models/nationalProfile");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const District = require("../models/district");
const HolyDay = require("../models/holydays");
const moment = require("moment");

// July 1    somalia united day
// October 12   national flag day
// 12 April     Somali National Army
// 26 June      national independence day
// November 21  somali teachers day
// March 8      International Women's Day

exports.createApplicant = async(req,res)=>{
  
      // Ensure that the appointment date is not a Friday
  if (new Date(req.body.appointmentDate).getDay() === 5) {
    return res.status(400).json({ message: 'Appointments cannot be booked on Fridays' });
  }
  const selectedAppointment = new Date(req.body.appointmentDate);
    const selectedDay = selectedAppointment.getDate();
    const selectedMonth = selectedAppointment.getMonth() + 1; // Months in JavaScript are zero-indexed, so we add 1 to get the //correct month number 
    const holyDayInfo = await HolyDay.findOne({
      day: selectedDay,
      month: selectedMonth,
    });

    if (holyDayInfo) {
      return res.status(400).json({ message: `Selected date is a holy day of ${holyDayInfo?.message}`});
    }
  try {
    
    let passportExpirationData = new Date();
        passportExpirationData.setFullYear(
          passportExpirationData.getFullYear() + 5
        );
     // Check if there are available slots for the selected district and date
     const districtInfo = await District.findById(req.body.districtId);

     if (!districtInfo) {
       return res.status(404).json({ message: 'District not found' });
     }
     
    //  Check if the selected time falls within the office hours
    //  const selectedHour = new Date(req.body.appointmentDate).getHours();
    //  if (selectedHour < 8 || selectedHour >= 12) {
    //    return res.status(400).json({ message: 'Appointments can only be booked between 8:00am and 12:00pm' });
    //  }
     
     // get the filtered date from database
    const formattedDate = moment(req.body.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
     const applicantInfo = await Applicant.find({});
     const filteredData = applicantInfo?.filter((info)=>{
      return moment(info.appointmentDate, 'YYYY-MM-DD').format('YYYY-MM-DD') === formattedDate
     });
     console.log(moment(req.body.appointmentDate, 'hh:mm').format('hh:mm a'))
     console.log(new Date().getUTCHours())
    //  console.log()
     // check if the selected date is reached the limit of that day
     if(districtInfo?.dailySlots <= filteredData?.length){
        return  res.status(400).json({ message: 'the district you selected have reached the daily limit' });
     }
   
    
    // // get the national ID
      const nationalData = await NationalID.findOne({
      serialNumber: Number(req.body.nID),
    });
    const nIdExists = await Applicant.findOne({nID:req.body.nID})
    if(nIdExists?.nID){
      return res.status(400).json({message:"this National ID already exists"})
    }
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
                    applyingDate: new Date(),
                    expireDate: passportExpirationData,
                    nID:req.body.nID
                  });
                     // Save the appointment and update the bookedSlots count for the selected date
    await newApplicant.save();
    // selectedDate.bookedSlots += 1;
    // await districtInfo.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

// get all applicants

exports.getAllApplicants = async(req,res)=>{
    try {
        const applicants = await Applicant.find({});
        return res.status(200).json(applicants);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// get single applicant
exports.getSingleApplicant = async(req,res)=>{
    try {
        const singleApplicant = await Applicant.findOne({_id:req.params.id});
        return res.status(200).json(singleApplicant);
    } catch (err) {
        return res.status(500).json({ message:err.message});
        
    }
}

// delete a singleApplicant
exports.deleteApplicant = async(req, res)=>{
    try {
        await Applicant.findByIdAndRemove({_id:mongoose.Types.ObjectId(req.params.id)});
        return res.status(200).json({message:"Successfully deleted applicant🤣"})
    } catch (err) {
        return res.status(500).json({ message:err.message});
    }
}





// exports.createApplicant = async (req, res) => {
//   try {
//     //initialize the passport expiration date
//     let passportExpirationData = new Date();
//     passportExpirationData.setFullYear(
//       passportExpirationData.getFullYear() + 5
//     );

//     // create an appointment time
//     const options = { timeZone: "Africa/Nairobi" };
//     let appointmentDate = new Date().toLocaleString("en-US", options);
//     appointmentDate = new Date(appointmentDate); // convert the date string to a Date object
//     appointmentDate.setDate(appointmentDate.getDate() + 3);
//     // appointmentDate.setHours(8, 0, 0); // set the time to 9:00 AM
//     //    console.log(appointmentDate.toLocaleString('en-US', options));
//     (appointmentDate.getDay() === 5 ? new Date(appointmentDate.setDate(appointmentDate.getDate() + 1)).toLocaleString('en-US', options) : appointmentDate.toLocaleString('en-US', options)) + "."
//     let appointmentNumber = Math.floor(100000 + Math.random() * 900000);

//     // check if the applicant is already existing
//     const oldCidNumber = await Applicant.findOne({CIDNumber:req.body.CIDNumber})
//     const oldRegionalId = await Applicant.findOne({regionalID:req.body.regionalID})

//     // get cid data
//     const cIdData = await CID.findOne({
//       cIdNumber: Number(req.body.CIDNumber),
//     });
//     // get region's data
//     const regionalData = await Region.findOne({
//       serialNumber: Number(req.body.regionalID),
//     });
//     if (regionalData) {
//       if (regionalData.endDate < Date.now()) {
//         return res
//           .status(404)
//           .json({ message: "Dhalashadaada waqtiga wuu ka dhacay..." });
//       } else {
//         if (cIdData) {
//           if (
//             cIdData.status === true ||
//             cIdData.status == true ||
//             cIdData.status == "true"
//           ) {
//             if(oldRegionalId || oldCidNumber){
//               return res.status(404).json({message:"Sorry, qofkan mar hore ayaa la diiwangaliyey😜😜"})
//             }
           
//             const newApplicant = new Applicant({
//               fullname: regionalData?.fullName,
//               motherName: req.body.motherName,
//               phoneNumber: req.body.phoneNumber,
//               DOB: regionalData?.DOB,
//               sex: regionalData?.sex,
//               POB: req.body.POB,
//               occupation: req.body.occupation,
//               applyingPlace: req.body.applyingPlace,
//               // passportType:
//               applyingDate: new Date(),
//               expireDate: passportExpirationData,
//               CIDNumber: req.body.CIDNumber,
//               regionalID: req.body.regionalID,
//             });
//             await newApplicant.save();
//             if (newApplicant) {
//               const newAppointment = new Appointment({
//                 applicantId: newApplicant?._id,
//                 appointmentNumber: appointmentNumber,
//                 appointmentDate: appointmentDate,
//               });
//               await newAppointment.save();
//               return res.status(201).json({
//                 message: "new Applicant has been created🤣🤣🤣",
//                 newApplicant,
//               });
//             } else {
//               return res
//                 .status(404)
//                 .json({
//                   message: "error occurred while creating new applicant😜😜",
//                 });
//             }
//           } else {
//             return res
//               .status(404)
//               .json({ message: "Fadlan adiga waxaa tahay dambiile😜😜" });
//           }
//         } else {
//           return res
//             .status(404)
//             .json({
//               message:
//                 "CID numberkan majiro,Fadlan marka hore iska soo diiwan gali CID-da😜😜",
//             });
//         }
//       }
//     } else {
//       return res
//         .status(404)
//         .json({
//           message:
//             "Dhalasho numberkan majiro, fadlan marka hore iska soo diiwan gali xarunta gobolka😜😜",
//         });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
const Applicant = require("../models/applicants");
const fs = require('fs');
const CID = require("../models/CID");
const NationalID = require("../models/nationalProfile");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const District = require("../models/district");
const HolyDay = require("../models/holydays");
const moment = require("moment");
const PaymentLog = require("../models/paymentLog");
const UnAvailableDate = require("../models/unavailableDate");
const AvailableTime = require("../models/availableTime");
const DistrictWorkingHours = require("../models/workingHours");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const path = require("path");
const multer = require("multer");
const cron = require("node-cron");
const Image = require("../models/images");
const cloudinary = require("../../cloudinary/upload");
// Set up multer storage for file uploads
const mime = require("mime");
const axios = require("axios");
const Employee = require("../models/employees");
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

exports.createApplicant = async (req, res) => {
  try {
    // const apiwafiUSD = {
    //   schemaVersion: "1.0",
    //   requestId: "10111331033",
    //   timestamp: "client_timestamp",
    //   channelName: "WEB",
    //   serviceName: "API_PURCHASE",
    //   serviceParams: {
    //     merchantUid: "M0910291",
    //     apiUserId: "1000416",
    //     apiKey: "API-675418888AHX",
    //     paymentMethod: "mwallet_account",
    //     payerInfo: {
    //       accountNo: "252616328920",
    //     },
    //     transactionInfo: {
    //       referenceId: "12334",
    //       invoiceId: "7896504",
    //       amount: 0.01,
    //       currency: "USD",
    //       description: "Test USD",
    //     },
    //   },
    // };

    // let apiwafi = await axios.post("https://api.waafipay.net/asm", apiwafiUSD);
    // if (apiwafi.data.responseMsg == "RCS_SUCCESS") {
    //   console.log("hello");
    //   const apiwafiUSD2 = {
    //     schemaVersion: "1.0",
    //     requestId: "14636832123312",
    //     timestamp: "20181231130916000",
    //     channelName: "WEB",
    //     serviceName: "API_PREAUTHORIZE_COMMIT",
    //     serviceParams: {
    //       apiUserId: 1004068,
    //       merchantUid: "M0911931",
    //       apiKey: "API-532593570AHX",
    //       transactionId: apiwafi.data.params.transactionId,
    //       description: "Commited",
    //       referenceId: "R75641560240445",
    //     },
    //   };
    //   let apiwafi2 = await axios.post(
    //     "https://api.waafipay.net/asm",
    //     apiwafiUSD2
    //   );

    //   if (!apiwafi2) {
    //     return res.status(500).json({message:apiwafi.data.responseMsg, status: "fail" });
    //   }
    
      
      // console.log("apiwafi2 " + apiwafi2.data.responseMsg);
      
    const nationalData = await NationalID.findOne({
      serialNumber: Number(req.body.nID),
    });
    const nIdExists = await Applicant.findOne({ nID: req.body.nID });
    if (nIdExists) {
      return res
        .status(400)
        .json({ message: "this nation is already exists..", status: "fail" });
    }

    let passportExpirationData = new Date();
    passportExpirationData.setFullYear(
      passportExpirationData.getFullYear() + 5
    );

    // Find the highest appointmentNumber value in the database
    const highestAppointment = await Appointment.findOne()
      .sort("-appointmentNumber")
      .exec();
    let newAppointmentNumber = 0;
    if (highestAppointment) {
      // Extract the numeric portion of the highest appointmentNumber and increment it
      const lastNumber = parseInt(
        highestAppointment.appointmentNumber.toString().substr(4)
      );
      newAppointmentNumber = lastNumber + 1;
    } else {
      // If no appointments exist in the database, start with a default value of 1000
      newAppointmentNumber = 1000;
    }
    // Set the appointmentNumber field to the new sequence number
    const appointmentNumber = `APPT${newAppointmentNumber
      .toString()
      .padStart(4, "0")}`;
    // Check if there are available slots for the selected district and date
    const districtData = await District.findOne({
      "districtInfo._id": req.body.districtId,
    });

    const districtInfo = districtData?.districtInfo?.filter((info) => {
      return info._id == req.body.districtId;
    });
    //  console.log(districtInfo)
    if (!districtInfo) {
      return res
        .status(400)
        .json({ message: "District not found", status: "fail" });
    }

    //  Check if the selected time falls within the office hours
    //  const selectedHour = new Date(req.body.appointmentDate).getHours();
    //  if (selectedHour < 8 || selectedHour >= 12) {
    //    return res.status(400).json({ message: 'Appointments can only be booked between 8:00am and 12:00pm' });
    //  }

    // get the filtered date from database
    const formattedDate = moment(req.body.appointmentDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    const applicantInfo = await Applicant.find({});
    const filteredData = applicantInfo?.filter((info) => {
      return (
        moment(info.appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD") ===
          formattedDate &&
        info.districtId.equals(new mongoose.Types.ObjectId(req.body.districtId))
      );
    });

    const filteredTime = filteredData?.filter((info) => {
      return (
        info.appointmentTime == req.body.appointmentTime &&
        info.districtId.equals(new mongoose.Types.ObjectId(req.body.districtId))
      );
    });

    if (
      districtInfo[0]?.dailySlots <= filteredData.length &&
      districtInfo[0]?._id.equals(
        new mongoose.Types.ObjectId(req.body.districtId)
      ) &&
      moment(filteredData[0]?.appointmentDate, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ) === formattedDate
    ) {
      const newUnavailable = new UnAvailableDate({
        districtId: req.body.districtId,
        date: moment(req.body.appointmentDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
      });
      await newUnavailable.save();
      return res
        .status(400)
        .json({
          message: "the district you selected have reached the daily limit",
          status: "fail",
        });
    }

    if (
      districtInfo[0]?.hourlySlots <= filteredTime.length &&
      moment(filteredData[0]?.appointmentDate, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ) === formattedDate &&
      districtInfo[0]?._id.equals(
        new mongoose.Types.ObjectId(req.body.districtId)
      )
    ) {
      return res
        .status(400)
        .json({
          message: "the hour you selected reached the hourly limit",
          status: "fail",
        });
    }

    // // get the national ID

    const newApplicant = new Applicant({
      fullname: nationalData?.fullName,
      motherName: nationalData?.motherName,
      phoneNumber: req.body.phoneNumber,
      DOB: nationalData?.DOB,
      sex: nationalData?.sex,
      POB: req.body.POB,
      occupation: req.body.occupation,
      districtId: req.body.districtId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      applyingDate: new Date(),
      maritalStatus:req.body.status,
      expireDate: passportExpirationData,
      nID: req.body.nID,
      email: req.body.email,
      emergencyContactNumber: req.body.emergencyContactNumber,
      emergencyContactName: req.body.emergencyContactName,
    });
    // Save the appointment and update the bookedSlots count for the selected date
    await newApplicant.save();
    if (newApplicant) {
      const districtId = req.body.districtId;
      const appointmentDate = moment(
        req.body.appointmentDate,
        "YYYY-MM-DD"
      ).startOf("day");
      const appointmentTime = req.body.appointmentTime;

      // Find the document that matches the districtId and appointmentDate
      const isExists = await AvailableTime.findOne({
        districtId: districtId,
        "availableInfo.date": req.body.appointmentDate,
        "availableInfo.time": appointmentTime,
      });

      if (isExists) {
        // Update the availableNumber field in the existing document
        const availableInfo = isExists.availableInfo[0];
        availableInfo.availableNumber = Math.max(
          0,
          availableInfo.availableNumber - 1
        );
        await isExists.save();
      } else {
        // Create a new document with the districtId and appointmentDate
        const newAvailableTime = new AvailableTime({
          districtId: districtId,
          availableInfo: [
            {
              date: req.body.appointmentDate,
              time: appointmentTime,
              availableNumber: districtInfo[0]?.hourlySlots - 1, // Set the initial availableNumber to 3 (or any other value you prefer)
            },
          ],
        });
        await newAvailableTime.save();
        const districtData = await DistrictWorkingHours.findOne({
          districtId: districtId,
        });
        const workingHours = districtData?.workingHours?.filter((data) => {
          console.log(data, "====");
          return data.startTime != appointmentTime;
        });
        console.log(workingHours + "----------");
        workingHours.map(async (info) => {
          const newDates = new AvailableTime({
            districtId: districtId,
            availableInfo: [
              {
                date: req.body.appointmentDate,
                time: info.startTime,
                availableNumber: districtInfo[0]?.hourlySlots, // Set the initial availableNumber to 3 (or any other value you prefer)
              },
            ],
          });
          await newDates.save();
        });
      }
      const newAppointment = new Appointment({
        applicantId: newApplicant._id,
        appointmentNumber: appointmentNumber,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        phoneNumber: req.body.phoneNumber,
      });
      await newAppointment.save();

      const newPayment = new PaymentLog({
        applicantId: newApplicant._id,
        amount: 150,
        type: "New",
      });
      await newPayment.save();
      if (!newPayment) {
        await Applicant.findByIdAndRemove(newApplicant._id);
        await Appointment.findByIdAndRemove(newAppointment._id);
      }
    } else {
      return res
        .status(400)
        .json({
          message: "new appointment can not be created",
          status: "fail",
        });
    }
    const emailBody = `Dear ${newApplicant?.fullname}, your appointment has been scheduled with appointment number ${appointmentNumber}, and appointment Date ${req.body.appointmentDate} at time ${req.body.appointmentTime}`;

    // await axios.post(
    //   "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
    //     emailBody +
    //     "&rec=" +
    //     req.body.phoneNumber +
    //     ""
    // );
    //  await axios.post(`https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=${emailBody}&rec=${req.body.phoneNumber}`)
    return res
      .status(201)
      .json({ message: "Your Application registered successfully", status: "success" });
      // return res
      //   .status(200)
      //   .json({ message: apiwafi2.data.responseMsg, success: true });
    // } else {
    //   console.log("apiwafi2 " + apiwafi.data.responseMsg);
    //   return res
    //     .status(499)
    //     .json({ message: apiwafi.data.responseMsg, status: "fail" });
    // }
  } catch (error) {
    return res.status(500).json({ error: error.message, status: "fail" });
  }
};

// get all applicants

exports.getAllApplicants = async (req, res) => {
  try {
    let applicants;
    const user = await User.findOne({ _id: req.params.userId });
    if (user?.isAdmin !== true) {
      applicants = await Applicant.find({
        districtId: req.params.districtId,
        isApproved: true,
        isCanceled: false,
      });
      return res.status(200).json(applicants);
    } else {
      applicants = await Applicant.find({
        isApproved: true,
        isCanceled: false,
      });
      if (!applicants) {
        return res
          .status(400)
          .json({ message: "no applicants found", status: "fail" });
      }
      return res.status(200).json(applicants);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "fail" });
  }
};
exports.fetchApprovedApplicants = async (req, res) => {
  try {
    let applicants;
    
      applicants = await Applicant.find({
        isApproved: true,
        isCanceled: false,
      });
      if (!applicants) {
        return res
          .status(400)
          .json({ message: "no applicants found", status: "fail" });
      }
      return res.status(200).json(applicants);
    
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "fail" });
  }
};

// get single applicant
exports.getSingleApplicant = async (req, res) => {
  try {
    const singleApplicant = await Applicant.findOne({ _id: req.params.id });
    if (!singleApplicant) {
      return res
        .status(400)
        .json({ message: "not found this applicant", status: "fail" });
    }
    return res.status(200).json(singleApplicant);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "fail" });
  }
};
// get single district applicants
exports.getSingleDistrictApplicants = async (req, res) => {
  try {
    const singleApplicant = await Applicant.findOne({
      districtId: req.params.id,
    });
    if (!singleApplicant) {
      return res
        .status(400)
        .json({
          message: "No Applicants found int this district",
          status: "fail",
        });
    }
    return res.status(200).json(singleApplicant);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "fail" });
  }
};

// delete a singleApplicant
exports.deleteApplicant = async (req, res) => {
  try {
    await Applicant.findByIdAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    return res
      .status(200)
      .json({ message: "Successfully deleted applicant🤣", status: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "fail" });
  }
};

// get national ID
exports.getNationalId = async (req, res) => {
  try {
    const data = await NationalID.findById(req.params.id);
    if (!data) {
      return res
        .status(400)
        .json({ message: "this National Id does not exist.", status: "fail" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get un available dates
exports.getUnavailableDates = async (req, res) => {
  try {
    const data = await UnAvailableDate.find({
      districtId: req.params.id,
    });

    return res.send(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};
// get  available dates
exports.getAvailableDates = async (req, res) => {
  try {
    const appointmentDate = moment(req.body.appointmentDate, "YYYY-MM-DD");
    console.log(new Date(req.body.appointmentDate));
    const data = await AvailableTime.find({
      districtId: req.body.id,
      "availableInfo.date": req.body.appointmentDate,
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
    const filtered = data?.map((info) => {
      return info?.availableInfo[0];
    });
    // console.log(filtered)
    return res.send(filtered);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

//update applicants
exports.updateApplicant = async (req, res) => {
  try {
    let takeDate = new Date();
    takeDate.setDate(takeDate.getDate() + 1);
    // const {image} = req.body
    // console.log(id)
    console.log(req.body.id)
    const imageRes = await cloudinary.uploader.upload(req.body.image, {
      folder: 'Images'
    });

  
    // console.log(takeDate)
    const updated = await Applicant.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          image: {       
              public_id:imageRes.public_id,
              url:imageRes.secure_url
          },
        
          arrivalDate: takeDate,
          // isApproved: true,
          // approvedDate: new Date(),
          ratio:  75
        },
      },
      { new: true }
    );
    if (!updated)
      return res
        .status(400)
        .json({
          message: "Error occurred while updating this applicant..",
          status: "fail",
        });
    const message = `Dear ${
      updated?.fullname
    }, your information has been approved successfully so, you will arrive the office at ${moment(
      takeDate
    ).format(
      "DD/MM/YYYY"
    )}, and you will receive email notification when the date is reached. Please arrive earlier to receive your passport, thanks.`;

    // const transport = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: true,
    //   auth: {
    //     user: "myfather8818@gmail.com",
    //     pass: "oqsvvrqmzgjhxuux",
    //   },
    // });
    // const emailOption = {
    //   from: "myfather88818@gmail.com",
    //   to: "engabdimalik8818@gmail.com",
    //   subject: emailBody,
    //   text: "Appointment Scheduled",
    // };

    // transport.sendMail(emailOption, (error, info) => {
    //   if (error) return error.message;

    //   console.log(`The email sent ${info.response}`);
    // });
    await axios.post(
      "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
        message +
        "&rec=" +
        updated?.phoneNumber +
        ""
    );
    return res
      .status(200)
      .json({ message: "application Approved successfully", status: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// scan finger print
exports.scanFingerprint = async(req,res)=>{
  try {
    // console.log(req.body)
    let takeDate = new Date();
    takeDate.setDate(takeDate.getDate() + 1);
    const {img,id} = req.body;
    // const base64Image = 'data:image/bmp;base64,Qk3mNAEAAAAAADYEAAAoAAAABAEAACwBAAABAAgAAAAAALAwAQAAAAAAAAAAAAABAAAAAQAAAAAAAAEBAQACAgIAAwMDAAQEBAAFBQUABgYGAAcHBwAI';
    // const filename = 'image';
    
    // convertBase64ToImage(img?.img, filename);
        const fingerImages = await cloudinary.uploader.upload(img.img, {
      folder: 'finger_images'
    });
    const updated = await Applicant.findByIdAndUpdate(
      id,
      {
        $set: {
          fingerPic: {       
            public_id:fingerImages.public_id,
            url:fingerImages.secure_url
        },
          fingerData:img.template,
          arrivalDate: takeDate,
          isApproved: true,
          approvedDate: new Date(),
          ratio:  75
        },
      },
      { new: true }
    );
    if (!updated)
      return res
        .status(400)
        .json({
          message: "Error occurred while approving the applicant finger..",
          status: "fail",
        });
        const message = `Dear ${
          updated?.fullname
        }, your information has been approved successfully so, you will arrive the office at ${moment(
          takeDate
        ).format(
          "DD/MM/YYYY"
        )}, and you will receive email notification when the date is reached. Please arrive earlier to receive your passport, thanks.`;
        await axios.post(
          "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
            message +
            "&rec=" +
            updated?.phoneNumber +
            ""
        );
    return res.status(200).json({message:"successfully registered finger", status: "success"});
  } catch (error) {
   return res.status(500).json({message:error.message,status:"fail"}); 
  }
}
// update appointment date
exports.updateAppointment = async (req, res) => {
  try {
    const districtData = await District.findOne({
      "districtInfo._id": req.body.districtId,
    });

    const districtInfo = districtData?.districtInfo?.filter((info) => {
      return info._id == req.body.districtId;
    });
    const app = await Applicant.findById({ _id: req.params.id });
    if (
      app?.appointmentDate ==
      moment(req.body.appointmentDate).format("YYYY-MM-DD")
    ) {
      return res
        .status(400)
        .json({
          message: "you cannot book an appointment at the same day.",
          status: "fail",
        });
    }
    if (app?.appointmentDate <= new Date()) {
      return res
        .status(400)
        .json({
          message: "your appointment was already reached.",
          status: "fail",
        });
    }
    console.log(req.body);
    let updatedAppointment = await Applicant.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          appointmentDate: req.body.appointmentDate,
          appointmentTime: req.body.appointmentTime,
          districtId: req.body.districtId,
          isCanceled: false,
        },
      },
      { $new: true }
    );
    await Appointment.findOneAndUpdate(
      { applicantId: req.params.id },
      {
        $set: {
          appointmentDate: req.body.appointmentDate,
          appointmentTime: req.body.appointmentTime,
          isCanceled: false,
        },
      },
      { $new: true }
    );
    if (!updatedAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment can not be updated", status: "fail" });
    }
    // Find the document that matches the districtId and appointmentDate
    const isExists = await AvailableTime.findOne({
      districtId: req.body.districtId,
      "availableInfo.date": req.body.appointmentDate,
      "availableInfo.time": req.body.appointmentTime,
    });

    if (isExists) {
      // Update the availableNumber field in the existing document
      const availableInfo = isExists.availableInfo[0];
      availableInfo.availableNumber = Math.max(
        0,
        availableInfo.availableNumber - 1
      );
      await isExists.save();
    } else {
      // Create a new document with the districtId and appointmentDate
      const newAvailableTime = new AvailableTime({
        districtId: req.body.districtId,
        availableInfo: [
          {
            date: req.body.appointmentDate,
            time: req.body.appointmentTime,
            availableNumber: districtInfo[0]?.hourlySlots - 1, // Set the initial availableNumber to 3 (or any other value you prefer)
          },
        ],
      });
      await newAvailableTime.save();
      const districtData = await DistrictWorkingHours.findOne({
        districtId: req.body.districtId,
      });
      const workingHours = districtData?.workingHours?.filter((data) => {
        console.log(data, "====");
        return data.startTime != req.body.appointmentTime;
      });
      // console.log(workingHours+"----------")
      workingHours.map(async (info) => {
        const newDates = new AvailableTime({
          districtId: req.body.districtId,
          availableInfo: [
            {
              date: req.body.appointmentDate,
              time: info.startTime,
              availableNumber: districtInfo[0]?.hourlySlots, // Set the initial availableNumber to 3 (or any other value you prefer)
            },
          ],
        });
        await newDates.save();
      });
    }
    let message = `Your Appointment has been updated successfully you will arrive  ${updatedAppointment?.appointmentDate} at ${updatedAppointment?.appointmentTime}`;
    await axios.post(
      "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
        message +
        "&rec=" +
        updatedAppointment?.phoneNumber +
        ""
    );
    return res
      .status(200)
      .json({ message: "Appointment updated successfully", status: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get specific appointment date from Applicants
exports.getSpecificAppointment = async (req, res) => {
  try {
    // console.log(moment(req.params.date).format('YYYY-MM-DD'))
    const all = await Applicant.findOne({
      appointmentDate: moment(req.params.date).format("YYYY-MM-DD"),
    });
    if (!all) {
      return res
        .status(400)
        .json({
          message: "not appointment found in this date",
          status: "fail",
        });
    }
    // await Applicant.updateMany({isCanceled:null},{isCanceled:false});
    // await Appointment.updateMany({isCanceled:null},{isCanceled:false});
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};
// cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const all = req.body.canceledAppointments?.map(async (element) => {
      await Appointment.findOneAndUpdate(
        { applicantId: element?._id },
        { $set: { isCanceled: true } }
      );
      await Applicant.findByIdAndUpdate(
        { _id: element?._id },
        { $set: { isCanceled: true } }
      );
      // const districtInfo = await District.findOne({"districtInfo._id":element?.districtId});
      // await AvailableTime.findOneAndUpdate({"availableInfo.date":moment(element?.appointmentDate).format("YYYY-MM-DD")},{$set:{
      //   "availableInfo.availableNumber":districtInfo?.hourlySlots,
      //   // "availableInfo.dailySlots":districtInfo?.dailySlots,

      // }},{new:true})
    });

    await Promise.all(all);
    return res
      .status(200)
      .json({
        message: "Appointments canceled successfully",
        status: "success",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// view applicant data
exports.viewApplicant = async (req, res) => {
  try {
    if (
      !req.params.appointmentNumber ||
      req.params.appointmentNumber === undefined
    ) {
      return res
        .stat(404)
        .json({ message: "Please enter appointment number", status: "fail" });
    }

    const appointmentInfo = await Appointment.findOne({
      appointmentNumber: req.params.appointmentNumber,
    });
    if (!appointmentInfo)
      return res
        .status(400)
        .json({ message: "this appointment does not exist", status: "fail" });
    console.log(appointmentInfo?._id);
    const info = await Applicant.findById({
      _id: appointmentInfo?.applicantId,
    });
    //  console.log(applicantData)
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get approve applicant information
exports.getPendingApplicants = async (req, res) => {
  try {
    if (
      (!req.params.nID || req.params.nID === "ALL") &&
      (!req.params.phoneNumber || req.params.phoneNumber === "ALL")
    ) {
      return res
        .status(400)
        .json({
          message:
            "please provide  your national identity or your phone number",
          status: "fail",
        });
    }
    if (
      req.params.nID &&
      req.params.phoneNumber === "ALL" &&
      req.params.nID !== "ALL"
    ) {
      console.log(req.params.nID);
      const data = await Applicant.findOne({
        nID: req.params.nID,
        isApproved: false,
      });
      if (!data) {
        return res
          .status(400)
          .json({
            message:
              "no applicant found with this national identity, please try again to get as phone number",
            status: "fail",
          });
      }
      return res.status(200).json(data);
    }
    if (
      (!req.params.nID ||
        req.params.nID === undefined ||
        req.params.nID === "ALL") &&
      req.params.phoneNumber &&
      req.params.phoneNumber !== "ALL"
    ) {
      const data = await Applicant.findOne({
        phoneNumber: req.params.phoneNumber,
        isApproved: false,
      });
      if (!data) {
        return res
          .status(400)
          .json({
            message:
              "no applicant found with this phone number, please try again to get as  National identity",
            status: "fail",
          });
      }
      return res.status(200).json(data);
    }
    // if(req.params.nID && req.params.phoneNumber){
    //   const data = await Applicant.findOne({phoneNumber:req.params.phoneNumber, nID:req.params.nID
    //     ,isApproved:false});
    //   if(!data) {
    //     return res.status(400).json({message:"no applicant found with this phone number, please try again to get as  National identity",status:"fail"})
    //   }
    //   return res.status(200).json({data})
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get all un approved applications
exports.getAllUnapprovedApplicants = async (req, res) => {
  try {
    let all;
    const user = await User.findOne({ _id: req.params.userId });
    if (user?.isAdmin == true) {
      all = await Applicant.find({ isApproved: false });
      return res.status(200).json(all);
    } else {
      all = await Applicant.find({
        districtId: req.params.districtId,
        isApproved: false,
      });
      return res.status(200).json(all);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get number of applicants who is registered this month
exports.getNumberOfRegisteredApplicantsThisMonth = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // Find customers registered within the current month
    const apps = await Applicant.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return res.status(200).json(apps);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get the registered applications from range
exports.getApplicantsFromRange = async (req, res) => {
  try {
    let from = new Date(req.params.startDate);
    let to = new Date(req.params.endDate);
    let fromDay = from.getDate();
    let fromMonth = from.getMonth();
    let fromYear = from.getFullYear();
    let toDay = to.getDate();
    let toMonth = to.getMonth();
    let toYear = to.getFullYear();
    // console.log(fromYear, fromMonth + 1, fromDay);
    // console.log(toYear, toMonth + 1, toDay);
    const startDate = new Date(fromYear, fromMonth, fromDay);

    const endDate = new Date(toYear, toMonth, toDay + 1);
    if (startDate == "Invalid Date") {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Start Date" });
    }
    if (endDate == "Invalid Date") {
      return res
        .status(500)
        .json({ success: false, message: "Invalid End Date" });
    }

    const applicants = await Applicant.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
    ]).sort({ createdAt: -1 });
    return res.status(200).json(applicants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.sendSmsToApplicants = async (req, res) => {
  try {
    let from = new Date();
    let to = new Date();
    let fromDay = from.getDate();
    let fromMonth = from.getMonth();
    let fromYear = from.getFullYear();
    let toDay = to.getDate();
    let toMonth = to.getMonth();
    let toYear = to.getFullYear();
    // console.log(fromYear, fromMonth + 1, fromDay);
    // console.log(toYear, toMonth + 1, toDay);
    const appointment = new Date(fromYear, fromMonth, fromDay);
    console.log(appointment);
    // const endDate = new Date(toYear, toMonth, toDay + 1);

    // Schedule the task to run every minute
    cron.schedule(
      "10 23 21 * * *",
      async () => {
        try {
          // Get the current date and time in the Africa/Nairobi timezone
          // const currentTime = moment().tz('Africa/Nairobi');

          // Check if the current time is 11:35:00 AM

          // Find customers whose card expiration is less than 5 days from the current date
          const applicants = await Applicant.aggregate([
            {
              $match: {
                appointmentDate: new Date(appointment),
              },
            },
          ]);
          // console.log(applicants)
          // const phone  =  616328920
          //   const message = `Dear Abdimalik Osman Hassan, your card is expiring soon. Please renew your card before .`;
          //   await axios.post(
          //     "https://tabaarakict.so/SendSMS.aspx?user=Asal&pass=TV@ccess2016&cont=" +
          //     message+
          //     "&rec=" +
          //     phone +
          //     ""
          //   )
          // Send SMS notifications to the expiring customers
          applicants?.forEach(async (applicant) => {
            const message = `Dear ${applicant?.fullname}, today is your appointment so you have to come today thanks.`;
            // const emailBody = `Dear ${newApplicant?.fullname}, your appointment has been scheduled with appointment number ${appointmentNumber}, with ${req.body.appointmentDate} at time ${req.body.appointmentTime}`;

            const transport = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 587,
              secure: true,
              auth: {
                user: "myfather8818@gmail.com",
                pass: "oqsvvrqmzgjhxuux",
              },
            });
            const emailOption = {
              from: "myfather88818@gmail.com",
              to: "engabdimalik8818@gmail.com",
              subject: message,
              text: "Appointment Scheduled",
            };

            transport.sendMail(emailOption, (error, info) => {
              if (error) throw error;

              console.log(`The email sent ${info.response}`);
            });
            // await axios.post(
            //   "https://tabaarakict.so/SendSMS.aspx?user=Asal&pass=TV@ccess2016&cont=" +
            //   message+
            //   "&rec="+
            //   customer.customer_info.customerPhone+
            //   ""
            //   );
          });
          console.log("SMS notifications sent to expiring customers.");
        } catch (err) {
          console.error(err);
        }
      },
      {
        scheduled: true,
        timezone: "Africa/Nairobi",
      }
    );

    console.log("Node.js application started and running in the background.");
  } catch (err) {
    console.error(err);
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.header("Content-Type", mime.getType(image.originalName));
    res.send(image.processedImage);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// get appointment
exports.getAppointmentByDate = async (req, res) => {
  try {
    const data = await Applicant.find({
      appointmentDate: moment(req.params.appointmentDate).format("YYYY-MM-DD"),
      districtId: req.params.districtId,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    // console.log(req.body.applicants)
    if (
      !req.body.applicants ||
      req.body.applicants == undefined ||
      req.body.applicants.length == 0
    ) {
      return res
        .status(400)
        .json({
          message: "no appointments available to cancel in this district",
          status: "fail",
        });
    }
    // console.log(req.body.applicants)
    let canceled;
    let promise = [];
    promise = req.body.applicants.map(async (app) => {
      console.log(app?.fullname);
      console.log(app?.phoneNumber);
      canceled = await Applicant.findOneAndUpdate(
        {
          appointmentDate: moment(app?.appointmentDate).format("YYYY-MM-DD"),
          districtId: app?.districtId,
        },
        { $set: { isCanceled: true } },
        { new: true }
      );
      await Appointment.findOneAndUpdate(
        {
          appointmentDate: moment(req.params.appointmentDate).format(
            "YYYY-MM-DD"
          ),
          districtId: app?.districtId,
        },
        {
          $set: {
            isCanceled: true,
          },
        },
        { new: true }
      );

      if (!canceled)
        return res
          .status(400)
          .json({
            message: "error occurred while cancelling the appointment",
            status: "fail",
          });
      let message = `Dear Applicant Your appointment was cancelled due to ${req.body.message} . Please update your appointment.`;
      console.log(
        "this message is for " +
          app?.fullname +
          " and phone nummber " +
          app?.phoneNumber
      );
      // console.log(canceled)
      // await axios.post(
      //   "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
      //   message+
      //   "&rec=" +
      //   app?.phoneNumber +
      //   "")
    });
    await Promise.all(promise);
    return res
      .status(200)
      .json({
        message: "successfully canceled the appointment.",
        status: "success",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// send message
exports.sendMessage = async (req, res) => {
  try {
    // console.log(req.body)
    const date = new Date();
    let t1 = date.getHours();
    if (t1 < 10) {
      t1 = "0" + t1;
    } else {
      t1 = t1;
    }

    const app = await Appointment.findOne({ applicantId: req.body.id });
    // console.log(t1 == app?.appointmentTime.split(":")[0]);

    console.log(t1 == app?.appointmentTime.split(":")[0]);
    console.log(
      moment(app?.appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD") +
        " " +
        moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    if (
      moment(app?.appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD") ==
      moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
    ) {
      if (t1 == app?.appointmentTime.split(":")[0]) {
        const empInfo = await Employee.find({
          districtId: app?.districtId,
          isManager: true,
        });
        let tell = 616328920;
        let number = empInfo[0]?.empPhone ? empInfo[0]?.empPhone : tell;
        await axios.post(
          "https://tabaarakict.so/SendSMS.aspx?user=Just&pass=Team@23!&cont=" +
            req.body.message +
            "&rec=" +
            number +
            ""
        );
        return res.status(200).json({ message: "message sent successfully." });
      } else {
        console.log(t1);
        return res
          .status(400)
          .json({
            message:
              "Your appointment time is not reached or has expired, you can send a message only at your appointment  time only.",
            status: "fail",
          });
      }
    } else {
      console.log("=---------------------------");
      return res
        .status(400)
        .json({
          message:
            "Your appointment Date is not reached or has expired, you can send a message only at your appointment  time only.",
          status: "fail",
        });
    }
    res.send("success");
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

// payment
exports.wafiAPiPayment = async (req, res) => {
  try {
    const apiwafiUSD = {
      schemaVersion: "1.0",
      requestId: "10111331033",
      timestamp: "client_timestamp",
      channelName: "WEB",
      serviceName: "API_PURCHASE",
      serviceParams: {
        merchantUid: "M0910291",
        apiUserId: "1000416",
        apiKey: "API-675418888AHX",
        paymentMethod: "mwallet_account",
        payerInfo: {
          accountNo: "252616328920",
        },
        transactionInfo: {
          referenceId: "12334",
          invoiceId: "7896504",
          amount: 0.01,
          currency: "USD",
          description: "Test USD",
        },
      },
    };

    let apiwafi = await axios.post("https://api.waafipay.net/asm", apiwafiUSD);
    if (apiwafi.data.responseMsg == "RCS_SUCCESS") {
      console.log("hello");
      const apiwafiUSD2 = {
        schemaVersion: "1.0",
        requestId: "14636832123312",
        timestamp: "20181231130916000",
        channelName: "WEB",
        serviceName: "API_PREAUTHORIZE_COMMIT",
        serviceParams: {
          apiUserId: 1004068,
          merchantUid: "M0911931",
          apiKey: "API-532593570AHX",
          transactionId: apiwafi.data.params.transactionId,
          description: "Commited",
          referenceId: "R75641560240445",
        },
      };
      let apiwafi2 = await axios.post(
        "https://api.waafipay.net/asm",
        apiwafiUSD2
      );

      if (!apiwafi2) {
        return res.status(500).json({ success: false });
      }
    
      
      console.log("apiwafi2 " + apiwafi2.data.responseMsg);
      return res
        .status(200)
        .json({ message: apiwafi2.data.responseMsg, success: true });
    } else {
      console.log("apiwafi2 " + apiwafi.data.responseMsg);
      return res
        .status(499)
        .json({ message: apiwafi.data.responseMsg, success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "fail" });
  }
};

function convertBase64ToImage(base64Image, filename) {
  const matches = base64Image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 image format');
  }

  const fileExtension = matches[1];
  const fileData = matches[2];
  const filePath = `/uploads/${filename}.${fileExtension}`;

  fs.writeFileSync(filePath, fileData, 'base64');

  console.log('Image saved successfully:', filePath);
}


// get applicants by date
exports.getApplicantList = async(req,res)=>{
  try {
    let start = moment(req.params.startDate).format("YYYY-MM-DD");
    let end = moment(req.params.endDate).format("YYYY-MM-DD")
    const userInfo = await User.findById(req.params.userId);
    // console.log(userInfo)
    if( userInfo?.isAdmin == true || userInfo?.isAdmin === true){
      console.log("here----------------",)
 
      const applicants = await Applicant.aggregate([
        {
          $match:{
            createdAt:{
              $gte: new Date(start),
              $lte: new Date(end)
            }
          }
        }
      ])
      return res.status(200).json(applicants)
    }else{
      const applicants = await Applicant.aggregate([
        {
          $match:{
            createdAt:{
              $gte: new Date(start),
              $lte: new Date(end)
            },
            districtId:userInfo?.districtId
          }
        }
      ])
      return res.status(200).json(applicants)
    }
  } catch (error) {
    return res.status(500).json({message: error.message,status:"fail"})
  }
}

// get applicants created today
exports.getApplicantsCreatedToday = async(req,res)=>{
  try {
    const userInfo = await User.findById(req.params.userId);
    // console.log(userInfo)
    if( userInfo?.isAdmin == true || userInfo?.isAdmin === true){
    // Get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00:000

  // Get the count of customers registered today
  // const applicants =await Applicant.find({ createdAt: { $gte: today } })
  const applicants =await Applicant.aggregate([
    {
      $match:{
        createdAt: { $gte: today },
        
      }
    },
      {
        $lookup:{
          from:"districts",
          localField:"districtId",
          foreignField:"districtInfo._id",
          as:"districtInfo"
        }
      },
      {
        $unwind:"$districtInfo"
      },
      {
        $unwind:"$districtInfo.districtInfo"
        
      },
      {
        $group: {
          _id: "$_id", 
          fullname: {$first: "$fullname"},
          motherName: {$first: "$motherName"},
          POB: {$first: "$POB"}, 
          DOB: {$first: "$DOB"},
          createdAt: {$first: "$createdAt"},
          appointmentDate: {$first: "$appointmentDate"},
          appointmentTime: {$first: "$appointmentTime"},
          isApproved: {$first: "$isApproved"},
          ratio: {$first: "$ratio"},
          occupation: {$first: "$occupation"},
          phoneNumber: {$first: "$phoneNumber"},
          districtName: {$first: "$districtInfo.districtInfo.districtName"}
        }
      },
      {
        $sort:{createdAt:-1}
      }
    ]);
  return res.status(200).json(applicants)
    }else{
          // Get the current date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to 00:00:00:000

      // Get the count of customers registered today
      // const applicants =await Applicant.find({ createdAt: { $gte: today },districtId:userInfo?.districtId });
      const applicants =await Applicant.aggregate([
        {
          $match:{
            createdAt: { $gte: today },
            districtId: userInfo?.districtId
          }
        },
          {
            $lookup:{
              from:"districts",
              localField:"districtId",
              foreignField:"districtInfo._id",
              as:"districtInfo"
            }
          },
          {
            $unwind:"$districtInfo"
            
          },
          {
            $unwind:"$districtInfo.districtInfo"
            
          },
          {
            $group: {
              _id: "$_id", 
              fullname: {$first: "$fullname"},
              motherName: {$first: "$motherName"},
              POB: {$first: "$POB"}, 
              DOB: {$first: "$DOB"},
              createdAt: {$first: "$createdAt"},
              appointmentDate: {$first: "$appointmentDate"},
              appointmentTime: {$first: "$appointmentTime"},
              isApproved: {$first: "$isApproved"},
              ratio: {$first: "$ratio"},
              occupation: {$first: "$occupation"},
              phoneNumber: {$first: "$phoneNumber"},
              districtName: {$first: "$districtInfo.districtInfo.districtName"}
            }
          },
          {
            $sort:{createdAt:-1}
          }
        ]);
      return res.status(200).json(applicants)

    }
  } catch (error) {
    return res.status(500).json({message: error.message,status:"fail"})
  }
}

// get applicants registered this month
exports.getApplicantCreatedThisMonth = async(req,res)=>{
  try {
    const userInfo = await User.findById(req.params.userId);
    const currentDate = new Date();

    // Create the start and end dates for the current month
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999); // Set the time to 23:59:59:999
    // console.log(userInfo)
    if( userInfo?.isAdmin == true || userInfo?.isAdmin === true){
      // Get the current date
 

  // Get the count of customers created in the current month
  // const applicants = await Applicant.find({  })
  const applicants =await Applicant.aggregate([
    {
      $match:{
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        districtId: userInfo?.districtId
      }
    },
      {
        $lookup:{
          from:"districts",
          localField:"districtId",
          foreignField:"districtInfo._id",
          as:"districtInfo"
        }
      },
      {
        $unwind:"$districtInfo"
      },
      {
        $unwind:"$districtInfo.districtInfo"
        
      },
      {
        $group: {
          _id: "$_id", 
          fullname: {$first: "$fullname"},
          motherName: {$first: "$motherName"},
          POB: {$first: "$POB"}, 
          DOB: {$first: "$DOB"},
          createdAt: {$first: "$createdAt"},
          appointmentDate: {$first: "$appointmentDate"},
          appointmentTime: {$first: "$appointmentTime"},
          isApproved: {$first: "$isApproved"},
          ratio: {$first: "$ratio"},
          occupation: {$first: "$occupation"},
          phoneNumber: {$first: "$phoneNumber"},
          districtName: {$first: "$districtInfo.districtInfo.districtName"}
        }
      },
      {
        $sort:{createdAt:-1}
      }
    ]);
  return res.status(200).json(applicants)
    }else{
      
      const applicants =await Applicant.aggregate([
        {
          $match:{
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            districtId: userInfo?.districtId
          }
        },
          {
            $lookup:{
              from:"districts",
              localField:"districtId",
              foreignField:"districtInfo._id",
              as:"districtInfo"
            }
          },
          {
            $unwind:"$districtInfo"
          },
          {
            $unwind:"$districtInfo.districtInfo"
            
          },
          {
            $group: {
              _id: "$_id", 
              fullname: {$first: "$fullname"},
              motherName: {$first: "$motherName"},
              POB: {$first: "$POB"}, 
              DOB: {$first: "$DOB"},
              createdAt: {$first: "$createdAt"},
              appointmentDate: {$first: "$appointmentDate"},
              appointmentTime: {$first: "$appointmentTime"},
              isApproved: {$first: "$isApproved"},
              ratio: {$first: "$ratio"},
              occupation: {$first: "$occupation"},
              phoneNumber: {$first: "$phoneNumber"},
              districtName: {$first: "$districtInfo.districtInfo.districtName"}
            }
          },
          {
            $sort:{createdAt:-1}
          }
        ]);
        
        return res.status(200).json(applicants)
    }
  } catch (error) {
    return res.status(500).json({message: error.message,status:"fail"})
  }
}
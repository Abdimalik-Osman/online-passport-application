const Applicant = require("../models/applicants");
const CID = require("../models/CID");
const Region = require("../models/region");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
exports.createApplicant = async (req, res) => {
  try {
    let passportExpirationData = new Date();
    passportExpirationData.setFullYear(
      passportExpirationData.getFullYear() + 5
    );

    const options = { timeZone: "Africa/Nairobi" };
    let appointmentDate = new Date().toLocaleString("en-US", options);
    appointmentDate = new Date(appointmentDate); // convert the date string to a Date object
    appointmentDate.setDate(appointmentDate.getDate() + 3);
    // appointmentDate.setHours(8, 0, 0); // set the time to 9:00 AM
    //    console.log(appointmentDate.toLocaleString('en-US', options));
    (appointmentDate.getDay() === 5 ? new Date(appointmentDate.setDate(appointmentDate.getDate() + 1)).toLocaleString('en-US', options) : appointmentDate.toLocaleString('en-US', options)) + "."
    let appointmentNumber = Math.floor(100000 + Math.random() * 900000);

    // get cid data
    const cIdData = await CID.findOne({
      cIdNumber: Number(req.body.CIDNumber),
    });
    // get region's data
    const regionalData = await Region.findOne({
      serialNumber: Number(req.body.regionalID),
    });
    if (regionalData) {
      if (regionalData.endDate < Date.now()) {
        return res
          .status(404)
          .json({ message: "Dhalashadaada waqtiga wuu ka dhacay..." });
      } else {
        if (cIdData) {
          if (
            cIdData.status === true ||
            cIdData.status == true ||
            cIdData.status == "true"
          ) {
            const newApplicant = new Applicant({
              fullname: regionalData?.fullName,
              motherName: req.body.motherName,
              phoneNumber: req.body.phoneNumber,
              DOB: regionalData?.DOB,
              sex: regionalData?.sex,
              POB: req.body.POB,
              occupation: req.body.occupation,
              applyingPlace: req.body.applyingPlace,
              // passportType:
              applyingDate: new Date(),
              expireDate: passportExpirationData,
              CIDNumber: req.body.CIDNumber,
              regionalID: req.body.regionalID,
            });
            await newApplicant.save();
            if (newApplicant) {
              const newAppointment = new Appointment({
                applicantId: newApplicant?._id,
                appointmentNumber: appointmentNumber,
                appointmentDate: appointmentDate,
              });
              await newAppointment.save();
              return res.status(201).json({
                message: "new Applicant has been created",
                newApplicant,
              });
            } else {
              return res
                .status(404)
                .json({
                  message: "error occurred while creating new applicant",
                });
            }
          } else {
            return res
              .status(404)
              .json({ message: "Fadlan adiga waxaa tahay dambiile.." });
          }
        } else {
          return res
            .status(404)
            .json({
              message:
                "CID numberkan majiro,Fadlan marka hore iska soo diiwan gali CID-da",
            });
        }
      }
    } else {
      return res
        .status(404)
        .json({
          message:
            "Dhalasho numberkan majiro, fadlan marka hore iska soo diiwan gali xarunta gobolka",
        });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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
        return res.status(200).json({message:"Successfully deleted applicant.."})
    } catch (err) {
        return res.status(500).json({ message:err.message});
    }
}
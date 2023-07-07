const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let appointmentSchema = new Schema(
  {
    applicantId: { type: mongoose.Schema.Types.ObjectId , ref:"Applicant",  default:null },
    phoneNumber:{type:String, default:null},
    appointmentNumber: { type: String, default:null},
    appointmentDate:{type:Date, default:null},
    appointmentTime:{type:String, default:null},
    isCanceled: { type:Boolean, default:false},
  },
  { timestamps: true }
);
// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
// appointmentSchema.plugin(autoIncrement.plugin, {
//   model: "CID",
//   field: "ID",
//   startAt: 1,
//   incrementBy: 1,
// });

// Define a pre-save hook to generate a unique sequence number for the appointmentNumber field
// appointmentSchema.pre('save', async function (next) {
//   try {
//     if (!this.appointmentNumber) {
//       // Find the highest appointmentNumber value in the database
//       const highestAppointment = await this.constructor.findOne().sort('-appointmentNumber').exec();
//       let newAppointmentNumber = 0;
//       if (highestAppointment) {
//         // Extract the numeric portion of the highest appointmentNumber and increment it
//         const lastNumber = parseInt(highestAppointment.appointmentNumber.toString().substr(4));
//         newAppointmentNumber = lastNumber + 1;
//       } else {
//         // If no appointments exist in the database, start with a default value of 1000
//         newAppointmentNumber = 1000;
//       }
//       // Set the appointmentNumber field to the new sequence number
//       this.appointmentNumber = `APPT${newAppointmentNumber.toString().padStart(4, '0')}`;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


const Appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = Appointment;
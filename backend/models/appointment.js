const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let appointmentSchema = new Schema(
  {
    applicantId: { type: mongoose.Schema.Types.ObjectId , ref:"Applicant",  default:null },
    appointmentNumber: { type: Number, default:null},
    appointmentDate:{type:Date, default:null}
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

const Appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = Appointment;
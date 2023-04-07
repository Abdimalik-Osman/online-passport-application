const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let applicantSchema = new Schema(
  {
    fullname:{type:String, default:null},
    motherName:{type:String, default:null},
    phoneNumber:{type:String, default:null},
    DOB:{type:Date, default:null},
    sex:{type:String, default:null},
    POB:{type:String, default:null},
    occupation:{type:String, default:null},
    applyingPlace:{type:String, default:null},
    // passportType:
    applyingDate:{type:Date, default:Date.now()},
    serialNO:{type:Number, default:null}, 
    status:{type:String, default:null},
    expireDate:{type:Date, default:null},
    CIDNumber:{type:Number, default:null},
    regionalID:{type:Number, default:null},
    isExpired:{type:Boolean, default:false},
    isTaken:{type:Boolean, default:false}
  },
  { timestamps: true }
);
applicantSchema.pre('save', function (next) {
  const options = {timeZone: 'Africa/Nairobi'};
  let now = new Date().toLocaleString('en-US', options);
  const daysElapsed = (now - this.applyingDate) / (1000 * 60 * 60 * 24);

  if (daysElapsed >= 7) {
    this.status = 'ready';
  } else if (daysElapsed >= 1) {
    this.status = 'OnProcess';
  } else {
    this.status = 'started';
  }

  next();
});
// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
// applicantSchema.plugin(autoIncrement.plugin, {
//   model: "Applicant",
//   field: "ID",
//   startAt: 1,
//   incrementBy: 1,
// });
const Applicant = mongoose.model("Applicant",applicantSchema)
module.exports = Applicant;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let applicantSchema = new Schema(
  {
    fullname:{type:String, default:null},
    motherName:{type:String, default:null},
    phoneNumber:{type:String, default:null},
    email:{type:String, default:null},
    emergencyContactNumber:{type:String, default:null},
    emergencyContactName:{type:String, default:null},

    DOB:{type:Date, default:null},
    sex:{type:String, default:null},
    POB:{type:String, default:null},
    occupation:{type:String, default:null},
    appointmentDate:{type:Date, default:null},
    maritalStatus:{type:String, default:null},
    // passportType:
    applyingDate:{type:Date, default:new Date()},
    appointmentTime:{type:String, default:"10:00",required:true},
    status:{type:String, default:null},
    expireDate:{type:Date, default:null},
    districtId:{type:Schema.Types.ObjectId,ref:"District", default:null},
    nID:{type:Number, default:null},
    type:{type:String, default:"Ordinary"},
    isExpired:{type:Boolean, default:false},
    isTaken:{type:Boolean, default:false},
    isApproved:{type:Boolean, default:false},
    image: {
      public_id: {
          type: String,
          // required: true
      },
      url: {
          type: String,
          // required: true
      }
  
  },

    arrivalDate:{type:Date, default:null},
    approvedDate:{type:Date, default:null},
    isCanceled:{type:Boolean, default:false},
    isReady:{type:Boolean, default:false},
    ratio :{type:Number, default:25},
    fingerPic:{ 
       public_id: {
      type: String,
      // required: true
  },
  url: {
      type: String,
      // required: true
  }},
    
    fingerData:{type:String, default:null},

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
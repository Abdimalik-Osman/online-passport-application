const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DistrictWorkingHoursSchema = new Schema({
    districtId:{type:Schema.Types.ObjectId, ref:"District",default:null},
    workingHours: [{
        startTime: {
          type: String,
          required: true
        },
        endTime: {
          type: String,
          required: true
        }
      }]
  },{timestamps:true});
  const DistrictWorkingHours = mongoose.model("DistrictWorkingHours",DistrictWorkingHoursSchema)
  module.exports = DistrictWorkingHours;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtSchema = new Schema({
  stateName:{type:String, default:null},
  districtInfo:[
    {
      districtName: {
        type: String,
        required: true
      },
    
      dailySlots: {
        type: Number,
        required: true,
        default: 50
      },
      hourlySlots: {
        type: Number,
        required: true,
        default: 5
      },
      startTime: {
        type: String,
        default:"08:00"
      },
      endTime: {type:String, default:"12:00"},
      officeName: {type:String, default:null},
      location: {type:String, default:null},
      contactNumber: {type:String, default:null},
    }
  ]
  
},{timestamps:true});
  const District = mongoose.model("District",districtSchema)
  module.exports = District;
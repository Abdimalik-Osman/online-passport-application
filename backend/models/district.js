const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtSchema = new Schema({
  districtName: {
    type: String,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true,
    default: 50
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
  }
},{timestamps:true});
  const District = mongoose.model("District",districtSchema)
  module.exports = District;
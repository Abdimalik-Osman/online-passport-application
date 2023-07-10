const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const holyDaySchema = new Schema({
    day: { type: String, required: true },
    month: { type: String, required: true },
    message: { type: String, required: true}
  },{timestamps:true});
  const HolyDay = mongoose.model("HolyDay",holyDaySchema)
  module.exports = HolyDay;
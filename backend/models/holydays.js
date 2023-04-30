const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const holyDaySchema = new Schema({
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    message: { type: String, required: true}
  },{timestamps:true});
  const HolyDay = mongoose.model("HolyDay",holyDaySchema)
  module.exports = HolyDay;
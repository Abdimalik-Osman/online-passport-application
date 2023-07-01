const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtHolydaySchema = new Schema({
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    message: { type: String, required: true},
    districtId: { type: Schema.Types.ObjectId,ref:"districts", required: true}
  },{timestamps:true});
  const DistrictHolyday = mongoose.model("DistrictHolyday",districtHolydaySchema)
  module.exports = DistrictHolyday;
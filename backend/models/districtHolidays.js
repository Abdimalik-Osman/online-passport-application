const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtHolydaySchema = new Schema({
    day: { type: String, default:null },
    month: { type: String, default:null },
    year: { type: String, default:null },
    message: { type: String, default:null},
    districtId: { type: Schema.Types.ObjectId,ref:"districts", default:null}
  },{timestamps:true});
  const DistrictHolyday = mongoose.model("DistrictHolyday",districtHolydaySchema)
  module.exports = DistrictHolyday;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let unAvailableDateSchema = new Schema(
  {
    districtId:{type:Schema.Types.ObjectId,ref:"districts", default:null},
    date:{type:Date, default:null}
  },
  { timestamps: true }
);

const UnAvailableDate = mongoose.model("UnAvailableDate",unAvailableDateSchema)
module.exports = UnAvailableDate
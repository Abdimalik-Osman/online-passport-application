const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let availableTimeSchema = new Schema(
  {
    districtId:{type:Schema.Types.ObjectId,ref:"districts", default:null},
    availableInfo:[
        {
            date:{type:String, default:null},
            time:{type:String, default:null},
            availableNumber:{type:Number, default:5}
        }
    ]
  },
  { timestamps: true }
);

const AvailableTime = mongoose.model("AvailableTime",availableTimeSchema)
module.exports = AvailableTime
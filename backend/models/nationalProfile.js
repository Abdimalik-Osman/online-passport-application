const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let nationalProfileSchema = new Schema(
  {
    ID: { type: Number, default:null},
    fullName: { type: String, default:null },
    motherName:{ type: String, default:null },
    serialNumber:{type:String, default:null },
    sex:{type:String, default:null},
    registerDate:{type:Date, default:null},
    endDate:{type:Date, default:null},
    DOB:{type:Date, default:null},
    POB:{type:String, default:null}
  },
  { timestamps: true }
);

const NationalID = mongoose.model("NationalID",nationalProfileSchema)
module.exports = NationalID
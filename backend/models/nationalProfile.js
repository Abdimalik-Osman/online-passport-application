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
    DOB:{type:Date, default:null}
  },
  { timestamps: true }
);
// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
// nationalProfileSchema.plugin(autoIncrement.plugin, {
//   model: "Gobolka",
//   field: "ID",
//   startAt: 1,
//   incrementBy: 1,
// });
const NationalID = mongoose.model("NationalID",nationalProfileSchema)
module.exports = NationalID
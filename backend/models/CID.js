const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let cidSchema = new Schema(
  {
    ID: { type: Number, required: true },
    fullName: { type: String, default:null },
    cIdNumber:{type:String, default:null },
    status:{type:Boolean, default:true},
    DOB:{type:Date, default:null}
  },
  { timestamps: true }
);
// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
// cidSchema.plugin(autoIncrement.plugin, {
//   model: "CID",
//   field: "ID",
//   startAt: 1,
//   incrementBy: 1,
// });

const CID = mongoose.model("CID", cidSchema)
module.exports = CID;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
let UserSchema = new Schema(
  {
   empId:{type:Schema.Types.ObjectId,ref:"employees", default:null},
   username:{type: String,default:null},
   password:{type: String,default:null},
   isAdmin:{type:Boolean,default:false},
   status:{type:String,default:false},
   districtId: { type:Schema.Types.ObjectId, ref:"districts", default: false},
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
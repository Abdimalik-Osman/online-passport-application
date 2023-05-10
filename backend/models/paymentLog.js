const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let paymentSchema = new Schema(
  {
    
    applicantId:{type: mongoose.Schema.Types.ObjectId,ref:"applicants", default:null},
    amount: {type: Number, default:100},
    type:{type:String, default:'Ordinary'}

  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentLog", paymentSchema)
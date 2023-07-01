const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let EmployeeSchema = new Schema(
  {
    empName: { type:String, default: null},
    empPhone: { type:String, default: null},
    sex: { type:String, default:"Male"},
    isManager: { type:Boolean, default: false},
    districtId: { type:Schema.Types.ObjectId, ref:"districts", default: false},
  },
  { timestamps: true }
);
const Employee = mongoose.model("Employee",EmployeeSchema)
module.exports = Employee;
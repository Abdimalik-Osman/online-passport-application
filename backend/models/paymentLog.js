const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");
let applicantSchema = new Schema(
  {
    ID: { type: Number, required: true },
  },
  { timestamps: true }
);
autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
applicantSchema.plugin(autoIncrement.plugin, {
  model: "Applicant",
  field: "ID",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Applicant", applicantSchema)
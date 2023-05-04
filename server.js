const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./backend/config/db');
require('dotenv').config();
const NationalID = require("./backend/routes/nationalProfile");
const CidRouter = require("./backend/routes/CID");
const ApplicantRouter = require("./backend/routes/applicants")
const DistrictRouter = require("./backend/routes/district")
// const HolyDayRouter = require("./backend/routes/holydays")
// const DistrictRouter = require("./backend/routes/district")
const HolyDayRouter = require("./backend/routes/holydays")
const EmployeeRouter = require("./backend/routes/employees")
const WorkingHoursRouter = require("./backend/routes/workingHours")

const PORT = process.env.PORT || 3000
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/gobolka",NationalID);
app.use("/api/cid",CidRouter);
app.use("/api/applicants",ApplicantRouter);
app.use("/api/districts",DistrictRouter);
app.use("/api/holydays",HolyDayRouter);
app.use("/api/employees",EmployeeRouter);
app.use("/api/workingHours",WorkingHoursRouter);


app.listen(PORT,()=>{
    console.log("server listening on port ",PORT);
})
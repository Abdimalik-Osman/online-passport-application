const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./backend/config/db');
require('dotenv').config();
const GobolkaRouter = require("./backend/routes/region");
const CidRouter = require("./backend/routes/CID");
const ApplicantRouter = require("./backend/routes/applicants")

const PORT = process.env.PORT || 3000
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/gobolka",GobolkaRouter);
app.use("/api/cid",CidRouter);
app.use("/api/applicants",ApplicantRouter);

app.listen(PORT,()=>{
    console.log("server listening on port ",PORT);
})
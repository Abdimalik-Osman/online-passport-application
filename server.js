const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./backend/config/db');
require('dotenv').config();
const GobolkaRouter = require("./backend/routes/region");

const PORT = process.env.PORT || 3000
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/gobolka",GobolkaRouter)
app.listen(PORT,()=>{
    console.log("server listening on port ",PORT);
})
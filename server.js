const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const connectDB = require('./backend/config/db');
require('dotenv').config();
const NationalID = require("./backend/routes/nationalProfile");
const CidRouter = require("./backend/routes/CID");
const ApplicantRouter = require("./backend/routes/applicants")
const DistrictRouter = require("./backend/routes/district")
const {sendSmsToApplicants} = require("./backend/controllers/applicants")
// const HolyDayRouter = require("./backend/routes/holydays")
// const DistrictRouter = require("./backend/routes/district")
const HolyDayRouter = require("./backend/routes/holydays")
const EmployeeRouter = require("./backend/routes/employees")
const WorkingHoursRouter = require("./backend/routes/workingHours")
const usersRouter = require("./backend/routes/users")
const menusRouter = require("./backend/routes/menus")
const DistrictHolydayRouter = require("./backend/routes/districtHolydays")
const moment = require("moment");
const sharp = require('sharp');
const Image = require('./backend/models/images');
const PORT = process.env.PORT || 3000
connectDB();
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors())
// MIDDLEWARE
// app.use(morgan('dev'));
// app.use(bodyParser.json({limit: '200mb'}));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     limit: '200mb',
//     extended: true
//     }));
// app.use(cookieParser());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '500mb',
  extended: true
}));
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001',"http://localhost:4000"],
  credentials:true,
  optionsSuccessStatus: 200,
}));
// Use this after the variable declaration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// });
// app.set('view engine' , 'ejs');
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny', {
    skip: (req, res) => {
      return !req.url.startsWith('/'); // Skip logging if the URL does not start with a slash
    }
  }))
// const upload = multer({ storage: storage });

// Log only the route
// app.use(morgan('tiny', {
//     skip: (req, res) => {
//       return !req.url.startsWith('/'); // Skip logging if the URL does not start with a slash
//     }
//   }))
//   const upload = multer({ dest: 'uploads/'});
// //   app.post('applicants/upload', upload.single('image'),  async (req, res) => {
// //     try {
// //     console.log("hereafter upload")
// //   // console.log(req.file)
// //   //   // Check if file is provided
// //   //   if (!req.file) {
// //   //     return res.status(400).json({ message: 'No file uploaded',status:'fail' });
// //   //   }

// //     // // Read and process the image
// //     // const processedImageBuffer = await sharp(req.file.path)
// //     //   .removeAlpha() // Remove the alpha channel to create a transparent background
// //     //   .toBuffer();

// //     // Create a new Image document and save it to MongoDB
// //     // const image = new Image({
// //     //   originalName: req.file.originalname,
// //     //   // processedImage: processedImageBuffer,
// //     // });
// //     // await image.save();

// //     // Respond with the ID of the saved image
// //    return res.status(201).json({message:"successfully uploaded the image",status:"success"});
// //   } catch (error) {
// //     console.error('Error processing image:', error);
// //     res.status(500).json({ message: 'Image processing failed' });
// //   }
// // })
// app.post('applicants/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     console.log('Uploaded file:', req.file);

//     // Process the uploaded file
//     // ...

//     // Send a JSON response indicating success
//     res.json({ message: 'Image uploaded successfully' });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ message: 'Image processing failed' });
//   }
// });
app.use("/api/profile",NationalID);
app.use("/api/cid",CidRouter);
app.use("/api/applicants",ApplicantRouter);
app.use("/api/districts",DistrictRouter);
app.use("/api/holydays",HolyDayRouter);
app.use("/api/employees",EmployeeRouter);
app.use("/api/workingHours",WorkingHoursRouter);
app.use("/api/users",usersRouter);
app.use("/api/menus",menusRouter);
app.use("/api/districtHolydays",DistrictHolydayRouter);

sendSmsToApplicants()
// takeDate = new Date();
//     takeDate.setDate(takeDate.getDate() + 1);;
//   console.log(takeDate)
app.listen(PORT,()=>{
    console.log("server listening on port ",PORT);
})
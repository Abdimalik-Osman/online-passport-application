const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonfile = require("jsonfile")
const simpleGit = require("simple-git")
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
// const random = require('random');
const sharp = require('sharp');
const Image = require('./backend/models/images');
const filePath = './test.json'
const PORT = process.env.PORT || 3000
connectDB();
const app = express();


// makeCommit(100)
// app.use(express.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(cors())
// MIDDLEWARE
// app.use(morgan('dev'));
// app.use(bodyParser.json({limit: '200mb'}));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     limit: '200mb',
//     extended: true
//     }));
// app.use(cookieParser());
// app.use(bodyParser.json({limit: '500mb'}));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   limit: '500mb',
//   extended: true
// }));
//const makeCommit = async(n) =>{
  //   const random = await import('random');
  //   if(n == 0) return simpleGit().push()
  //   x = random.default.int(0,54);
  //   y = random.default.int(0,6);
  // const DATE = moment().subtract(1,'d').add(x,'w').add(y,'d').format()
  // const data  = {
  //   date:DATE
  // }
  // // cosnole.log(DATE)
  // jsonfile.writeFile(filePath,data,()=>{
  // // git commit 
  // simpleGit().add([filePath]).commit(DATE,{'--date':DATE},makeCommit.bind(this,--n));
  // })
  // }
  
  // makeCommit(100)
  const makeCommit = async (n) => {
    const random = await import('random')
  
    if (n == 0) return simpleGit().push();
  
    const currentYear = moment().year(); // Get the current year
    const startDate = moment(`${currentYear}-01-01`); // January 1st of the current year
    const endDate = moment(`${currentYear}-03-31`); // March 31st of the current year
  
    let commitDate = startDate.clone().add(random.default.int(0, 89), 'days'); // 90 days in the first quarter
  
    if (commitDate.isAfter(endDate)) {
      commitDate = endDate;
    }
  
    const DATE = commitDate.format();
  
    const data = {
      date: DATE
    };
  
    console.log(DATE)
    jsonfile.writeFile(filePath, data, () => {
      simpleGit().add([filePath]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));
    });
  };
  
  makeCommit(100)
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials:true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}));

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

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, './client/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, './', 'client', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }
sendSmsToApplicants()
app.listen(PORT,()=>{
    console.log("server listening on port ",PORT);
})
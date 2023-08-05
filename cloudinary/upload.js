const cloudinaryModule =  require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: 'dfyqucupv',
  api_key: '891525115816651',
  api_secret: 'uzaO9qLIvfev-ZllIoPvlvCQzzY'
});

module.exports =  cloudinary;
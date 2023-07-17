const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  originalName: String,
  processedImage: Buffer,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('File', fileSchema);

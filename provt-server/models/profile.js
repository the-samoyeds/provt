const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Profile', profileSchema);

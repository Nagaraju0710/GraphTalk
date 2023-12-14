// models/dataModel.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  message: String,
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;

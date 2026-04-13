const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Holiday", holidaySchema);
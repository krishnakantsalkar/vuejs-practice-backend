const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  id: String,
  title: String,
  date: Date,
  content: String,
  updatedAt: Date,
  createdAt: Date,
  readonly: Boolean,
  computedDate: String,
});

let model = mongoose.model("notes", schema);

module.exports = model;

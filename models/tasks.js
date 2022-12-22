"use strict";
const mongoose = require("mongoose");

//create schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: [50, "Max length is 50"],
    required: [true, "must provide name"],
  },
  completed: {
    type: String,
    default: false,
  },
});

//create model: model is wrapper for schema, using model we use CRUD operation
module.exports = mongoose.model("Task", TaskSchema);

// use models in controllers

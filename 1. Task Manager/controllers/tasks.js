const Tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks }); // status code 200 is for successful post request
}); //asyncWrapper is used to handle the try catch block

const createTask = asyncWrapper(async (req, res) => {
  const createdTask = await Tasks.create(req.body);
  res.status(201).json({ task: createdTask }); // status code 201 is for successful post request
});

const getTask = asyncWrapper(async (req, res, next) => {
  const getoneTask = await Tasks.findOne({ _id: req.params.id });
  // getoneTask returns null if id not matched
  if (!getoneTask) {
    return next(createCustomError(`no data for id: ${req.params.id}`, 404))
  }

  res.status(200).json({ task: getoneTask });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const updateTask = await Tasks.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateTask) {
    return next(createCustomError(`no data for id: ${req.params.id}`, 404))
  }

  res.status(200).json({ task: updateTask });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const deleteTask = await Tasks.findOneAndDelete({ _id: req.params.id });

  if (!deleteTask) {
    return next(createCustomError(`no data for id: ${req.params.id}`, 404))
  }

  res.status(200).json({ task: deleteTask });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };

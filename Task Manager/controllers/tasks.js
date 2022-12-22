const Tasks = require("../models/tasks");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks }); // status code 200 is for successful post request
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    const createdTask = await Tasks.create(req.body);
    res.status(201).json({ task: createdTask }); // status code 201 is for successful post request
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getTask = async (req, res) => {
  try {
    const getoneTask = await Tasks.findOne({ _id: req.params.id });
    // getoneTask returns null if id not matched
    if (!getoneTask) {
      return res.status(404).json({ meg: `no data for id: ${req.params.id}` });
    }

    res.status(200).json({ task: getoneTask });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const updateTask = await Tasks.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new:true,
        runValidators:true
      }
    );
    if (!updateTask) {
      return res.status(404).json({ meg: `no data for id: ${req.params.id}` });
    }

    res.status(200).json({ task: updateTask });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Tasks.findOneAndDelete({ _id: req.params.id });

    if (!deleteTask) {
      return res.status(404).json({ meg: `no data for id: ${req.params.id}` });
    }

    res.status(200).json({task: deleteTask});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };

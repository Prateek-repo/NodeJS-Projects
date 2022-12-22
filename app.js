const connectDB = require("./db/connect");
require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);


const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected with DB.......");
    app.listen(port, () => {
      console.log(`app is running at ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

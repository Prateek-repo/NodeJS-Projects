require("dotenv").config();
require('express-async-errors')
const notFoundMiddleware = require("./middleware/not-found");
const errorMsgHandler = require("./middleware/error-handler");
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


const express = require("express");
const app = express();

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("bulla");
});

app.use('/api/v1/products', productsRouter)

// products route

// middleware

app.use(notFoundMiddleware);
app.use(errorMsgHandler);

// PORT

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect the db
    await connectDB(process.env.MONGO_URI)
    //listen server
    app.listen(PORT, console.log("I am fucking listening at", PORT));
  } catch (e) {
    console.log(error)
  }
};

start()

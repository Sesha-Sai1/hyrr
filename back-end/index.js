const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const port = 9988;

const router = require("./routes/MainRouter");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://seshasaikothapalli1350:seshasai1@cluster0.jzw30ha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to mongoDB", err);
  });

app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

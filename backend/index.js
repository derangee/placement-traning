const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const createProductRoutes = require("./routes/productRoutes");

//middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://raghuveermustimalla_db_user:162026@cluster0.n2i25s2.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

app.use("/", createProductRoutes(upload));

app.listen(3002, () => {
  console.log("server .started");
});

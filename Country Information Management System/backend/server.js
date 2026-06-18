require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const connectDB = require("./config/database");
require("./config/passport");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Initialize Passport
app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/countries", require("./routes/countryRoutes"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

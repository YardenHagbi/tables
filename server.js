require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");

const app = express();
const PORT = process.env.PORT || 3500;

connectDB(); //DB
app.use(cors()); //CORS
app.use(express.json()); //JSON
app.use(express.urlencoded({ extended: false })); //Handle urlencoded form data

//Routes
app.use("/user", require("./routes/user"));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

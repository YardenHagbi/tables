require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./middleware/dbConnect");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors()); //CORS
app.use(express.json()); //JSON
app.use(express.urlencoded({ extended: false })); //Handle urlencoded form data

app.use("/api", require("./api"));

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => {
    console.error("An error has occurred while starting the app");
    console.error(error);
  });

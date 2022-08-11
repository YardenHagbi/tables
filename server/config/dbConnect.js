const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = { connectDB };

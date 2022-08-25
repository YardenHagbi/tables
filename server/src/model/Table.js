const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdDate: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  section: { type: String },
  defaultPrice: { type: Number },
  reservations: [{ type: mongoose.Types.ObjectId, ref: "Reservation" }],
  status: { type: Number, enum: Status, default: Status.ACTIVE },
});

module.exports = mongoose.model("Table", tableSchema);

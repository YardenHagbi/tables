const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdDate: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  section: { type: String },
  defaultPrice: { type: Number },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  status: { type: Number, enum: Status, default: Status.ACTIVE },
});

module.exports = mongoose.model("Table", tableSchema);

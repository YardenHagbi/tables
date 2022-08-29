const mongoose = require("mongoose");
const { ReservationStatus } = require("./enums");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  status: { type: Number, enum: ReservationStatus, required: true },
  date: { type: Date, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const clientSchema = new Schema({
  name: { type: String },
  phone: { type: String },
});

const paymentSchema = new Schema({
  name: { type: String },
  amount: { type: Number, required: true },
});

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdDate: { type: Date, default: Date.now() },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  table: { type: Schema.Types.ObjectId, ref: "Table", required: true },
  client: clientSchema,
  status: { type: Number, enum: ReservationStatus, required: true },
  actions: [actionSchema],
  products: [productSchema],
  payments: [paymentSchema],
  hourlyRate: { type: Number },
  totalPrice: { type: Number },
});

module.exports = mongoose.module("Reservation", reservationSchema);

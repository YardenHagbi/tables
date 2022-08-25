const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { UserRole, UserSubscription, Status } = require("./enums");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
  role: { type: Number, enum: UserRole, default: UserRole.USER },
  subscription: {
    type: Number,
    enum: UserSubscription,
    default: UserSubscription.TRIAL,
  },
  status: { type: Number, enum: Status, default: Status.ACTIVE },
});

module.exports = mongoose.model("User", userSchema);

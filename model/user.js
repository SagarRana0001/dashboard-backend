const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: Number, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true, trim: true },
  img: { type: String },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

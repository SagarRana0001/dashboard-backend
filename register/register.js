const userModel = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const transporter = require("../config/emailConfig.js");

const userRegistration = async (req, resp) => {
  const { name, email, password, confirm_password, gender, phone, status } =
    req.body;

  const user = await userModel.findOne({ email: email });

  if (user) {
    resp.send({ status: "failed", message: "Email already exists" });
  } else {
    if (
      name &&
      email &&
      password &&
      confirm_password &&
      phone &&
      gender &&
      status
    ) {
      if (password === confirm_password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = userModel({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            gender: gender,
            status: status,
          });
          await doc.save();
          const saved_user = await userModel.findOne({ email: email });

          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          resp.status(201).send({
            status: "success",
            message: "Registration success",
            token: token,
            user: saved_user,
          });
        } catch (error) {
          resp.send({ status: "failed", message: "unable to register" });
        }
      } else {
        resp.send({ status: "failed", message: "password not matched" });
      }
    } else {
      resp.send({ status: "failed", message: "Allfields are required" });
    }
  }
};

module.exports = userRegistration;

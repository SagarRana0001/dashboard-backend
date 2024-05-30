const userModel = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await userModel.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          resp.send({
            status: "success",
            message: "Login.. Success",
            token: token,
            user: user,
          });
        } else {
          resp.send({
            status: "failed",
            message: "Email or Password is not valid",
          });
        }
      } else {
        resp.send({
          status: "failed",
          message: "you are not a Registerd user",
        });
      }
    } else {
      resp.send({ status: "failed", message: "All feild are requird" });
    }
  } catch (error) {
    console.log(error);
    resp.send({ status: "failed", message: "unable.login." });
  }
};

module.exports = userLogin;

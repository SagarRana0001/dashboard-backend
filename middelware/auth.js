const jwt = require("jsonwebtoken");
const userModel = require("../model/user.js");

let checkUserAuth = async (req, resp, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await userModel.findById(userID).select("-password");

      next();
    } catch (error) {
      console.log(error);
      resp
        .status(401)
        .send({ status: "failed", message: "Unauthorized user , no Token" });
    }
  }
  if (!token) {
    resp
      .status(401)
      .send({ status: "failed", message: "Unauthorized user , no Token" });
  }
};
module.exports = checkUserAuth;

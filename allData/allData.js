const userModel = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const allData = async (req, resp) => {
  const user = await userModel.find();
  if (user) {
    resp.send(user);
  } else {
    resp.send("error");
  }
};
module.exports = allData;

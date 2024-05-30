const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../model/user.js");
const userUpdate = async (req, resp) => {
  const { id } = req.query;
  let userdata = {
    ...req.body,
  };
  if (id) {
    try {
      const storeduser = await userModel.findOne({ _id: id });
      if (!storeduser) {
        resp.status(400).send({
          status: "error",
          message: "Email dosent exist",
        });
      }
      await userModel.findByIdAndUpdate(id, userdata);
      const user = await userModel.findOne({ _id: id });

      resp.status(200).send({
        status: "success",
        message: "updated successfully",
        user,
      });
    } catch (err) {
      console.log(err);
      resp.status(400).send({
        status: "failed",
        message: "could not update the user",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "All fields are required",
    });
  }
};
module.exports = userUpdate;

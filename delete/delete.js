const userModel = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDelete = async (req, resp) => {
  const { id } = req.query;

  if (id) {
    try {
      await userModel.deleteOne({ _id: id });

      resp.status(200).send({
        status: "success",
        message: "Permanent deleted",
        msgcolor: "success",
      });
    } catch {
      resp.status(400).send({
        status: "failed",
        message: "could not delete the user",
        msgcolor: "error",
      });
    }
  } else {
    resp.send({
      status: "failed",
      message: "id not defined",
      msgcolor: "error",
    });
  }
};

module.exports = userDelete;

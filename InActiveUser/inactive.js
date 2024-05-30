const userModel = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CsvParser = require("json2csv").Parser;
const inActiveUploadData = async (req, res) => {
  try {
    let users = [];
    let userData = await userModel.find({});
    userData.forEach((user) => {
      if (!user.isActive) {
        const { id, name, email, status, gender } = user;
        users.push({ id, name, email, status, gender });
      }
    });
    const csvFields = ["Id", "Name", "Email", "Status", "gender"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment:filename=usersData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: "failed", message: "Cannot Upload File" });
  }
};
module.exports = inActiveUploadData;

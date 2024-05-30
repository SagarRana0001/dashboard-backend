const userModel = require("../model/user.js");
const CsvParser = require("json2csv").Parser;
const uploadData = async (req, res) => {
  try {
    let users = [];
    let userData = await userModel.find({});
    userData.forEach((user) => {
      const { id, name, email, status, gender } = user;
      users.push({ id, name, email, status, gender });
    });
    const csvFields = ["Id", "Name", "Email", "Status", "Gender"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment:filename=usersData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: "failed", message: "Cannot Upload File" });
  }
};
module.exports = uploadData;

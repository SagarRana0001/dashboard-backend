const userModel = require("../model/user.js");
const multer = require("multer");
const csv = require("csvtojson");
const bcrypt = require("bcrypt");
const uploadCsvData = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      statue: "failed",
      message: "No file uploaded",
    });
  }
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      if (jsonObj.length === 0) {
        return res.send({
          statue: "failed",
          message: "csv file is empty",
        });
      }
      const requiredKeys = [
        "name",
        "email",
        "phone",
        "password",
        "status",
        "gender",
      ];
      for (const obj of jsonObj) {
        for (let key of requiredKeys) {
          if (!(key in obj)) {
            return res.send({
              status: "failed",
              message: `${key} is missing in csv data`,
            });
          }
        }
      }
      const handleAddUsers = async () => {
        const users = [];
        for (let user of jsonObj) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(user["password"], salt);
          users.push({
            name: user["name"],
            email: user["email"],
            phone: user["phone"],
            status: user["status"],
            gender: user["gender"],
            password: hashPassword,
          });
        }
        userModel
          .insertMany(users)
          .then(() => {
            res.status(200).send({
              status: "success",
              message: "Successfully Uploaded!",
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Failed to upload data",
              error,
              status: "failed",
            });
          });
      };
      handleAddUsers();
    })
    .catch((error) => {
      res.status(500).send({
        message: "Failed to parse CSV",
        error,
        status: "failed",
      });
    });
};
module.exports = uploadCsvData;

const mongoose = require("mongoose");
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "UserData",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("connected sucessfull");
  } catch (error) {
    console.log("error");
  }
};
module.exports = connectDB;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRegistration = require("../register/register.js");
const userLogin = require("../login/login.js");
const allData = require("../allData/allData.js");
const inActiveUploadData = require("../InActiveUser/inactive.js");
const uploadData = require("../uploadData/upload.js");
const uploadImg = require("../uploadData/uploadImg.js");
const activeUploadData = require("../activeUser/active.js");
const userDelete = require("../delete/delete.js");
const checkUserAuth = require("../middelware/auth.js");
const userUpdate = require("../update/updateProfile.js");
const uploadCsvData = require("../uploadData/importCsv.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const incomingfileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return cb(new Error("Please upload a CSV file"), false);
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter: incomingfileFilter,
});

router.use("/changepassword", checkUserAuth);
router.use("/loggedUser", checkUserAuth);
router.use("/update", checkUserAuth);
router.use("/profile", checkUserAuth);

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.delete("/delete?:id", userDelete);
router.get("/alldata", allData);
router.get("/inactive", inActiveUploadData);
router.get("/active", activeUploadData);
router.get("/uploaddata", uploadData);
router.put("/upload?:id", uploadImg);
router.put("/update?:id", userUpdate);
router.post("/upload-data", upload.single("file"), uploadCsvData);

module.exports = router;

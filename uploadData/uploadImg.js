const userModel = require("../model/user.js");
const atob = require("atob");
const uploadImg = async (req, res) => {
  const { id, img } = req.body;
  const decodedImg = atob(img);
  if (decodedImg.length <= 200000) {
    if (id && img) {
      let data = await userModel.updateOne(
        { _id: id },
        {
          $set: { img: img },
        }
      );
      res.status(200).send({
        status: "success",
        message: "Image uploaded successfully",
        img: img,
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", message: "error in uploading the image" });
    }
  } else {
    res
      .status(400)
      .send({ status: "failed", message: "Image size is too big" });
  }
};
module.exports = uploadImg;

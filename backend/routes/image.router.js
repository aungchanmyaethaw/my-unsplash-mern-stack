const {
  getImages,
  uploadImage,
  deleteImage,
} = require("../controllers/image.controllers");
const upload = require("../middlewares/cloudinaryUpload");
const router = require("express").Router();

router.get("/upload", getImages);

router.post("/upload", upload.any(), uploadImage);

router.delete("/upload/:id", deleteImage);

module.exports = router;

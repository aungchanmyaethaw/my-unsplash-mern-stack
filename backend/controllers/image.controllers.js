require("dotenv").config();
const Images = require("../models/images.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files[0].path);

    await Images.create({
      public_id: result.public_id,
      image_url: result.secure_url,
      label: req.body.label,
    });
    res.status(201).json({ msg: "Image uploaded SuccessFully!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getImages = async (req, res) => {
  const { q } = req.query;

  try {
    const data = await Images.find({
      label: { $regex: q || "", $options: "i" },
    });
    res.status(200).json({ images: data });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    await Images.deleteOne({ _id: id });
    res.status(200).json({ msg: "Image deleted Successfully!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getImages, uploadImage, deleteImage };

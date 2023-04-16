const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = Schema(
  {
    public_id: {
      type: String,
      require: true,
    },
    image_url: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const image = mongoose.model("Image", imageSchema);

module.exports = image;

const mongoose = require("mongoose");
const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    durationSec: { type: Number, required: true, min: 1 },
    license: {
      type: String,
      enum: ["original", "cc-by", "public-domain"],
      default: "original",
    },
    downloads: { type: Number, default: 0 },
    file: {
      url: { type: String, trim: true },
      downloadUrl: { type: String, trim: true },
      pathname: { type: String, trim: true },
      contentType: { type: String, trim: true },
      size: { type: Number, min: 0 },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Track", trackSchema);

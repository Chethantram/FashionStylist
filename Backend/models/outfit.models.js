import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "tops",
      "bottoms",
      "outerwear",
      "shoes",
      "accessories",
      "others",
    ],
  },
  color: {
    type: String, // hex color code (e.g. "#1e3a8a")
    match: /^#([0-9A-F]{3}){1,2}$/i,
  },
  season: {
    type: String,
    enum: ["summer", "winter", "spring", "fall", "all-season"],
    default: "all-season",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

export default mongoose.model("Outfit", outfitSchema);

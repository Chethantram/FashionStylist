import mongoose from "mongoose";

const clothingItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    category: {
      type: String,
      enum: ["tops", "bottoms", "shoes", "accessories"],
      required: true,
    },
    subcategory: { type: String, required: true },
    brand: { type: String, required: true },
    occasion: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    link: { type: String, required: true },
    favorite: { type: Boolean, default: false }, // ✅ favorite toggle
  },
  { timestamps: true }
);

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

export default ClothingItem;

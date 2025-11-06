// models/User.js
import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  // Selected outfit or style images (like 'boardroom', 'weekend-brunch')
  selectedImages: {
    type: [String],
    default: [],
  },

  // Body type selection (e.g., 'pear', 'rectangle', etc.)
  selectedBodyType: {
    type: String,
    default: "",
  },

  // Selected color preferences
  selectedColors: {
    favorites: { type: [String], default: [] },
    maybe: { type: [String], default: [] },
    avoid: { type: [String], default: [] },
  },

  // Liked outfits (like ['minimalist-chic', 'bohemian-free'])
  likedOutfits: {
    type: [String],
    default: [],
  },

  // Disliked outfits (like [])
  dislikedOutfits: {
    type: [String],
    default: [],
  },

  // Budget and shopping behavior data
  budgetData: {
    budget: { type: String, default: "budget-friendly" }, // matches 'budget: budget-friendly'
    frequency: { type: String, default: "" }, // shopping frequency (empty if not selected)
    priorities: { type: [String], default: [] }, // list of user priorities
    monthlyBudget: { type: Number, default: 100 }, // user’s monthly budget
  },
});

const OutfitItemSchema = new mongoose.Schema({
  _id: String, // product id
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
});

const OutfitSchema = new mongoose.Schema({
  tops: OutfitItemSchema,
  bottoms: OutfitItemSchema,
  shoes: OutfitItemSchema,
  accessories: OutfitItemSchema,
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, default: "" }, // optional avatar url
    assessmentData: { type: AssessmentSchema, default: () => ({}) },
    aiStyleProfile: { type: Object, default: null }, // 🟩 store AI result
    savedOutfits: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ClothingItem" },
    ], // 🟩 add this

    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

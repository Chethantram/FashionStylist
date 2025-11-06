import ClothingItem from "../models/clothes.models.js";
import User from "../models/user.models.js";

export const addClothingItem = async (req, res) => {
  try {
    const { name, category, imageUrl, price, link, favorite } = req.body;
    if (!name || !category || !imageUrl || price == null || !link) {
      return res
        .status(400)
        .json({ message: "All fields except favorite are required" });
    }
    const newItem = new ClothingItem({
      name,
      category,
      imageUrl,
      price,
      link,
      favorite,
    });
    await newItem.save();
    res
      .status(201)
      .json({ message: "Clothing item added successfully", data: newItem });
  } catch (error) {
    console.error("Error adding clothing item:", error);
    res.status(500).json({
      message: "Server error while adding clothing item",
      error: error.message,
    });
  }
};

export const getAllClothingItems = async (req, res) => {
  try {
    const items = await ClothingItem.find();
    res.status(200).json({ data: items });
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching clothing items",
        error: error.message,
      });
  }
};

export const getAllClothingItemsForShopping = async (req, res) => {
  try {
    const { 
      category, 
      brand, 
      occasion, 
      minPrice, 
      maxPrice, 
      sort, 
      page = 1, 
      limit = 20 
    } = req.query;


    const filter = {};

if (category) filter.category = { $in: category.split(",") };
if (brand) filter.brand = { $in: brand.split(",") };
if (occasion) filter.occasion = { $in: occasion.split(",") };
if (req.query.names) filter.name = { $in: req.query.names.split(",") };

if (minPrice || maxPrice) {
  filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
}

    // 🧠 Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // 🧠 Build query with filters + pagination
    let query = ClothingItem.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    // 🧩 Sorting logic
    if (sort === "price-low") query = query.sort({ price: 1 });
    if (sort === "price-high") query = query.sort({ price: -1 });
    if (sort === "newest") query = query.sort({ createdAt: -1 });

    // 🧩 Execute query
    const items = await query.exec();

    // 📊 Get total count (for frontend pagination)
    const totalCount = await ClothingItem.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    // ✅ Send response
    res.status(200).json({
      success: true,
      count: items.length,
      totalCount,
      totalPages,
      currentPage: parseInt(page),
      hasMore: parseInt(page) < totalPages,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching clothing items",
      error: error.message,
    });
  }
};


export const getClothingItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ClothingItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Clothing item not found" });
    }
    res.status(200).json({ data: item });
  } catch (error) {
    console.error("Error fetching clothing item:", error);
    res.status(500).json({
      message: "Server error while fetching clothing item",
      error: error.message,
    });
  }
};
export const addFavorite = async (req, res) => {
  try {
    const { userId } = req; // Make sure this exists (middleware)
    const { itemId } = req.body;


    // 🟩 Find user and item directly
    const user = await User.findById(userId);
    const item = await ClothingItem.findById(itemId).lean(); // <- .lean() gives plain JS object, prevents re-validation issues

    if (!user || !item) {
      return res.status(404).json({ message: "User or item not found" });
    }

    // 🟩 Toggle favorite directly in DB (no .save(), avoids validation)
    const updatedItem = await ClothingItem.findByIdAndUpdate(
      itemId,
      { $set: { favorite: !item.favorite } },
      { new: true }
    );

    // 🟩 Update user's savedOutfits
    if (updatedItem.favorite) {
      if (!user.savedOutfits.includes(updatedItem._id)) {
        user.savedOutfits.push(updatedItem._id);
      }
    } else {
      user.savedOutfits = user.savedOutfits.filter(
        (id) => id.toString() !== updatedItem._id.toString()
      );
    }

    await user.save();

    res.json({
      message: updatedItem.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      favorite: updatedItem.favorite,
      savedOutfits: user.savedOutfits,
    });
  } catch (error) {
    console.error("Error in addFavorite:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

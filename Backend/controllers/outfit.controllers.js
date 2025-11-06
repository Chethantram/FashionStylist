import Outfit from "../models/outfit.models.js";

export const addOutfit = async (req, res) => {
  try {
    const {name,brand,category,color,season,price,tags,image} = req.body;
    
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newOutfit = new Outfit({
      name,
      brand,
      category,
      color,
      season,
      price,
      tags,
      image,
    });
    newOutfit.userId = userId;
    await newOutfit.save();

    res.status(201).json({
      success: true,
      message: "Outfit added successfully",
      data: newOutfit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOutfits = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const outfits = await Outfit.find({ userId: userId });
    res.status(200).json({ success: true, data: outfits });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

import { validationResult } from "express-validator";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success:false, message: "Please enter all required fields" });
    }
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({success:false, message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed });
    await user.save();

    // return tokens and user profile (without password)
    res.json({
      user,
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({success:false, message: "Please enter all required fields" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({success:false, message: "Invalid credentials" });

    const token = createToken(user);
    if (!token)
      return res.status(500).json({success:false, message: "Token generation failed" });

    // ✅ Secure cookie setup
    res.cookie("token", token, {
        httpOnly: true,
        // secure: false, // true in production (https)
        // sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          assessmentData: user.assessmentData,
        },
        message: "Login successful",
        success: true,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message: "Server error" });
  }
};


const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

export const logoutUser = async (req, res) => {
  try {
    const {token } = req.cookies;
    if (!token) return res.json({success:true, message: "Logged out" });
    return res.clearCookie("token").json({ message: "Logged out successfully", success: true });
  } catch (err) {
    // if token expired or invalid just return logged out
    return res.json({success:false, message: "Logged out" });
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = req.userId
      ? await User.findById(req.userId).select("-password")
      : null;
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const avatar = req.file ? req.file.filename : undefined;
    const { name } = req.body;

    if (!userId) return res.status(401).json({success:false, message: "Unauthorized" });

    const updateFields = { name };
    if (avatar) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  }
  catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ success:false,message: "Server error" });
  }
};


export const updateAssessment = async (req, res) => {
  try {
    const { userId } = req; // comes from auth middleware
    const { assessmentData } = req.body;

    if (!userId) return res.status(401).json({success:false, message: "Unauthorized" });

    const user = await User.findByIdAndUpdate(
      userId,
      { assessmentData },
      { new: true }
    ).select("-password");

    res.json({
      message: "Assessment saved successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.error("Error updating assessment:", err);
    res.status(500).json({ success:false,message: "Server error" });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user has actually completed the assessment
    const data = user.assessmentData;

    const hasAssessment =
      data &&
      (data.selectedImages?.length > 0 ||
        data.selectedBodyType ||
        data.selectedColors?.favorites?.length > 0 ||
        data.likedOutfits?.length > 0 ||
        data.budgetData?.budget);

    if (!hasAssessment) {
      // ⛔ Don't send empty data to frontend
      return res.json({ success: true, assessmentData: null });
    }

    return res.json({ success: true, assessmentData: user.assessmentData });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const fetchingUserId = async(req,res) =>{
  try {
    const token = req?.cookies?.token;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return null;
    res.status(200).json({ userId: decoded.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}


export const updateAIStyle = async (req, res) => {
  try {
    const { aiStyleProfile } = req.body;
    const {userId} = req;
    await User.findByIdAndUpdate(userId, { aiStyleProfile });
    res.json({ success: true, message: "AI style profile saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getAIStyle = async (req, res) => {
  try {
    const {userId} = req;
    if(!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    const user = await User.findById(userId).select("aiStyleProfile");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, aiStyleProfile: user.aiStyleProfile });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const saveOutfit = async (req, res) => {
  try {
    const { userId } = req;
    const { product, isWishlisted } = req.body;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const productId = product?._id || product?.id;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Invalid product data" });
    }

    // Ensure savedOutfits is clean (no nulls)
    user.savedOutfits = user.savedOutfits.filter((item) => item && item._id);

    if (isWishlisted) {
      // Add product if not already in list
      const exists = user.savedOutfits.some(
        (item) => item._id.toString() === productId.toString()
      );
      if (!exists) {
        user.savedOutfits.push({
          _id: productId,
          name: product.name,
          brand: product.brand,
          imageUrl: product.imageUrl,
          price: product.price,
          category: product.category,
          subcategory: product.subcategory,
        });
      }
    } else {
      // Remove product
      user.savedOutfits = user.savedOutfits.filter(
        (item) => item._id.toString() !== productId.toString()
      );
    }

    await user.save();
    res.json({ success: true, savedOutfits: user.savedOutfits });
  } catch (error) {
    console.error("Wishlist update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const fetchFavorite = async (req, res) => {
  try {
    const { userId } = req;

    if(!userId) return res.json({success:false,message : "UserId is required"})
    const user = await User.findById(userId).populate("savedOutfits");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({success: true,product : user.savedOutfits});
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
}



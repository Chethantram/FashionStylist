import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import { fetchFavorite, fetchingUserId, getAIStyle, getAssessment, getProfile, loginUser, logoutUser, registerUser, saveOutfit, updateAIStyle, updateAssessment, updateProfile } from "../controllers/users.controllers.js";
import auth from "../middleware/auth.js";
import upload from "../lib/multer.js";

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").isString({ min: 1, max: 100 }),
  registerUser
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  loginUser
);

router.get("/logout", logoutUser);

router.get("/profile", auth, getProfile);

router.put("/update-profile", auth,upload.single("avatar") ,updateProfile);

router.put("/assessment", auth, updateAssessment);

router.get("/get-assessment",auth,getAssessment);

router.get("/fetch-user-id",auth,fetchingUserId);

router.get("/ai-style",auth,getAIStyle);

router.put("/ai-style",auth,updateAIStyle);

router.post("/wishlist",auth, saveOutfit);

router.get("/wishlist",auth, fetchFavorite);


export default router;

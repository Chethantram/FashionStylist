import express from "express";
import { addOutfit, getOutfits } from "../controllers/outfit.controllers.js";
import auth from "../middleware/auth.js";
const router = express.Router();


router.post("/add",auth , addOutfit);
router.get("/",auth,getOutfits);


export default router;
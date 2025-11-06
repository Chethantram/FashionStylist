import express from 'express';
import { addClothingItem, addFavorite, getAllClothingItems, getAllClothingItemsForShopping, getClothingItemById } from '../controllers/clothes.controllers.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/add', addClothingItem );
router.get('/', getAllClothingItems );
router.get('/get', getAllClothingItemsForShopping );
router.get('/:id', getClothingItemById );
router.post('/wishlist',auth,addFavorite)

export default router;
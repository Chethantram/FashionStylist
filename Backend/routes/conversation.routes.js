import express from 'express';
import { createConversation, deleteConversation, getConversationsByUserId } from '../controllers/coversation.controllers.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Create or add to existing conversations
router.post('/', createConversation);

router.post('/delete',auth, deleteConversation);

// Get conversations by userId
router.get('/:userId', getConversationsByUserId);

export default router;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import conversationRoutes from './routes/conversation.routes.js';
import clothesRoutes from './routes/clothes.routes.js';
import wadropeRoutes from './routes/outfit.routes.js';
import authRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';


// Load environment variables
dotenv.config();


// Database connection (example with Mongoose)
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:4028'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));


// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
app.use('/api/conversations',conversationRoutes );
app.use('/api/clothes',clothesRoutes );
app.use('/api/wadrope',wadropeRoutes );
app.use('/api/auth', authRoutes )

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
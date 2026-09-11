import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnection } from "./database/dbconnection.js";
import { errorMiddleware } from './error/error.js';
import reservation from './routes/reservation.js';

const app = express();

dotenv.config();

// Ensure DB is connected for every serverless request
app.use(async (req, res, next) => {
    try {
        await dbconnection();
        next();
    } catch (error) {
        next(error);
    }
});

// Configure CORS for production & development
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl) or match frontend
        callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for health check / Vercel direct backend visits
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Restaurant Booking Backend API is running successfully!",
    });
});

// API Routes
app.use('/api/v1/reservation', reservation);

// Error Middleware
app.use(errorMiddleware);

export default app;
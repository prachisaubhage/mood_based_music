import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import moodRoutes from './routes/mood.js';
import recommendationRoutes from './routes/recommendations.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to Database
// If no MONGODB_URI is provided, we catch the error inside connectDB to avoid crash during testing
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.log('No MONGODB_URI found in environment variables. Database features will be disabled.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Mood-Based Music Recommender API is running' });
});

// Routes
app.use('/api/mood', moodRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

import express from 'express';
import moodClassifier from '../services/moodClassifier.js';
import MoodLog from '../models/MoodLog.js';

const router = express.Router();

// POST /api/mood
// Classify mood from text and optionally save it
router.post('/', async (req, res, next) => {
  try {
    const { text, type = 'text' } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text input is required' });
    }

    let detectedMood = text;
    let confidence = 1.0;

    // If it's free text, classify it
    if (type === 'text') {
      const result = await moodClassifier.classifyMood(text);
      detectedMood = result.mood;
      confidence = result.confidence;
    }

    // Save to database
    const log = new MoodLog({
      originalInput: text,
      detectedMood,
      inputType: type,
      confidence
    });
    
    // We try to save, but don't fail the request if DB is not connected 
    // (useful for development without MongoDB)
    try {
      await log.save();
    } catch (dbErr) {
      console.error('Failed to save to database, continuing anyway:', dbErr.message);
    }

    res.json({
      mood: detectedMood,
      confidence,
      originalText: text
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/mood/history
// Get user's mood history (simple implementation without auth)
router.get('/history', async (req, res, next) => {
  try {
    const history = await MoodLog.find().sort({ timestamp: -1 }).limit(20);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

export default router;

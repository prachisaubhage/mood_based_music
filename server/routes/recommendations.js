import express from 'express';
import spotifyService from '../services/spotifyService.js';

const router = express.Router();

// GET /api/recommendations?mood=happy
router.get('/', async (req, res, next) => {
  try {
    const { mood } = req.query;

    if (!mood) {
      return res.status(400).json({ message: 'Mood query parameter is required' });
    }

    const validMoods = ['happy', 'sad', 'angry', 'relaxed', 'romantic', 'energetic', 'neutral'];
    const normalizedMood = validMoods.includes(mood.toLowerCase()) ? mood.toLowerCase() : 'neutral';

    const recommendations = await spotifyService.getRecommendationsByMood(normalizedMood);

    res.json({
      mood: normalizedMood,
      tracks: recommendations
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
  originalInput: {
    type: String,
    required: true,
    trim: true
  },
  detectedMood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'relaxed', 'romantic', 'energetic', 'neutral']
  },
  inputType: {
    type: String,
    required: true,
    enum: ['preset', 'text']
  },
  confidence: {
    type: Number,
    default: 1.0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MoodLog = mongoose.model('MoodLog', moodLogSchema);

export default MoodLog;

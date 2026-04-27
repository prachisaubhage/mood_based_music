// Simple rule-based classification as fallback/primary
const keywords = {
  happy: ['happy', 'joy', 'great', 'awesome', 'good', 'excited', 'wonderful', 'amazing', 'fantastic', 'glad'],
  sad: ['sad', 'depressed', 'down', 'unhappy', 'cry', 'miserable', 'heartbroken', 'gloomy', 'lonely', 'tears'],
  angry: ['angry', 'mad', 'furious', 'pissed', 'rage', 'annoyed', 'frustrated', 'hate', 'upset', 'livid'],
  relaxed: ['relaxed', 'calm', 'peaceful', 'chill', 'lazy', 'tired', 'sleepy', 'mellow', 'soothing', 'bored'],
  romantic: ['love', 'romantic', 'crush', 'heart', 'sweet', 'affection', 'date', 'kiss', 'passion', 'tender'],
  energetic: ['energetic', 'pumped', 'hype', 'workout', 'active', 'hyper', 'wild', 'crazy', 'upbeat', 'party']
};

class MoodClassifier {
  constructor() {
    this.useOpenAI = process.env.OPENAI_API_KEY ? true : false;
  }

  async classifyMood(text) {
    if (!text) return 'neutral';
    
    text = text.toLowerCase();
    
    // Simple Rule-Based matching
    let maxScore = 0;
    let detectedMood = 'neutral';
    
    for (const [mood, words] of Object.entries(keywords)) {
      let score = 0;
      for (const word of words) {
        if (text.includes(word)) {
          score++;
        }
      }
      
      if (score > maxScore) {
        maxScore = score;
        detectedMood = mood;
      }
    }
    
    // If we couldn't confidently classify, and OpenAI is configured, we could use it here
    // But to keep it simple and fast, we'll stick to rule-based unless you specifically 
    // want to implement the OpenAI call.
    
    return {
      mood: detectedMood,
      confidence: maxScore > 0 ? Math.min(maxScore * 0.3, 0.9) : 0.5
    };
  }
}

export default new MoodClassifier();

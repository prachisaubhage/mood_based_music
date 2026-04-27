import axios from 'axios';

class SpotifyService {
  constructor() {
    this.token = null;
    this.tokenExpiration = null;
  }

  async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Return existing token if it's still valid
    if (this.token && this.tokenExpiration && Date.now() < this.tokenExpiration) {
      return this.token;
    }

    if (!clientId || !clientSecret) {
      console.warn('Spotify credentials not found, using mock data for development');
      return null;
    }

    try {
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.token = response.data.access_token;
      // Set expiration to 50 minutes (token expires in 60 mins)
      this.tokenExpiration = Date.now() + (response.data.expires_in - 600) * 1000;
      return this.token;
    } catch (error) {
      console.error('Error fetching Spotify token:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Spotify API');
    }
  }

  async getRecommendationsByMood(mood) {
    const token = await this.getAccessToken();
    
    // Map moods to Spotify search queries (since /v1/recommendations is deprecated)
    const moodMap = {
      happy: 'genre:pop happy upbeat',
      sad: 'genre:acoustic sad melancholy',
      angry: 'genre:metal angry hard-rock',
      relaxed: 'genre:ambient chill calm',
      romantic: 'genre:romance love sweet',
      energetic: 'genre:dance edm workout',
      neutral: 'genre:indie pop'
    };

    const searchQuery = moodMap[mood] || moodMap['neutral'];

    console.log(`[DEBUG] getRecommendationsByMood called for mood: ${mood}`);
    console.log(`[DEBUG] Token exists? ${!!token}`);

    // Fallback mock data if Spotify is not configured or fails
    if (!token) {
      console.log(`[DEBUG] No token, falling back to mock data`);
      return this.getMockRecommendations(mood);
    }

    try {
      // Using Search API instead of Recommendations API to avoid 404 error
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          q: searchQuery,
          type: 'track',
          limit: 12,
          market: 'US'
        }
      });

      // Search API returns data inside tracks.items
      const tracks = response.data.tracks ? response.data.tracks.items : [];

      return tracks.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumArt: track.album.images[0]?.url || '',
        previewUrl: track.preview_url,
        spotifyUrl: track.external_urls.spotify,
        duration_ms: track.duration_ms
      }));
    } catch (error) {
      console.error('Spotify API Error:', error.response?.data || error.message);
      console.log('Falling back to mock data...');
      return this.getMockRecommendations(mood);
    }
  }

  getMockRecommendations(mood) {
    const fallbackPlaylists = {
      happy: [
        { title: "Walking On Sunshine", artist: "Katrina & The Waves", duration: 238000 },
        { title: "Happy", artist: "Pharrell Williams", duration: 232000 },
        { title: "Don't Stop Me Now", artist: "Queen", duration: 209000 },
        { title: "Uptown Funk", artist: "Mark Ronson, Bruno Mars", duration: 269000 },
        { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: 236000 },
        { title: "Good Vibrations", artist: "The Beach Boys", duration: 215000 },
        { title: "Levitating", artist: "Dua Lipa", duration: 203000 },
        { title: "Shake It Off", artist: "Taylor Swift", duration: 219000 }
      ],
      sad: [
        { title: "Someone Like You", artist: "Adele", duration: 284000 },
        { title: "Fix You", artist: "Coldplay", duration: 295000 },
        { title: "Hurt", artist: "Johnny Cash", duration: 218000 },
        { title: "All I Want", artist: "Kodaline", duration: 305000 },
        { title: "Skinny Love", artist: "Bon Iver", duration: 239000 },
        { title: "The Night We Met", artist: "Lord Huron", duration: 208000 },
        { title: "Let Her Go", artist: "Passenger", duration: 252000 },
        { title: "Say Something", artist: "A Great Big World", duration: 229000 }
      ],
      energetic: [
        { title: "Lose Yourself", artist: "Eminem", duration: 326000 },
        { title: "Eye of the Tiger", artist: "Survivor", duration: 243000 },
        { title: "Stronger", artist: "Kanye West", duration: 311000 },
        { title: "Blinding Lights", artist: "The Weeknd", duration: 200000 },
        { title: "Can't Hold Us", artist: "Macklemore", duration: 258000 },
        { title: "Levels", artist: "Avicii", duration: 199000 },
        { title: "Till I Collapse", artist: "Eminem", duration: 297000 },
        { title: "Don't Stop the Music", artist: "Rihanna", duration: 267000 }
      ],
      relaxed: [
        { title: "Weightless", artist: "Marconi Union", duration: 494000 },
        { title: "Sunset Lover", artist: "Petit Biscuit", duration: 237000 },
        { title: "Breathe", artist: "Télépopmusik", duration: 279000 },
        { title: "Teardrop", artist: "Massive Attack", duration: 329000 },
        { title: "Holocene", artist: "Bon Iver", duration: 336000 },
        { title: "Claire de Lune", artist: "Claude Debussy", duration: 305000 },
        { title: "Intro", artist: "The xx", duration: 127000 },
        { title: "Porcelain", artist: "Moby", duration: 241000 }
      ],
      romantic: [
        { title: "Perfect", artist: "Ed Sheeran", duration: 263000 },
        { title: "All of Me", artist: "John Legend", duration: 269000 },
        { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: 281000 },
        { title: "Make You Feel My Love", artist: "Adele", duration: 196000 },
        { title: "A Thousand Years", artist: "Christina Perri", duration: 285000 },
        { title: "At Last", artist: "Etta James", duration: 180000 },
        { title: "Just the Way You Are", artist: "Bruno Mars", duration: 220000 },
        { title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: 182000 }
      ],
      angry: [
        { title: "Break Stuff", artist: "Limp Bizkit", duration: 166000 },
        { title: "Killing in the Name", artist: "Rage Against The Machine", duration: 314000 },
        { title: "In the End", artist: "Linkin Park", duration: 216000 },
        { title: "Chop Suey!", artist: "System Of A Down", duration: 210000 },
        { title: "Smells Like Teen Spirit", artist: "Nirvana", duration: 301000 },
        { title: "Given Up", artist: "Linkin Park", duration: 189000 },
        { title: "Before I Forget", artist: "Slipknot", duration: 263000 },
        { title: "Duality", artist: "Slipknot", duration: 252000 }
      ],
      neutral: [
        { title: "Dreams", artist: "Fleetwood Mac", duration: 257000 },
        { title: "Take It Easy", artist: "Eagles", duration: 211000 },
        { title: "Fast Car", artist: "Tracy Chapman", duration: 296000 },
        { title: "Put Your Records On", artist: "Corinne Bailey Rae", duration: 215000 },
        { title: "Banana Pancakes", artist: "Jack Johnson", duration: 191000 },
        { title: "Sunday Morning", artist: "Maroon 5", duration: 244000 },
        { title: "Bubbly", artist: "Colbie Caillat", duration: 196000 },
        { title: "Ho Hey", artist: "The Lumineers", duration: 163000 }
      ]
    };

    const tracks = fallbackPlaylists[mood] || fallbackPlaylists['neutral'];
    
    return tracks.map((track, index) => ({
      id: `mock-${mood}-${index}`,
      title: track.title,
      artist: track.artist,
      // Use unsplash for nice album arts based on mood
      albumArt: `https://images.unsplash.com/photo-${index === 0 ? '1511671782779-c97d3d27a1d4' : index === 1 ? '1470225620780-dba8ba36b745' : index === 2 ? '1493225457224-0518712cd53d' : index === 3 ? '1514525253161-7a46d19cd819' : index === 4 ? '1458560871784-56d23406c091' : index === 5 ? '1483058712412-422a581e4b9b' : index === 6 ? '1508700115892-45d0543e25d4' : '1459749411175-04bf5292ceea'}?auto=format&fit=crop&w=300&q=80`,
      previewUrl: null, // Audio previews require Spotify API
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(track.title + ' ' + track.artist)}`,
      duration_ms: track.duration
    }));
  }
}

export default new SpotifyService();

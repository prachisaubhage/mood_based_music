import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import MoodInput from './components/MoodInput';
import SongGrid from './components/SongGrid';
import LoadingSpinner from './components/LoadingSpinner';
import useDebounce from './hooks/useDebounce';
import { classifyMood, getRecommendations } from './services/api';

function App() {
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [inputText, setInputText] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  
  const debouncedInput = useDebounce(inputText, 1000);

  // Initial fetch for neutral mood
  useEffect(() => {
    fetchRecommendations('neutral');
  }, []);

  // Handle free text input classification
  useEffect(() => {
    const handleClassify = async () => {
      if (!debouncedInput.trim()) return;
      
      setIsClassifying(true);
      try {
        const result = await classifyMood(debouncedInput);
        if (result.mood !== selectedMood) {
          setSelectedMood(result.mood);
          toast.success(`Detected mood: ${result.mood}!`, {
            style: {
              background: '#333',
              color: '#fff',
            },
          });
          fetchRecommendations(result.mood);
        }
      } catch (error) {
        console.error("Classification error:", error);
      } finally {
        setIsClassifying(false);
      }
    };

    handleClassify();
  }, [debouncedInput]);

  const handleEnterPress = async () => {
    if (!inputText.trim()) return;
    
    setIsClassifying(true);
    try {
      const result = await classifyMood(inputText);
      if (result.mood !== selectedMood) {
        setSelectedMood(result.mood);
        toast.success(`Detected mood: ${result.mood}!`, {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        fetchRecommendations(result.mood);
      } else {
        fetchRecommendations(result.mood);
      }
    } catch (error) {
      console.error("Classification error:", error);
    } finally {
      setIsClassifying(false);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setInputText(''); // Clear input if preset selected
    fetchRecommendations(mood);
  };

  const fetchRecommendations = async (mood) => {
    setLoading(true);
    try {
      const data = await getRecommendations(mood);
      setTracks(data.tracks);
    } catch (error) {
      toast.error('Failed to fetch recommendations. Showing fallback data.', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      // Set empty tracks to trigger the empty state if mock also fails
      setTracks([]); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker flex flex-col">
      <Header />
      
      <Toaster position="top-center" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Soundtrack your <span className="text-gradient">emotions</span>.
          </h2>
          <p className="text-lg text-textSub max-w-2xl mx-auto">
            Tell us how you're feeling, and we'll curate the perfect Spotify playlist to match your vibe.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto bg-card/40 backdrop-blur border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl mb-12">
          <MoodSelector 
            currentMood={selectedMood} 
            onSelectMood={handleMoodSelect} 
          />
          
          <div className="relative py-8 flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-textSub text-sm font-medium uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <MoodInput 
            value={inputText} 
            onChange={setInputText} 
            onEnter={handleEnterPress}
            isClassifying={isClassifying}
          />
        </div>

        {/* Results Section */}
        <div className="min-h-[400px]">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SongGrid tracks={tracks} mood={selectedMood} />
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-textSub border-t border-white/5 mt-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MoodMusic Recommender. Built with React & Express.
        </p>
      </footer>
    </div>
  );
}

export default App;

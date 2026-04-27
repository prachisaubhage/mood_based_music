# Mood-Based Music Recommender

A full-stack web application that recommends Spotify tracks based on your mood. Choose a preset mood or type how you feel to get a curated list of songs with audio previews.

## 🌟 Features
- **Mood Selection**: 6 preset moods (Happy, Sad, Energetic, Relaxed, Romantic, Angry)
- **AI Text Classification**: Type how you feel, and the app detects your mood automatically
- **Spotify Integration**: Fetches real tracks, album art, and 30-second audio previews
- **MongoDB Tracking**: Logs user inputs and mood classifications
- **Beautiful UI**: Modern, responsive design built with Tailwind CSS and glassmorphism

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **External API**: Spotify Web API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (for database)
- Spotify Developer account (for API keys)

### 1. Spotify API Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an App
3. Note your `Client ID` and `Client Secret`

### 2. Environment Variables
Copy the `.env.example` file to `.env` in the root folder:
```bash
cp .env.example .env
```
Update `.env` with your actual MongoDB URI and Spotify credentials.

### 3. Installation
Install dependencies for both client and server:

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

The frontend will start at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 📦 Deployment Guide

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas
2. Allow access from anywhere (`0.0.0.0/0`) in Network Access
3. Get your connection string and add it to your environment variables

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render, select your repository
3. Set Root Directory to `server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables (`MONGODB_URI`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`)

### Frontend (Vercel)
1. Import your GitHub repository to Vercel
2. Framework Preset: `Vite`
3. Root Directory: `client`
4. Add Environment Variable: `VITE_API_URL` = `your_render_backend_url/api`
5. Deploy!

---

## 📁 Project Structure

```text
mood_based_music/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI Components (Header, SongCard, etc.)
│   │   ├── hooks/          # Custom hooks (useDebounce)
│   │   ├── services/       # API integration
│   │   ├── App.jsx         # Main application logic
│   │   └── index.css       # Tailwind base
├── server/                 # Node.js backend
│   ├── config/             # DB configuration
│   ├── middleware/         # Error handlers
│   ├── models/             # Mongoose schemas (MoodLog)
│   ├── routes/             # API routes
│   ├── services/           # Spotify & Mood classification logic
│   └── index.js            # Server entry point
```

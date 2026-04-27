#!/bin/bash
cd /Users/prachisaubhage/Desktop/mood_based_music

rm -rf .git
git init

# Set the git config locally for this repo so the commits are linked to the GitHub account
git config user.name "Prachi Saubhage"
git config user.email "prachisaubhage@users.noreply.github.com"

# Commits 1-5
git add .gitignore
git commit -m "chore: setup project ignore files"
git add client/.gitignore server/.gitignore
git commit -m "chore: add client and server gitignores"
git add README.md
git commit -m "docs: create project README documentation"
git add client/package.json client/package-lock.json
git commit -m "chore: initialize client React Vite project"
git add server/package.json server/package-lock.json
git commit -m "chore: initialize backend Express project dependencies"

# Commits 6-10
git add client/index.html client/vite.config.js
git commit -m "build: setup Vite configurations and entry HTML"
git add client/tailwind.config.js client/postcss.config.js
git commit -m "style: add TailwindCSS configuration"
git add client/src/index.css
git commit -m "style: implement global styles and glassmorphism utilities"
git add client/src/main.jsx
git commit -m "feat: setup React DOM root rendering"
git add client/src/App.jsx
git commit -m "feat: scaffold main App component structure"

# Commits 11-15
git add client/src/services/api.js
git commit -m "feat: create axios API client for backend communication"
git add client/src/hooks/useDebounce.js
git commit -m "feat: add useDebounce hook for text inputs"
git add client/src/components/Header.jsx
git commit -m "feat: implement Header navigation component"
git add client/src/components/MoodSelector.jsx
git commit -m "feat: implement MoodSelector UI with icons"
git add client/src/components/MoodInput.jsx
git commit -m "feat: create MoodInput component with Enter key support"

# Commits 16-20
git add client/src/components/SongCard.jsx
git commit -m "feat: build SongCard UI for track display"
git add client/src/components/SongGrid.jsx
git commit -m "feat: create SongGrid for rendering multiple tracks"
git add client/src/components/LoadingSpinner.jsx
git commit -m "feat: add beautiful animated loading spinner"
git add server/config/db.js
git commit -m "feat: setup MongoDB connection configuration"
git add server/models/MoodLog.js
git commit -m "feat: define Mongoose schema for user mood logs"

# Commits 21-25
git add server/middleware/errorHandler.js
git commit -m "feat: implement global express error handling middleware"
git add server/services/moodClassifier.js
git commit -m "feat: create rule-based AI mood classification service"
git add server/services/spotifyService.js
git commit -m "feat: integrate Spotify Web API for music recommendations"
git add server/routes/mood.js
git commit -m "feat: implement POST /api/mood endpoints"
git add server/routes/recommendations.js
git commit -m "feat: create GET /api/recommendations endpoint"

# Commits 26-27
git add server/index.js
git commit -m "feat: setup main Express application server"
git add .
git commit -m "chore: final code polish and missing assets"

git remote add origin https://github.com/prachisaubhage/mood_based_music.git
git branch -M main
git push -u origin main --force

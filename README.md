# 🎬 Movies Project

A modern web application that allows users to explore, search, and discover movies using data from The Movie Database (TMDB). Built with React and Vite, this project provides an intuitive interface for browsing movies, viewing details, and staying up to date with the latest releases.

## 🚀 Technologies Used

- React 19
- Vite 6
- React Router 7
- JavaScript
- CSS3
- TMDB API

## 📋 Prerequisites

- Node.js (version 14.0 or higher)
- npm or yarn package manager
- TMDB API Key

## 🔑 API Key Setup

To run this project, you'll need an API key from The Movie Database (TMDB). Here's how to get one:

1. Visit [TMDB website](https://www.themoviedb.org/)
2. Create an account or log in
3. Go to your profile settings
4. Navigate to the "API" section in the left sidebar
5. Request an API key by clicking "Create" under "Request an API Key"
6. Follow the steps, selecting "Developer" as your account type
7. Fill in the required information
8. Once approved, copy your API key

## ⚙️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Movies-Project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## 🔒 Environment Variables

The following environment variables are required:

- `VITE_TMDB_API_KEY`: Your TMDB API key
- `VITE_TMDB_BASE_URL`: The TMDB API base URL

Note: The `.env` file is already added to `.gitignore` to ensure your API key remains secure.

## 🌟 Features

- Browse popular movies
- Search for specific movies
- Filter movies by genre
- View detailed movie information including trailers
- Add movies to favorites
- Responsive design for all devices
- Modern and intuitive user interface

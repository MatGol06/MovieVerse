# 🎬 MovieVerse

![MovieVerse Banner](https://via.placeholder.com/1200x400.png?text=MovieVerse+-+Modern+Movie+Discovery)

> A highly performant, accessible, and pragmatic movie discovery web application built with React and the TMDB API.

## 📖 Overview

MovieVerse is designed as a SaaS-grade portfolio piece. It prioritizes speed, usability, and strict accessibility (WCAG 2.2 AA) over flashy, unrealistic design trends. It serves as a benchmark for modern frontend architecture using React, TanStack Query, and Zustand.

## ✨ Core Features

- **Blazing Fast Search:** Real-time debounced searching powered by TanStack Query caching.
- **Accessible Dark Theme:** High-contrast, low eye-strain cinematic dark mode.
- **Robust Watchlist:** Persistent state management for tracking your favorite films.
- **Enterprise UI:** Strict adherence to established usability heuristics (No glassmorphism, no arbitrary animations).

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Routing:** React Router v6
- **State Management:** Zustand (Client) + TanStack Query (Server)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **API:** TMDB (The Movie Database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- TMDB API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movieverse.git
   cd movieverse
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing
Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License
This project is licensed under the MIT License.

# MovieVerse - React Portfolio Project

## Overview

MovieVerse is a modern, premium movie discovery web application built with React and the TMDB API. It serves as a comprehensive portfolio piece demonstrating proficiency in modern frontend development, API integration, and user-centric design.

## Goals

-   Master React fundamentals and modern hooks
-   Implement robust REST API integration with caching
-   Build a premium, highly responsive UI/UX
-   Showcase professional state management and architecture
-   Create a standout portfolio-quality application

## Tech Stack

### Core Frontend

-   **React** (UI Library)
-   **React Router** (Navigation)
-   **Tailwind CSS** (Styling)
-   **shadcn/ui** (Premium UI Components)

### Data Fetching & State

-   **TanStack Query (React Query)** - *Mandatory for server state, caching, and loading/error management*
-   **Axios** - *HTTP Client*
-   **Zustand** - *Lightweight global state management (Client state)*

### Enhancements

-   **Supabase / Firebase** - *Authentication & Cloud DB (for persisting Watchlist)*
-   **Lucide React** - *Clean, consistent, and scalable SVG iconography (avoids mismatched icon sets)*

## UI/UX Design System

As a product-focused portfolio piece, the application prioritizes usability, accessibility, and scalability over unrealistic aesthetic trends. The design strictly adheres to the following core principles:

-   **Usability First (Nielsen's Heuristics):** Interface state should always be visible (e.g., clear loading and error states). Navigation should be intuitive, offering clear escape routes and consistent patterns.
-   **Accessibility (WCAG 2.2 AA):** All text must maintain a minimum contrast ratio of 4.5:1. Interactive elements must be fully navigable via keyboard, and aria-labels must be used for screen readers.
-   **SaaS-Grade Pragmatism:** Avoid excessive gradients, unnecessary micro-animations, and glassmorphism. Designs must be functional, clean, and reflect what real-world product teams ship.
-   **Consistency (Material/HIG):** Utilize established UI patterns. Buttons, inputs, and modals should behave predictably according to standard guidelines (e.g., clear visual hierarchy for primary vs. secondary actions).
-   **Scalable Typography:** Use systematic typography (e.g., *Inter* or *Roboto*) with a clear scale to establish information hierarchy, prioritizing readability over stylistic flair.

### Anti-Patterns (Strictly Avoid)

To maintain a professional, SaaS-grade standard, the following design trends are strictly prohibited:

-   ❌ **Glassmorphism & Neumorphism:** Avoid blurred backdrops or extruded shapes. Use solid surface colors and structural borders.
-   ❌ **Huge Shadows & Floating Elements:** Elements should feel grounded. Use flat design with subtle 1px borders or very slight elevation (`shadow-sm`) only when necessary.
-   ❌ **Random Gradients:** Stick to solid, high-contrast colors for backgrounds, surfaces, and actionable items.
-   ❌ **Inconsistent Border Radius:** Use a strict, logical border radius system (e.g., `rounded-md` for inputs, `rounded-lg` for cards). Do not mix arbitrary values.
-   ❌ **Centered Cards for Dashboards:** Content must be structured using standard left-aligned data tables, grids, or constrained max-width containers. No massive, floating center-screen cards.
-   ❌ **Fancy Animations:** Eliminate unnecessary bounce effects, heavy page transitions, or complex loaders. UI interactions should feel instantaneous and snappy.

### Accessible Dark Theme Palette

To maintain a highly usable and accessible dark interface, we will use a pragmatic, high-contrast palette (optimized for Tailwind CSS):

-   **Background (Base):** `#121212` (Standard Material Design dark background to reduce eye strain).
-   **Surface (Cards/Modals):** `#1E1E1E` (Elevated surface color for clear depth without shadows).
-   **Primary Action:** `#2563EB` (Accessible Blue - passes WCAG contrast ratios on dark backgrounds).
-   **Borders / Dividers:** `#333333` (Subtle but visible separation of content areas).
-   **Text (Primary):** `#FFFFFF` (High contrast for main body text and headings).
-   **Text (Secondary):** `#B3B3B3` (Accessible gray for supporting text, ensuring >4.5:1 contrast against base).
-   **Error State:** `#CF6679` (Accessible red for validation errors and destructive actions).

## Core Features

-   **Trending & Discovery:** Browse latest and most popular movies.
-   **Advanced Search:** Search movies with debouncing.
-   **Movie Details:** In-depth view including cast, ratings, and overview.
-   **Dynamic Genre Filter:** Filter movies interactively.
-   **Infinite Scrolling:** Seamless content loading.
-   **Dark/Light Mode:** Full theme support.
-   **Cloud Watchlist (Auth):** Save movies across devices via user accounts (Supabase/Firebase) or Local Storage as fallback.
-   **Responsive Design:** Flawless layout from mobile to 4K displays.
-   **Premium UI/UX:** Loading skeletons, toast notifications, and smooth transitions.
-   **Error Handling:** Graceful fallback states for API failures.

## Pages

-   `/` - Home (Trending & Discovery)
-   `/movie/:id` - Movie Detail
-   `/watchlist` - User Watchlist (Protected Route)
-   `/login` - Authentication Page (Optional enhancement)
-   `*` - 404 Not Found

## Folder Structure

``` text
movieverse/
├── src/
│   ├── assets/       # Images, global styles
│   ├── components/   # Reusable UI components (shadcn/ui, custom)
│   ├── pages/        # Page components corresponding to routes
│   ├── hooks/        # Custom React hooks (e.g., useDebounce, API hooks)
│   ├── services/     # API configuration and calls (api.js)
│   ├── store/        # Zustand global state (store.js)
│   ├── utils/        # Helper functions and formatters
│   └── App.jsx       # Root component and Routing
```

## Core Components

-   `Navbar` (Navigation & User Profile)
-   `SearchBar` (with debounce)
-   `MovieCard` (Hover effects, Add to Watchlist)
-   `GenreFilter`
-   `ThemeToggle`
-   `LoadingSkeleton` (shadcn/ui Skeleton)
-   `ErrorMessage` / `Toast`
-   `Footer`

## State Management Strategy

-   **Server State (TanStack Query):** Movies list, Movie details, Search results, Genres. (Handles `isLoading`, `isError` automatically).
-   **Client State (Zustand):** Theme (Dark/Light), Sidebar toggle (mobile), Active Genre filter.
-   **Persistent State:** User session, Cloud Watchlist.

## User Flow

`Open App` -> `Trending` -> `Search` -> `View Detail` -> `Login` -> `Add to Watchlist`

## API Endpoints (TMDB)

-   `/trending/movie/day`
-   `/search/movie`
-   `/movie/{movie_id}`
-   `/movie/{movie_id}/credits` (Cast)
-   `/genre/movie/list`
-   `/movie/popular`
-   `/movie/top_rated`

## Testing (Bonus)

-   **Vitest & React Testing Library:** Unit testing for critical components (e.g., SearchBar logic, Button renders).

## 4 Week Roadmap

- **Week 1: Foundation & API**
  - Setup Vite + React + Tailwind + shadcn/ui.
  - Setup React Router.
  - Configure Axios and test TMDB API calls.
- **Week 2: Core Views & State**
  - Build Home page (Trending/Popular grids).
  - Implement Search functionality with TanStack Query.
  - Create reusable `MovieCard` and `LoadingSkeleton`.
- **Week 3: Details, Watchlist & Auth**
  - Build Movie Detail page.
  - Setup Supabase/Firebase for simple Auth.
  - Implement Add/Remove to Watchlist logic.
- **Week 4: Polish & Deployment**
  - Implement Dark Mode.
  - Add Infinite Scrolling or Pagination.
  - Add Framer Motion transitions.
  - Final QA, Testing, and deploy to Vercel/Netlify.

## Future Ideas

-   Embedded YouTube Trailers.
-   "Similar Movies" recommendation section.
-   User Reviews/Ratings system.
-   PWA (Progressive Web App) support for offline capability.

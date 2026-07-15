# Information Architecture (IA) & Navigation Structure

## 1. High-Level Sitemap
The architecture follows a flat, shallow structure to minimize cognitive load and allow users to reach any core feature within a single click.

```text
[ Root: MovieVerse ]
 ├── Home (/)
 │    ├── Hero Feature (Trending)
 │    ├── Trending Now Row
 │    ├── Popular Row
 │    └── Top Rated Row
 │
 ├── Discover (/search)
 │    ├── Search Input
 │    ├── Real-time Search Results Grid
 │    └── Empty/Error States
 │
 ├── My Watchlist (/watchlist)
 │    ├── Saved Movies Grid
 │    └── Empty State Prompt
 │
 └── Movie Detail (/movie/:id)
      ├── Movie Metadata (Rating, Runtime, Date, Status)
      ├── Synopsis
      ├── Cast & Crew
      ├── Production Companies
      └── Similar Movies Row
```

## 2. Navigation Structure
**Global Top Navigation (Sticky)**
- **Left/Brand:** Logo + "MovieVerse" (Routes to Home)
- **Primary Links (Desktop):** Home, Discover, My List
- **Right/Utility:** Quick Search Icon, Notifications, User Avatar

## 3. UX Decisions & Reasoning
- **Flat Architecture:** By keeping the site hierarchy strictly 1-level deep from the root, we respect Hick’s Law. Users are not overwhelmed by nested menus or deep categories.
- **Sticky Navigation:** The navigation bar remains visible while scrolling down deep lists. This ensures the user can always pivot to a new task (e.g., jumping from Home to Watchlist) without the friction of scrolling back to the top.
- **Search as a Primary Route:** Instead of a small dropdown search, dedicating an entire route (`/search`) to discovery provides the necessary screen real estate for displaying robust search results in a grid format, accommodating visual scanning.

# Information Architecture (Sitemap)

## Structure
```text
/ (Home)
├── Trending Movies Grid
├── Popular Movies Grid
└── Search Input (Global Header)

/search?q={query}
└── Search Results Grid

/movie/{id} (Movie Details)
├── Hero (Title, Rating, Release Year, Genres)
├── Synopsis
├── Cast List
└── Action Bar (Add to Watchlist)

/watchlist
└── User's Saved Movies Grid
```

## Navigation (Global Navbar)
- **Logo (Left):** Links to `/`
- **Search Bar (Center/Right):** Global search input.
- **Watchlist Link (Right):** Links to `/watchlist`.

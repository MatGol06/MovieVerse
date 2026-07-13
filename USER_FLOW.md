# User Flows

## Flow 1: Searching for a Movie
1. User lands on `/` (Home).
2. User clicks on the Search Input in the navbar.
3. User types a query (e.g., "Inception").
4. System debounces input (300ms) and fetches results.
5. System displays loading skeleton.
6. System renders Search Results Grid on `/search?q=Inception`.
7. User clicks a movie card to view details.

## Flow 2: Managing Watchlist
1. User is on `/movie/123` (Movie Detail page).
2. User clicks "Add to Watchlist" button.
3. System updates local state (Zustand) and persists to storage.
4. System displays success Toast notification: "Added to Watchlist".
5. Button state changes to "Remove from Watchlist" (secondary button style).
6. User navigates to `/watchlist` to view saved movies.

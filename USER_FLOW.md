# User Flow & Screen Flow

## 1. Primary User Flow: Discovery to Action
*Goal: User finds an interesting movie and watches the trailer.*

1. **Entry:** User lands on `Home (/)`.
2. **Scan:** User scans the Hero Banner and scrolls down to the "Popular" horizontal row.
3. **Trigger:** User clicks on a specific Movie Card.
4. **Transition:** System routes to `Movie Detail (/movie/:id)`.
5. **Evaluate:** User reads the synopsis and views the cast list.
6. **Action:** User clicks the primary "Watch Trailer" button.
7. **Resolution:** A global modal opens, autoplaying the official YouTube trailer over a dimmed background. 

## 2. Secondary User Flow: Curation (Watchlist)
*Goal: User saves a movie for future viewing.*

1. **Trigger:** While hovering over a Movie Card on `Home`, or while inside `Movie Detail`.
2. **Action:** User clicks the "+" (Add to Watchlist) button.
3. **Feedback:** The button instantly transforms into a "✔" (Added) state with a subtle color change (Success).
4. **Verification:** User clicks "My List" in the global navigation.
5. **Resolution:** User arrives at `Watchlist (/watchlist)` and sees the newly saved movie in the grid.

## 3. Screen Flow Mapping
```text
[ Home ] ──(Click Card)──> [ Movie Detail ] ──(Click Trailer)──> [ Video Modal ]
   │                              │
(Click Nav)                   (Click +)
   │                              │
   v                              v
[ Discover ]                 [ Watchlist ]
```

## 4. UX Decisions & Reasoning
- **Modals over Page Transitions for Video:** When a user clicks "Watch Trailer", opening a modal rather than navigating to a new page preserves their context. If they close the trailer, they are exactly where they left off, preventing disorientation.
- **Optimistic UI Updates:** Adding a movie to the Watchlist provides immediate visual feedback (the checkmark) before the server confirms the request. This adheres to the heuristic of "Visibility of System Status" by making the app feel incredibly fast and responsive.
- **Hover Reveal on Cards:** Hiding secondary actions (Play, Save) until hover keeps the visual interface uncluttered, reducing cognitive noise during the initial scanning phase.

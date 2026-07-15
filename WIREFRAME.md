# Wireframe Descriptions

*Note: This document describes the skeletal structure and layout logic of the screens without defining visual aesthetics.*

## 1. Home / Dashboard Screen
- **Hero Section (Top 70% of viewport):**
  - Full-bleed background image with a dark gradient fade at the bottom.
  - **Z-Pattern Layout:** Title and metadata (Match %, Year) aligned left center. Primary CTA ("Play Now") and Secondary CTA ("Watchlist") grouped below the description.
- **Horizontal Rows (Bottom 30% extending downwards):**
  - Section Header aligned left.
  - A scrollable row of vertical movie cards (2:3 aspect ratio).
  - Left/Right chevron buttons that appear on hover to indicate scrollability.

## 2. Movie Detail Screen
- **Background:** Bleeds the movie backdrop across the top behind the navigation.
- **Layout (2-Column Grid on Desktop, Stacked on Mobile):**
  - **Main Column (Left, 66% width):** Large H1 Title, Overview text block. Below that, a 2x2 grid displaying Director, Runtime, Release Date, and Status.
  - **Sidebar Column (Right, 33% width):** "Top Cast" list. Each item features a circular avatar, the actor's name (bold), and character name (muted).
- **Bottom Section:** A horizontal row for "Similar Movies".

## 3. Discover / Search Screen
- **Header:** Large, centered search input field dominating the top of the content area. Includes a magnifying glass icon.
- **Content Area:** 
  - **State A (Empty/Initial):** Centered placeholder text encouraging the user to type.
  - **State B (Loading):** A grid of Skeleton placeholder cards.
  - **State C (Results):** A responsive grid (fluid columns) of Movie Cards.

## 4. Global Trailer Modal (Component)
- **Overlay:** 90% opacity black background spanning the entire screen.
- **Container:** Centered, 16:9 aspect ratio container (max-width constraints for ultra-wide monitors).
- **Controls:** Embedded YouTube player controls. Clicking anywhere outside the container (the overlay) closes the modal.

## 5. UX Decisions & Reasoning
- **Aspect Ratio Standardization:** Utilizing a strict 2:3 aspect ratio for all movie cards ensures layout consistency regardless of the source image size, adhering to the principle of "Consistency and Standards".
- **Z-Pattern Reading:** The Hero section utilizes a Z-pattern layout because western users naturally scan left-to-right, top-to-bottom. The eye catches the massive title first, reads the description, and lands perfectly on the Call-to-Action buttons.
- **Skeleton Loading:** Using skeleton frames instead of a traditional spinning wheel during search reduces the perceived waiting time (Progressive Disclosure) and prevents layout shift (Cumulative Layout Shift) once the data populates.

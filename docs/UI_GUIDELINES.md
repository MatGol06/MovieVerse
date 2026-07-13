# UI Guidelines

## Core Design Philosophy
**"Design this interface as if it will be used daily by thousands of employees."**
- **Prioritize speed:** Data loading and interactions must feel instantaneous.
- **Prioritize readability:** High contrast, systematic typography, and clear data hierarchy.
- **Prioritize accessibility:** Strict WCAG 2.2 AA compliance is mandatory.
- **Avoid visual noise:** Eliminate any styling or animation that does not serve a direct functional purpose.

## Reference Design Systems
For interaction patterns, spacing rules, and component behavior, strictly draw inspiration from the following enterprise-grade systems:
1. **Material Design 3 (Google):** For layout structures and predictable state changes.
2. **Ant Design (Alibaba):** For data-heavy layouts and practical enterprise components.
3. **IBM Carbon:** For strict accessibility, high contrast, and industrial-grade functionality.
4. **Microsoft Fluent:** For seamless web interactions and professional restraint.
5. **Apple Human Interface Guidelines (HIG):** For clarity, deference, and depth without clutter.

## 1. Usability Heuristics
- **Visibility of System Status:** Always show loading skeletons for data fetching. Use toast notifications for success/error states (e.g., "Added to Watchlist").
- **Consistency and Standards:** Use established patterns. Buttons look like buttons; links look like links.

## 2. Accessibility (A11y)
- **Contrast:** Ensure a minimum of 4.5:1 contrast ratio for all text.
- **Keyboard Navigation:** Focus rings must be visible. `outline-blue-500` on `:focus-visible`.
- **Screen Readers:** Use semantic HTML (`<nav>`, `<main>`, `<article>`) and appropriate `aria-labels` for icon-only buttons.

## 3. Strict Anti-Patterns
- ❌ **No Glassmorphism:** Solid colors only.
- ❌ **No Huge Shadows:** Use flat design. Max shadow is `shadow-sm` for dropdowns/modals.
- ❌ **No Centered Cards for Dashboards:** Data must be left-aligned or grid-based in a max-width container.
- ❌ **No Unnecessary Animations:** State changes should be instant. Hover states should have a maximum `150ms` transition.

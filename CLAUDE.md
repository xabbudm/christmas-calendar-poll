# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production with TypeScript type checking
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Testing Strategy
Currently no test framework is configured. Tests can be added using Jest or Vitest as needed.

## Architecture Overview

### Project Type
A React 19 web application for organizing family advent calendar gift exchanges with a two-stage random assignment system.

### Core Flow
1. **Input Phase**: Users add 2-6 family members
2. **Stage 1 (Receiving Days)**: 24 days randomly distributed among members (publicly visible)
3. **Stage 2 (Giving Days)**: Members assigned different days to prepare gifts, with constraint that no one prepares gifts on days they receive gifts (hidden by default, toggle visible)

### Key Algorithm: Stage 2 Assignment
Located in `src/App.tsx:53-85`. The algorithm:
- Creates a pool of valid "giving days" for each member (days they don't receive)
- Shuffles all 24 days randomly
- Iterates through shuffled days, assigning each to eligible members
- Prioritizes members who still need more days to ensure balanced distribution
- Guarantees each member gets exactly `24 / numMembers` days without conflicts

**Important invariant**: Each day is assigned exactly once, and no member prepares gifts on days they receive gifts.

### Component Structure
- **App.tsx**: Single monolithic component containing all logic (family member management, poll state, UI rendering, algorithm)
- Styling: Tailwind CSS utility classes (no component-specific CSS except animations in App.css)
- Icons: Lucide React for UI icons (Gift, Plus, Trash2, RefreshCw, Eye, EyeOff)

### State Management
All state managed with React hooks in App.tsx:
- `familyMembers`: Array of family member names
- `newMemberName`: Input field state
- `stage1Results` / `stage2Results`: Assignment results with member names and assigned days
- `visibleGivingDays`: Object tracking which Stage 2 assignments are visible to user
- `pollStarted`: Boolean indicating if poll has been executed

### Styling
- **Framework**: Tailwind CSS 3.x with custom gradient backgrounds
- **Color scheme**: Christmas-themed (red-600/700, green-600/700, gradient backgrounds)
- **Responsive**: Uses Tailwind's responsive prefixes (md:, sm:) for tablet/mobile support
- **Day badges**: 12x12 px red (receiving) or green (giving) boxes with centered numbers

## Development Notes

### When Modifying the Algorithm
The Stage 2 assignment algorithm is the most critical part of the application. If changing:
- Ensure the constraint "no one gives on their receiving days" is maintained
- Verify balanced distribution (each member gets equal or near-equal days)
- Test edge cases: 2 members (12 days each), 6 members (4 days each)
- The `membersNeed` array tracks how many days each person still requires

### Customization Points
- **Family size limits** (line 13, 35, 141): `familyMembers.length < 2` and `familyMembers.length > 6`
- **Number of days** (line 44): `Array.from({ length: 24 }, ...)`
- **Colors** (throughout): Replace `red-600`, `green-600`, `bg-gradient-to-br from-red-50...` with desired colors
- **Days per person** (line 41): Calculated as `Math.floor(24 / numMembers)`

### Type Safety
- Project uses TypeScript 5.9
- React components are untyped (implicit any on component parameters) - consider adding prop types for better IDE support
- ESLint enforces React hooks rules and React Refresh compatibility

### No Breaking Changes
- Do not remove or rename the `shuffleArray` utility (used for both Stage 1 and Stage 2)
- Do not alter the visible/hidden toggle pattern for Stage 2 (critical for privacy feature)
- Maintain the two-result structure: `stage1Results` and `stage2Results` are distinct for display purposes

## Deployment Notes
The app is built with Vite and is a static single-page application. Deploy the `dist` folder from `npm run build` to any static host (Vercel, Netlify, GitHub Pages, etc.).

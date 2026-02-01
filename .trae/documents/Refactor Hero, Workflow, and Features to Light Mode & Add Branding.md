
# 10x Improvements: Hero, Workflow, and Features

## Overview
This plan addresses the user's request to add branding to the Hero section, switch the Workflow page to a clean White/Purple theme, and upgrade the Features page with concise text and better visuals.

## Plan Details

### 1. Hero Section Updates (`Hero.tsx`)
- **Add Badges:**
  - Add "Powered by NVIDIA" and "Powered by Microsoft Agent Lightning" badges.
  - Placement: Below the "Start Building" / "npm install" buttons, as a row of trust indicators.
- **Button Styling:**
  - Change the "Start Building" button color from black (`bg-gray-900`) to **Purple** (`bg-purple-600 hover:bg-purple-700`).

### 2. Workflow Page to White Theme (`Workflow.tsx` & `ModesAndFlows.tsx`)
- **`Workflow.tsx`**:
  - Switch background from `bg-[#050505]` to `bg-white`.
  - Update text colors to `text-gray-900` (headings) and `text-gray-500` (subtext).
  - Update background gradients to be subtle gray/purple/blue washes suitable for light mode.
- **`ModesAndFlows.tsx`**:
  - **Container:** Change main wrapper to `bg-white` or `bg-gray-50`.
  - **Navigation:** Update the phase indicator to use light backgrounds (`bg-white`, `border-gray-200`) and dark text.
  - **Main Window:**
    - Change window frame to `bg-white` with `border-gray-200` and heavy shadow (`shadow-2xl`).
    - **Terminal (Step 1):** Keep the terminal dark (it's a terminal), but ensure it sits nicely in the light window.
    - **Architect (Step 2):** Change canvas background to a very light grid (`bg-gray-50`). Update node cards to be white with sharp borders.
    - **Deploy (Step 3):** Change background to white/gray. Update map markers and text for contrast.

### 3. Features Page Upgrade (`components/Features.tsx`)
*Note: The user likely refers to the section on the homepage (`components/Features.tsx`), not the separate page (`pages/Features.tsx`), as the request context implies the main landing flow. I will focus on `components/Features.tsx`.*
- **Visual Upgrade:** Maintain the "Bento Grid" layout but refine the styling.
  - *Decision:* Since the user asked for "Workflow Page needs to be White" and "Hero Section" is white, I will update the Features section to match this **Light Mode** aesthetic to keep the site cohesive.
  - Switch cards from "Glassmorphic Dark" (`bg-white/5`) to "Clean Light" (`bg-white`, `border-gray-200`, `shadow-lg`).
- **Concise Text:**
  - Rewrite descriptions to be punchier and shorter.
  - Example: "Our SWC compiler pipeline..." -> "Rust-based SWC pipeline. Builds in 2.5s."

## Verification Strategy
- **Visual Check:**
  - Hero: Are badges visible? Is the button purple?
  - Workflow: Is the background white? Is text readable? Does the "Mission Control" still look good in light mode?
  - Features: Is the text concise? Do the cards look "upgraded" and fit the theme?
- **Build:** Run `npm run build` to ensure no syntax errors.

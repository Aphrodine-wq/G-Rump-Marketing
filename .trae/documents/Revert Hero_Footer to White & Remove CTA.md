
# Revert to White Theme for Hero & Footer and Remove CTA Section

## Overview
The user wants to revert the `Hero` and `Footer` sections back to a **White** theme (light mode) and remove the `CTA` section entirely (including its specific content about "Start building with Intent", "1M+ lines of code", and the npm install command). Additionally, the code snippet behind the Frowny Face logo in the Hero section needs to be removed.

## Plan Details

### 1. Refactor `Hero.tsx` to Light Mode
- **Change Background:** Switch from `bg-[#050505]` to `bg-white`.
- **Update Text Colors:**
  - Change main headings/text from `text-white` to `text-gray-900`.
  - Update secondary text to `text-gray-500` or `text-gray-600`.
  - Adjust "shimmer" effects to be visible on white (or remove if needed).
- **Remove Code Snippet:** Locate and remove the decorative code snippet element positioned behind the Logo.
- **Adjust Accents:** Update glow effects and borders to be subtle (e.g., `border-gray-200` instead of `border-white/10`) to fit the light theme.

### 2. Refactor `Footer.tsx` to Light Mode
- **Change Background:** Switch from `bg-[#050505]` to `bg-white` (or a very light gray like `bg-gray-50`).
- **Update Text Colors:**
  - Headings: `text-white` -> `text-gray-900`.
  - Links/Body: `text-gray-500` (maintain or adjust for contrast).
- **Update Borders:** `border-white/5` -> `border-gray-200`.
- **Update Status Section:** Change the dark container `bg-white/5` to a light container (e.g., `bg-gray-100` or `bg-gray-50`) with appropriate text contrast.

### 3. Remove `CTA` Section
- **Delete Component:** Delete `components/CTA.tsx` (optional, or just remove usage).
- **Remove Usage:** In `pages/Home.tsx`, remove the `<CTA />` import and component usage.
- **Verification:** Ensure the "Start building with Intent..." and associated text/buttons are completely gone.

## Verification Strategy
- **Visual Check:** Verify `Hero` and `Footer` are white with readable dark text.
- **Content Check:** Confirm the "Code Snippet" behind the logo is gone.
- **Section Check:** Confirm the `CTA` section is no longer rendered on the page.
- **Build:** Run `npm run build` to ensure no broken references (especially from removing CTA).

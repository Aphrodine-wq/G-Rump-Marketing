I will perform a comprehensive upgrade to the site focusing on iconography, G-Agent branding, Docs navigation, and Pricing page visuals.

### **Phase 1: Iconography Upgrade**
*   **Hero Section (`components/Hero.tsx`):**
    *   Replace the generic placeholders for **Microsoft** and **NVIDIA** with their **actual SVG icons** to improve professionalism.
    *   Refactor the "Powered by" row to accommodate these new visual assets properly.

### **Phase 2: G-Agent & Docs Enhancements**
*   **G-Agent (`components/Hero.tsx`):**
    *   Improve the "Meet G-Agent" card with a more sophisticated icon (e.g., a stylized brain/chip or custom SVG) and sharper copy that highlights its "Autonomous SRE" capabilities.
*   **Docs Site (`pages/Docs.tsx`, `components/DocsSidebar.tsx`):**
    *   Verify and fix any broken links in the sidebar.
    *   Ensure the styling is consistent with the new light theme (clean typography, proper spacing).

### **Phase 3: Footer & Pricing Updates**
*   **Footer (`components/Footer.tsx`):**
    *   Audit all `Link` components to ensure they route to valid pages (e.g., `/features`, `/pricing`, `/docs`).
    *   Fix any dead links or incorrect paths.
*   **Pricing Page (`pages/Pricing.tsx`):**
    *   Update the visual hierarchy of the pricing cards.
    *   Ensure the "Pro" plan stands out with a distinct border/shadow treatment.
    *   Refine the "Enterprise" section to be more compelling.

### **Phase 4: Verification**
*   **Build:** Run `npm run build` to ensure no type errors or broken imports.
*   **Test:** Use Puppeteer to verify the rendering of new icons and navigation paths.

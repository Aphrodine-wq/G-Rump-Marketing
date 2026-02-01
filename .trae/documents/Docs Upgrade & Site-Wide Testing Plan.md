I will upgrade the documentation site to match the new light theme and then perform comprehensive end-to-end testing using the Puppeteer MCP tools.

### **Phase 1: Docs Site Upgrade**
*   **Refactor `pages/Docs.tsx`:**
    *   Implement a cleaner, high-contrast **Light Mode** layout.
    *   Enhance typography (headers, links, code blocks) to be more readable and modern.
    *   Add a functional **Table of Contents** (Right Sidebar) that highlights the active section.
    *   Improve the **Breadcrumb** navigation.
*   **Refactor `components/DocsSidebar.tsx`:**
    *   Update the visual style to be minimal and clean (removing gray backgrounds, using crisp borders and accent colors).
    *   Ensure the active state is clearly visible with the new purple branding.

### **Phase 2: End-to-End Testing (Puppeteer)**
*   **Start Application:** Launch the development server (`npm run dev`) in the background.
*   **Execute Test Suite:** Use Puppeteer to simulate a user journey and verify critical paths:
    1.  **Home Page:** Verify the new "Architecture as Code" hero, check for the absence of blue elements, and validate the "Powered by" badges.
    2.  **Workflow Page:** Confirm the "Mission Control" UI loads with the new white theme.
    3.  **Features Page:** Validate the concise text and bento grid layout.
    4.  **Docs Page:** Test navigation, sidebar links, and ensure the new styling renders correctly.
*   **Verification:** I will take screenshots or capture page text during the test to confirm successful updates.

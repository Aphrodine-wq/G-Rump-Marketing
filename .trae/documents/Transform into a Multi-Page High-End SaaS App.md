I will transform the current single-page landing site into a full-scale multi-page application with high-end animations and expanded content.

### 1. Architecture & Core Upgrade
- **Install Routing Engine**: Add `react-router-dom` to enable real navigation (Home, Features, Pricing, Docs).
- **Install Animation Engine**: Add `framer-motion` for "20x better" cinema-quality entrance animations and page transitions.
- **Refactor Structure**: Move current sections into a dedicated `Home` page and create a clean `Layout` component.

### 2. Build "Actual Pages" (New Content)
I will create dedicated pages populated with professional "Architecture-as-Code" copy:
- **`/features`**: Expand the current "System Capabilities" into a full deep-dive page detailing the Rust Compiler, Swarm Agents, and Intent Parsing.
- **`/pricing`**: Create a standard SaaS pricing page (Hobby / Pro / Enterprise) with interactive toggles.
- **`/docs`**: Build a documentation shell with a sidebar layout to make the product feel "real".
- **`/workflow`**: A dedicated page for the "ModesAndFlows" interactive component, expanded with more details.

### 3. Visual & UX Polish ("20x Better")
- **Enhanced Navbar**: Update `Navbar.tsx` to support active states and real navigation links.
- **Page Transitions**: Add smooth fade/slide transitions between pages.
- **Micro-interactions**: Add hover states and scroll-triggered animations using `framer-motion`.

### 4. Implementation Steps
1.  Install dependencies: `react-router-dom`, `framer-motion`, `clsx`, `tailwind-merge`.
2.  Create `src/pages/` and `src/layouts/`.
3.  Implement `App.tsx` routing configuration.
4.  Build out `Features.tsx`, `Pricing.tsx`, and `Docs.tsx` pages.
5.  Refactor `Navbar.tsx` and `Footer.tsx` to work with the new router.

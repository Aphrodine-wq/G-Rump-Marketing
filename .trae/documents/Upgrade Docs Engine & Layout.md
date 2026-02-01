I will upgrade the documentation site to dynamically render the content from the `docs/` folder with a high-end, responsive layout.

### 1. Dependencies & Setup
- **Install**: `react-markdown`, `remark-gfm` (for tables), `rehype-raw` (for HTML in MD), `rehype-highlight` (for code blocks), `github-slugger` (for headings).
- **Styles**: Add `prose` (Typography plugin) styling for beautiful markdown rendering.

### 2. Architecture Changes
- **Route Update**: Change `/docs` to `/docs/*` in `App.tsx` to support deep linking (e.g., `/docs/getting-started`).
- **Content Loader**: Create a utility to load all `.md` files from `docs/` using Vite's `import.meta.glob`.

### 3. Component Refactor (`pages/Docs.tsx`)
I will completely rewrite `Docs.tsx` to include:
- **Sidebar Navigation**: A sticky sidebar organized by categories (Getting Started, Core, Features, API, Operations).
- **Dynamic Content**: A main area that renders the markdown file corresponding to the current URL slug.
- **On-Page Table of Contents**: A right-side floating TOC for the current article.
- **Breadcrumbs**: For easy navigation.

### 4. Visual Polish
- **Theme**: Match the "G-Rump" purple/white aesthetic.
- **Code Blocks**: Style code blocks with a dark theme and copy buttons.
- **Typography**: Use `Inter` and `JetBrains Mono` with careful spacing.

### 5. Implementation Steps
1.  Install markdown dependencies.
2.  Update `App.tsx` routes.
3.  Create `src/utils/docsLoader.ts` to map slugs to file content.
4.  Implement `src/components/DocsSidebar.tsx`.
5.  Refactor `src/pages/Docs.tsx` to integrate everything.

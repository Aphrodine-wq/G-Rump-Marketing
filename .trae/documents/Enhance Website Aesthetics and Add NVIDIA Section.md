I will update the website to improve its aesthetic, swap navigation items, and add a new NVIDIA-powered section.

### **Phase 1: Navigation Update**
1.  **Modify `Navbar.tsx`**: Swap the order of "Pricing" and "Docs" in the `navLinks` array.

### **Phase 2: New "Powered by NVIDIA" Section**
2.  **Create `components/NvidiaSection.tsx`**:
    *   **Visual Style**: Dark, futuristic theme using NVIDIA's signature green (`#76b900`) and black colors.
    *   **Content**: Highlight "NemoTRON" models, "Inference Speed", and "Accuracy".
    *   **Graphics**: A neural network or chip visualization (using CSS/SVG).
3.  **Integrate**: Add this section to `Home.tsx`, likely after the "System Architecture" or "Performance" section.

### **Phase 3: Visual Polish & Refactoring**
4.  **Refactor `PerformanceChart.tsx`**:
    *   Update the "Comparison Bar" to use the new `Card` component for consistency.
    *   Enhance typography and spacing.
5.  **Refactor `SystemArchitecture.tsx`**:
    *   The current design is already quite custom and interactive (SVG graph). I will polish the container to match the new "vertical split" Workflow style (e.g., consistent border radius, shadows) but keep the core interactive graph as it's high quality.
6.  **Global Tweaks**:
    *   Ensure consistent section spacing and background transitions in `Home.tsx`.

### **Phase 4: Verification**
7.  **Review**: Check the flow: Hero → TrustedBy → Features → Workflow → Architecture → NVIDIA Section → Performance → Testimonials → CTA.

This plan addresses "look better", "swap nav", and "add NVIDIA section" comprehensively.
I will completely overhaul the **System Architecture** section to transform it from a static diagram into a dynamic, "living" visualization of the G-Rump platform.

**Goal:** Create a "10x better" visual experience that demonstrates the real-time processing of intent, logic compilation, and infrastructure orchestration.

### 1. Visual Overhaul ("Holographic Blueprint")
- **New Aesthetic:** Switch to a high-fidelity, dark-mode "Engineering HUD" style (matching the NVIDIA section).
- **Layered Layout:** Organize the architecture into three distinct vertical zones:
  1.  **Interaction Layer:** (Top) Users, CLI, VS Code.
  2.  **Intelligence Core:** (Middle) The "Brain" – Rust Compiler & AI Gateway.
  3.  **Infrastructure Fabric:** (Bottom) The "Metal" – Kubernetes, Cloud Regions, Data.

### 2. "Live" Simulation Features
- **Data Flow Animation:** Instead of static lines, implement animated "packets" that travel through the system:
  - *Sequence:* User Input → Rust Parser → AI Model → Infrastructure Provisioning.
- **Real-Time Telemetry Sidebar:** Add a simulated "System Status" panel on the right side displaying:
  - active_threads: 12
  - compilation_time: 4ms
  - cluster_health: 100%

### 3. Component Architecture Refactor
- **Refactor `SystemArchitecture.tsx`:**
  - Replace the simple SVG `rect` nodes with detailed **"Module Cards"** containing icons, status lights, and mini-sparklines.
  - Implement a `useSimulationLoop` hook to cycle through the "Intent -> Deploy" states automatically.
  - Enhance the "Detail View" to slide in as a glass-morphism overlay with deeper technical specs.

### 4. Implementation Steps
1.  **Update `SystemArchitecture.tsx`**: Rewrite the component to support the new 3-layer layout.
2.  **Create `ArchitectureNode` Component**: A reusable, highly styled node component with hover states and "active" animations.
3.  **Add Animation Logic**: Use `framer-motion` layout animations to orchestrate the "flow" of data packets.
4.  **Integrate Telemetry**: Build the side panel for simulated real-time metrics.

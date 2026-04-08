# Design System Specification: High-Performance Nutrition & Coaching

## 1. Overview & Creative North Star: "The Clinical Edge"
The Creative North Star for this design system is **"The Clinical Edge."** It represents the intersection of elite sports science and high-end editorial aesthetics. Unlike generic fitness apps that rely on heavy shadows and loud gradients, this system uses "Restrained Power." 

We break the "standard template" look through **Intentional Asymmetry** and **Tonal Depth**. The UI should feel like a precision instrument—dark, sharp, and focused—where the "Verde Neon" acts as a surgical laser, highlighting only the most vital biometric data. We favor breathing room over borders, and layered glass over flat boxes.

---

## 2. Colors & Surface Architecture

### Palette Definition
The palette is rooted in the `surface_container` tokens to create a "void-like" depth that makes the neon accents pop with clinical precision.

*   **Primary (The Laser):** `#CCFF00` (High-performance indicator). Use for progress, CTAs, and critical data points.
*   **Surface (The Void):** `#131313` (Core background).
*   **Neutrals:** Anthracite tones (`#201F1F` to `#353534`) for structural depth.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Boundaries must be defined solely through background color shifts. For example, a card using `surface_container_highest` should sit on a `surface` background. The change in luminance is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of polished obsidian and frosted glass:
*   **Level 0 (Base):** `surface` (#131313) - The canvas.
*   **Level 1 (Sections):** `surface_container_low` (#1C1B1B) - Large content areas.
*   **Level 2 (Cards):** `surface_container_high` (#2A2A2A) - Interactive elements.
*   **Level 3 (Floating):** `surface_container_highest` (#353534) - Modals and tooltips.

### The "Glass & Gradient" Rule
To elevate beyond "out-of-the-box" UI, use Glassmorphism for floating overlays. Apply a `backdrop-blur` of 12px-20px combined with `surface_variant` at 40% opacity. For primary CTAs, use a subtle linear gradient from `primary` (#CCFF00) to `primary_fixed_dim` (#ABD600) at a 135° angle to give the neon "soul."

---

## 3. Typography: Editorial Authority
The system uses a dual-font approach to balance human performance with clinical data.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and wide apertures. It feels technological and modern. Use `display-lg` (3.5rem) for hero performance metrics to create an "Editorial Brutalist" look.
*   **Body & Labels (Inter):** The gold standard for readability in data-heavy environments. Use `body-md` (0.875rem) for nutritional breakdowns to ensure clarity.

**Hierarchy Note:** Always lead with a massive `headline` or `display` token for the primary metric (e.g., Calories Remaining), and use `label-sm` in `on_surface_variant` for metadata. This high contrast in scale creates an expensive, custom-tailored feel.

---

## 4. Elevation & Depth

### The Layering Principle
Forget drop shadows. Depth is achieved by "stacking" the surface-container tiers. 
*   *Action:* Place a `surface_container_lowest` button inside a `surface_container_high` card. The "inset" feel suggests a tactile, high-tech console.

### Ambient Shadows
If a floating effect is required for a modal, use an "Ambient Glow" instead of a shadow:
*   **Shadow Color:** `#000000` at 60% opacity.
*   **Blur:** 40px.
*   **Spread:** -5px.
This makes the element feel like it’s physically hovering in a dark room.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the `outline_variant` token at **15% opacity**. It should be barely perceptible—a "whisper" of a line.

---

## 5. Components

### Buttons: The Kinetic Trigger
*   **Primary:** Solid `primary` (#CCFF00) with `on_primary` (#283500) text. Border radius: `md` (0.375rem).
*   **Secondary:** Ghost style. No background, `outline` border at 20% opacity. On hover, background shifts to `surface_container_high`.
*   **Interaction:** On press, a subtle scale down (98%) to simulate a physical button click.

### Cards & Lists: High-Fidelity Data
*   **Card Style:** Never use dividers. Use vertical spacing (token `8` or `10`) to separate list items. 
*   **The Progress Ring:** Use the `primary` neon for the active state and `surface_variant` for the "track." The stroke should be thin (2px) to maintain a "clinical" rather than "playful" look.

### Input Fields: Precision Entry
*   **Style:** `surface_container_lowest` background. No bottom line.
*   **Active State:** The label shifts to `primary` (#CCFF00).
*   **Error State:** Use `error` (#FFB4AB) only for the helper text; keep the box neutral to avoid breaking the "dark mode" immersion.

### Signature Component: The Performance Macro-Grid
Instead of a list, use an asymmetric grid to display Protein, Carbs, and Fats. The primary macro (e.g., Protein) should take up 60% of the horizontal space, with others nested to the right. This breaks the "boring" 3-column grid.

---

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Place labels off-center or use overlapping glass elements to create a premium, non-template look.
*   **Trust the Negative Space:** Use spacing token `16` (5.5rem) between major sections. Crowding is the enemy of luxury.
*   **Color Economy:** Use the Verde Neon (#CCFF00) for less than 5% of the total UI. It is a highlighter, not a background.

### Don't:
*   **Don't use 100% white text:** Use `on_surface` (#E5E2E1). It reduces eye strain in dark mode and feels more sophisticated.
*   **Don't use Rounded Corners `full`:** Except for small chips. For cards and buttons, stick to `md` (0.375rem) or `lg` (0.5rem) to maintain a "sharper" clinical edge.
*   **Don't use Dividers:** If you feel you need a line to separate content, you actually need more whitespace (`spacing 6` or `8`).
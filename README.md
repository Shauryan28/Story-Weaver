# Story Weaver

Story Weaver is an interactive, AI-powered storytelling application that transforms your daily inputs into woven narrative segments. Designed with a unique **Dark Mode & Hand-Drawn** aesthetic, it features physics-based interactions and a "chronicle" of your generated stories.

## Features

- **AI Story Generation**: Input your daily thoughts or story ideas, and watch them be woven into a narrative segment.
- **Dark Mode Aesthetic**: A deep, immersive dark theme (`#1a1a1a`) with white chalk-like text (`Patrick Hand` font).
- **Interactive Background**: 
  - **Repulsion Physics**: Background words float and gently repel away from your cursor as you move it, creating a "parting the sea" effect.
  - **Dictionary Density**: A rich backdrop of thematic words (mystery, shadow, echo...) filling the screen.
- **My Chronicle**: A history view displaying your past woven stories as hand-drawn cards.
- **Export**: Download your entire chronicle as a text file.

## Tech Stack

- **React**: UI Framework.
- **Vite**: Build tool.
- **Framer Motion**: For UI transitions and animations.
- **Canvas API**: For the high-performance background physics effect.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run locally**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components/ModernLayout.jsx`: Main layout with Sidebar and Content area.
- `src/components/RepulsionBackground.jsx`: The physics-based background effect.
- `src/components/DailyEntryInput.jsx`: (Deprecated/Replaced by ModernEditor).
- `src/components/ModernEditor.jsx`: The main writing interface.
- `src/components/ModernHistory.jsx`: The list of generated stories.
- `src/services/storyWeaverAI.js`: Mock AI service for story generation.

## Aesthetics

The design follows a "Dark Notebook" theme:
- Fonts: `Patrick Hand`, `Architects Daughter`.
- Colors: Dark Grey/Black background, White accent text.
- Feel: Hand-drawn borders, wobbly lines, and fluid interactive elements.

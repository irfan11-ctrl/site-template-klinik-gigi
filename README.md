# Web App Builder Engine

A pure-logic website builder that generates production-ready HTML/CSS/JS without AI or external dependencies.

## Features
- **No-Code Editor**: Clean UI to configure site settings.
- **Logic Engine**: Deterministic generation of "Premium" landing pages.
- **Realtime Preview**: Instant feedback loop.
- **Export to ZIP**: Download full source code.
- **Trial System**: Watermark injection and upgrade path.

## Tech Stack
- **Builder**: React + Vite + Tailwind CSS (v3)
- **Engine**: Pure JavaScript (String Template Generation)
- **Export**: JSZip

## Setup
1. `npm install`
2. `npm run dev` (Starts Builder)
3. `npm run build` (Builds for Production)

## Architecture
- `src/core/generator.js`: The brain. Converts config -> strings.
- `src/core/schema.js`: The data model.
- `src/core/presets/`: Reusable templates.

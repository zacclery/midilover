# midi-lover

Virtual instruments for pixel people. A lo-fi landing page for MIDI tools and browser-based instruments, built with SvelteKit and pixel art canvas animations.

## Stack

- SvelteKit 2 with Svelte 5 (runes)
- Vite 7
- TypeScript
- Node adapter for production builds
- JetBrains Mono typeface

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- pnpm 8+

### Install

```sh
pnpm install
```

### Dev

```sh
pnpm dev
```

Opens at http://localhost:5173.

### Build

```sh
pnpm build
```

### Preview production build

```sh
pnpm preview
```

### Type check

```sh
pnpm check
```

## Docker

```sh
docker compose up --build -d
```

Serves on http://localhost:3000.

## Project Structure

```
src/
  app.css                            global tokens and reset
  routes/
    +layout.svelte                   app shell, floating hearts background
    +page.svelte                     landing page
  lib/
    utils/
      pixel.ts                       canvas drawing helpers and palette
    components/
      layout/
        Header.svelte
        Footer.svelte
      pixel/
        PixelCanvas.svelte           generic animated canvas wrapper
        HeroScene.svelte             main hero pixel art scene
        HeartLogoCanvas.svelte       pulsing heart in header
        FloatingHeartsCanvas.svelte  subtle background hearts
        ProductCardCanvas.svelte     per-product mini animations
        FooterHeartCanvas.svelte     footer brand heart
        ManifestoCanvas.svelte       character with hearts
      ui/
        PixelButton.svelte
        PixelBorder.svelte
        PixelLoader.svelte
```

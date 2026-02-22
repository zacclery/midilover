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

## Deployment

Hosted on a Digital Ocean droplet with nginx reverse proxy and Let's Encrypt SSL.

### Droplet Setup

1. Create a droplet (Ubuntu, cheapest tier is fine)
2. SSH in and install Docker:
   ```sh
   apt update && apt upgrade -y
   curl -fsSL https://get.docker.com | sh
   ```
3. Configure firewall:
   ```sh
   ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw enable
   ```
4. Add an SSH deploy key so the droplet can pull from GitHub:
   ```sh
   ssh-keygen -t ed25519 -C "midilover-droplet" -N "" -f ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```
   Add the public key at github.com/zacclery/midilover/settings/keys as a deploy key (read-only).
5. Clone the repo:
   ```sh
   git clone git@github.com:zacclery/midilover.git /opt/midilover
   ```

### DNS

Point these A records to your droplet IP (on GoDaddy or wherever the domain is registered):

| Type | Name | Value |
|------|------|-------|
| A | @ | `DROPLET_IP` |
| A | www | `DROPLET_IP` |

Verify propagation: `dig midilover.com +short`

### SSL Setup

Once DNS resolves to the droplet:

```sh
cd /opt/midilover
./scripts/setup-https.sh midilover.com your@email.com
```

This requests a Let's Encrypt certificate and starts all services. The email is only used by Let's Encrypt for expiry warnings — it's never public.

### Auto-Deploy (GitHub Actions)

Pushes to `main` automatically deploy via `.github/workflows/deploy.yml`.

Requires two **repository secrets** at github.com/zacclery/midilover/settings/secrets/actions:

| Secret | Value |
|--------|-------|
| `DROPLET_IP` | Droplet's IPv4 address |
| `SSH_PRIVATE_KEY` | Content of `~/.ssh/id_ed25519` from the droplet (the private key, not `.pub`) |

### Maintenance

Run from the droplet at `/opt/midilover`:

```sh
make maintenance-on      # stop app, nginx shows maintenance page
make maintenance-off     # restart app
make restart-all         # restart all services
make logs                # tail app logs
```

## Project Structure

```
src/
  app.css                            global tokens and reset
  app.html                           HTML shell with favicon
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
nginx/
  nginx.conf                         reverse proxy, SSL, rate limiting
  maintenance.html                   themed maintenance page
scripts/
  setup-https.sh                     Let's Encrypt cert setup
.github/
  workflows/
    deploy.yml                       auto-deploy on push to main
Dockerfile                           multi-stage build
docker-compose.yml                   app + nginx + certbot
Makefile                             server maintenance shortcuts
```

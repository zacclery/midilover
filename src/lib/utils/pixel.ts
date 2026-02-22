/**
 * Pure fillRect pixel drawing helpers.
 * All coordinates are in native low-res pixels.
 */

/** JS-side palette mirroring CSS tokens (canvas can't read CSS vars). */
export const PALETTE = {
  bg: '#0a0a0c',
  bgRaised: '#111114',
  bgSurface: '#18181c',
  bgHover: '#1f1f24',
  fg: '#d4d4d8',
  fgMuted: '#71717a',
  fgDim: '#3f3f46',
  accent: '#b05060',
  accentDim: '#7a3a44',
  accentBright: '#d06878',
  grey4: '#52525b',
  grey6: '#a1a1aa',
  border: '#27272a',
  borderHover: '#3f3f46'
} as const;

/* ------------------------------------------------------------------ */
/*  Existing scene draw functions (updated to greyscale + accent)     */
/* ------------------------------------------------------------------ */

export function drawSynth(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  // body
  ctx.fillStyle = PALETTE.border;
  ctx.fillRect(x, y, 32, 20);

  // top panel
  ctx.fillStyle = PALETTE.fgDim;
  ctx.fillRect(x + 1, y + 1, 30, 8);

  // keys — alternate black/white, shift based on frame
  const keyOffset = frame % 2;
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = (i + keyOffset) % 3 === 0 ? PALETTE.bgSurface : PALETTE.fg;
    ctx.fillRect(x + 2 + i * 3, y + 11, 2, 7);
  }

  // knobs — one accent, rest greyscale
  const knobColors = [PALETTE.accent, PALETTE.grey6, PALETTE.grey4, PALETTE.accentDim];
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = knobColors[(i + frame) % 4];
    ctx.fillRect(x + 3 + i * 7, y + 3, 3, 3);
  }
}

export function drawWaveform(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  const width = 48;
  const midY = y + 8;
  ctx.fillStyle = PALETTE.grey6;

  const freq = (2 * Math.PI) / width;
  const scroll = frame * 1.5;
  let prevY = midY - Math.round(Math.sin(scroll * freq) * 6);

  for (let i = 0; i < width; i++) {
    const val = Math.sin((i + scroll) * freq) * 6;
    const py = midY - Math.round(val);

    const top = Math.min(prevY, py);
    const bot = Math.max(prevY, py);
    ctx.fillRect(x + i, top, 1, bot - top + 1);
    prevY = py;
  }
}

export function drawCharacter(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  const bob = frame % 4 < 2 ? 0 : 1;

  // head
  ctx.fillStyle = PALETTE.fg;
  ctx.fillRect(x + 2, y - bob, 4, 4);

  // eyes
  ctx.fillStyle = PALETTE.bg;
  ctx.fillRect(x + 3, y + 1 - bob, 1, 1);
  ctx.fillRect(x + 5, y + 1 - bob, 1, 1);

  // body
  ctx.fillStyle = PALETTE.grey4;
  ctx.fillRect(x + 1, y + 4 - bob, 6, 6);

  // headphones
  ctx.fillStyle = PALETTE.accent;
  ctx.fillRect(x + 1, y - bob, 1, 3);
  ctx.fillRect(x + 6, y - bob, 1, 3);
  ctx.fillRect(x + 1, y - 1 - bob, 6, 1);

  // arms — bounce
  const armLift = frame % 4 === 1 || frame % 4 === 3 ? 1 : 0;
  ctx.fillStyle = PALETTE.fg;
  ctx.fillRect(x, y + 5 - bob - armLift, 1, 3);
  ctx.fillRect(x + 7, y + 5 - bob + armLift, 1, 3);

  // legs
  ctx.fillStyle = PALETTE.fgDim;
  ctx.fillRect(x + 2, y + 10 - bob, 2, 3);
  ctx.fillRect(x + 4, y + 10 - bob, 2, 3);
}

export function drawNotes(ctx: CanvasRenderingContext2D, frame: number, width: number) {
  const noteColors = [PALETTE.accent, PALETTE.grey6, PALETTE.accentDim, PALETTE.grey4, PALETTE.accentBright];
  const notes = [
    { baseX: 60, baseY: 40 },
    { baseX: 180, baseY: 30 },
    { baseX: 240, baseY: 50 },
    { baseX: 120, baseY: 25 },
    { baseX: 280, baseY: 45 }
  ];

  for (let i = 0; i < notes.length; i++) {
    const n = notes[i];
    const floatY = n.baseY + Math.sin((frame + i * 10) * 0.15) * 8;
    const floatX = (n.baseX + frame * (0.3 + i * 0.1)) % (width + 8) - 4;

    ctx.fillStyle = noteColors[i % noteColors.length];
    // note head
    ctx.fillRect(Math.floor(floatX), Math.floor(floatY), 3, 2);
    // stem
    ctx.fillRect(Math.floor(floatX) + 2, Math.floor(floatY) - 4, 1, 5);
    // flag
    ctx.fillRect(Math.floor(floatX) + 3, Math.floor(floatY) - 4, 1, 2);
  }
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = PALETTE.bgRaised;
  for (let x = 0; x < width; x += 16) {
    for (let y = 0; y < height; y++) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
  for (let y = 0; y < height; y += 16) {
    for (let x = 0; x < width; x++) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  New draw functions: hearts, mini scenes, pixel text               */
/* ------------------------------------------------------------------ */

/** Classic 5×5 pixel heart shape, scaleable by `size` (each cell = size px). */
export function drawPixelHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.fillStyle = color;
  // 5×5 heart bitmap
  const rows = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
  ];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c]) {
        ctx.fillRect(x + c * size, y + r * size, size, size);
      }
    }
  }
}

/** Deterministic floating hearts with sine wobble across the full canvas. */
export function drawFloatingHearts(
  ctx: CanvasRenderingContext2D,
  frame: number,
  w: number,
  h: number,
  count: number
) {
  for (let i = 0; i < count; i++) {
    // deterministic seed positions
    const seed = i * 137.5;
    const baseX = (seed * 7.3) % w;
    const speed = 0.2 + (i % 3) * 0.15;
    const floatY = (h + 20 - (frame * speed + seed) % (h + 40));
    const wobbleX = baseX + Math.sin((frame + i * 20) * 0.08) * 6;
    const col = i % 2 === 0 ? PALETTE.accent : PALETTE.accentDim;
    drawPixelHeart(ctx, Math.floor(wobbleX), Math.floor(floatY), 1, col);
  }
}

/** Deterministic floating notes with sine wobble across the full canvas. */
export function drawFloatingNotes(
  ctx: CanvasRenderingContext2D,
  frame: number,
  w: number,
  h: number,
  count: number
) {
  const colors = [PALETTE.accent, PALETTE.grey6, PALETTE.accentDim, PALETTE.grey4];
  for (let i = 0; i < count; i++) {
    const seed = i * 193.7;
    const baseX = (seed * 5.1) % w;
    const speed = 0.15 + (i % 3) * 0.1;
    const floatY = (h + 20 - (frame * speed + seed) % (h + 40));
    const wobbleX = baseX + Math.sin((frame + i * 15) * 0.06) * 5;
    const x = Math.floor(wobbleX);
    const y = Math.floor(floatY);

    ctx.fillStyle = colors[i % colors.length];
    // note head
    ctx.fillRect(x, y, 3, 2);
    // stem
    ctx.fillRect(x + 2, y - 4, 1, 5);
    // flag
    ctx.fillRect(x + 3, y - 4, 1, 2);
  }
}

/** Single heart that alternates between size 1 and size 2 (pulsing). */
export function drawPulsingHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  frame: number,
  color: string
) {
  const big = Math.floor(frame / 4) % 2 === 0;
  const size = big ? 2 : 1;
  const heartW = 5 * size;
  const heartH = 5 * size;
  drawPixelHeart(ctx, cx - Math.floor(heartW / 2), cy - Math.floor(heartH / 2), size, color);
}

/** Compact waveform for small canvases. */
export function drawMiniWaveform(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  frame: number,
  color: string
) {
  ctx.fillStyle = color;
  const midY = y + 4;
  const freq = (2 * Math.PI) / width;
  const scroll = frame * 0.5;
  let prevY = midY - Math.round(Math.sin(scroll * freq) * 4);

  for (let i = 0; i < width; i++) {
    const val = Math.sin((i + scroll) * freq) * 4;
    const py = midY - Math.round(val);

    // draw vertical span between previous and current y to connect the dots
    const top = Math.min(prevY, py);
    const bot = Math.max(prevY, py);
    ctx.fillRect(x + i, top, 1, bot - top + 1);
    prevY = py;
  }
}

/** Tiny 3×5 block-letter pixel text renderer. */
export function drawPixelText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string
) {
  ctx.fillStyle = color;
  const glyphs: Record<string, number[][]> = {
    m: [[1,0,1],[1,1,1],[1,0,1],[1,0,1],[1,0,1]],
    i: [[1],[1],[1],[1],[1]],
    d: [[1,1,0],[1,0,1],[1,0,1],[1,0,1],[1,1,0]],
    '-': [[0,0,0],[0,0,0],[1,1,1],[0,0,0],[0,0,0]],
    l: [[1,0],[1,0],[1,0],[1,0],[1,1]],
    o: [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
    v: [[1,0,1],[1,0,1],[1,0,1],[0,1,0],[0,1,0]],
    e: [[1,1,1],[1,0,0],[1,1,0],[1,0,0],[1,1,1]],
    r: [[1,1,0],[1,0,1],[1,1,0],[1,0,1],[1,0,1]]
  };

  let cx = x;
  for (const ch of text) {
    const g = glyphs[ch];
    if (!g) { cx += 4; continue; }
    for (let row = 0; row < g.length; row++) {
      for (let col = 0; col < g[row].length; col++) {
        if (g[row][col]) {
          ctx.fillRect(cx + col, y + row, 1, 1);
        }
      }
    }
    cx += (g[0]?.length ?? 0) + 1;
  }
}

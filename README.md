# 🪔 Jyotirmaya — Happy Diwali Wishes Portfolio

> **"May a Thousand Sacred Lamps Illuminate Your Path"**
> A candlelit, heritage-inspired portfolio of heartfelt **Deepavali wishes**, **Vedic shlokas**, a **5-Day Panchang almanac**, a live **Community Wall of Lit Diyas**, and an artisan **Royal Patrika Greeting Card Studio** — built entirely with hand-crafted SVG, Canvas, and Web Audio.

---

## ✨ Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Detailed Feature Guide](#-detailed-feature-guide)
- [Design System](#-design-system)
- [Data Model](#-data-model)
- [How The Magic Works](#-how-the-magic-works)
- [Customization Guide](#-customization-guide)
- [Accessibility](#-accessibility)
- [Browser Support](#-browser-support)
- [Deployment](#-deployment)
- [Credits](#-credits)

---

## 📖 Overview

**Jyotirmaya** (from *Jyoti* — "light" / *Maya* — "illusion of the world") is a single-page React application that blends the warmth of an Indian Diwali celebration with the polish of a modern creative portfolio.

Rather than being a static greeting card, the site is built as an **interactive ritual**:

1. Visitors arrive at a **royal twilight courtyard** where a **Sapta-Deepam (7-diya) sacred altar** glows.
2. They **kindle terracotta diyas** to illuminate the space, triggering flame physics, golden auras, sparkler bursts, and synthesized temple-bell chimes.
3. They browse a **curated treasury of 15 literary blessings** across family, friends, professional, and shloka collections — each with one-tap copy and bookmarking.
4. They craft a **bespoke greeting card** in the Royal Patrika Studio and export it as a **high-resolution PNG** or formatted WhatsApp text.
5. They explore the **5-day Deepavali Panchang** with auspicious Muhurat windows, and leave a blessing on the **Community Diya Wall**.

Everything — every diya, flame, rangoli, petal, bell, and motif — is drawn with **custom SVG**. There are **no stock images** of diyas or decorations. The only generated art logic lives in vector code.

---

## 🎯 Key Features

### ✨ Interactive 7-Diya Sacred Altar
- **7 unique sculpted diyas** — each with its own Sanskrit blessing, meaning, and ceremonial placement (*Aarogya*, *Vidya*, *Kutumb*, *Mahalakshmi Akhand* centerpiece, *Shanti*, *Siddhi*, *Nava-Aarambh*).
- **Multi-layered flame physics** — an outer saffron-gold tear, a white-gold inner core, a blue-violet hot wick base, and rising golden embers, each with independent CSS keyframe animation.
- **Dynamic page illumination** — the ambient radial backdrop, rangoli mandala, and ambient ember density all intensify as more diyas are lit.
- **"Light All 7"** mega-action with a 7-note **Maha-Aarti arpeggio** and a 5-point grand sparkler celebration.
- Clicking a lit diya pauses it; clicking again re-ignites it.

### 📜 Curated Wishes Portfolio
- **15 original blessings** in 4 categories: *Family & Elders*, *Friends & Joy*, *Professional & Clients*, and *Poetic & Shlokas*.
- Real **Devanagari Sanskrit** shlokas including *"ॐ असतो मा सद्गमय…"*, *"दीपज्योतिः परब्रह्म…"*, and *"वक्रतुण्ड महाकाय…"*.
- **5 filter pills** with live counts, **instant keyword search**, and a **Saved Shortlist** filter with bulk-copy export.
- **One-click copy** to clipboard with sparkle burst + chime feedback.
- **"Card Studio" handoff** — load any wish directly into the card designer.
- Each card is framed with **double-hairline Zari borders** and four ornamental corner flourishes.

### 🎨 Royal Patrika Greeting Card Studio
- **4 premium palettes**: *Marigold Zari Leaf* (velvet + 24K gold), *Royal Sindoor Silk* (Banarasi crimson + antique brass), *Peacock Nilaya Night* (Jaipur sapphire + emerald), and *Tanjore Ivory Kharita* (raw silk parchment + kumkum ink).
- **5 sacred seal emblems**: Brass Deepam, Sacred Lotus, Mangal Kalash, Vigneshwara, Mayur Plume.
- **Live preview** with real-time typography, salutation, and signature updates.
- **High-resolution PNG export** (1200 × 1520px) rendered on an HTML5 `<canvas>` — zari borders, corner medallions, Sanskrit invocation header, and a royal footer stamp.
- **Formatted text copy** tuned for WhatsApp and messaging apps.
- **Fullscreen ceremonial showcase modal**.
- **Pin to Community Wall** — publish your card straight into the shared courtyard.

### 📅 5-Day Deepavali Panchang
- Interactive almanac for **Dhanteras**, **Choti Diwali**, **Badi Diwali (Lakshmi-Ganesha Puja)**, **Govardhan Puja**, and **Bhai Dooj**.
- Each day exposes: **tithi**, **Auspicious Muhurat window**, **ritual highlight**, **historical significance**, and a **tailored blessing**.
- Blessings are copyable and can be loaded into the Card Studio.

### 🕯️ Community Wall of Lit Diyas
- Visitors can **light their own virtual diya** and publish a blessing to a shared grid.
- Choose from **3 flame auras**: *Marigold Gold*, *Sindoor Crimson*, *Peacock Neel*.
- **"Send Light"** reaction button with sparkler burst, bell chime, and live like counts.
- Posts persist to **`localStorage`** so the courtyard survives refreshes.
- Ships with 6 authentic seed blessings from across India and the diaspora.

### 🎨 Ambient Atmosphere
- **Floating golden ember canvas** that responds to the number of lit diyas.
- **Interactive phuljhari sparkler cursor trail** (toggleable).
- **Concentric rotating Rangoli Mandala** (counter-rotating rings) whose opacity and fill respond to diya count.
- **Marigold & mango-leaf Toran** (Bandhanwar) header with swaying brass bells.
- **Web Audio API** temple-bell and sitar-harmonic synthesizer — zero audio files.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19.2.6 |
| **Build Tool** | Vite 7.3.2 |
| **Styling** | Tailwind CSS 4.1.17 (`@tailwindcss/vite`) |
| **Icons** | lucide-react |
| **Type Safety** | TypeScript 5.9.3 |
| **Graphics** | Hand-authored inline **SVG**, HTML5 **Canvas 2D** |
| **Audio** | Native **Web Audio API** (oscillators + gain envelopes) |
| **Persistence** | Browser **localStorage** |
| **Build Output** | `vite-plugin-singlefile` — ships as one self-contained `index.html` |

> **Zero heavy assets.** No image downloads, no icon fonts, no audio files — everything is generated at runtime.

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+   (recommended: 20 or 22)
npm 9+
```

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url> jyotirmaya
cd jyotirmaya

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be live at **`http://localhost:5173`**.

### Available Scripts

```bash
npm run dev       # Start Vite dev server with hot module reloading
npm run build     # Type-check and build production bundle to dist/
npm run preview   # Locally preview the production build
```

### Production Build

```bash
npm run build
```

The build inlines all JS and CSS into a single **`dist/index.html`** file (~337 KB raw / ~98 KB gzipped) — perfect for static hosting on Netlify, Vercel, GitHub Pages, or any CDN.

---

## 📁 Project Structure

```
jyotirmaya/
├── index.html                  # Document shell, Google Fonts, dark theme class
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind + singlefile plugin config
│
├── src/
│   ├── main.tsx                # React root entry point
│   ├── index.css               # Tailwind import, design tokens, keyframes, utilities
│   ├── App.tsx                 # Main orchestrator: state, layout, section composition
│   │
│   ├── data/
│   │   └── diwaliData.ts       # All content: wishes, diyas, panchang, themes, wall posts
│   │
│   ├── utils/
│   │   ├── cn.ts               # clsx + tailwind-merge class helper
│   │   ├── soundChimes.ts      # Web Audio temple-bell / aarti synthesizer
│   │   └── exportCardCanvas.ts # 1200×1520 PNG greeting card renderer
│   │
│   └── components/
│       ├── DiwaliMotifs.tsx    # InteractiveDiyaSvg, MotifEmblemSvg,
│       │                       # RangoliMandalaSvg, MarigoldToranHeader, ZariCornerFlourish
│       ├── AmbientSparkleCanvas.tsx  # Ember + sparkler particle system
│       ├── WishesPortfolioSection.tsx # Filterable, searchable wish grid
│       ├── GreetingCardStudio.tsx     # Card designer + live preview + export
│       └── PanchangAndWallSection.tsx # Panchang almanac + Community Diya Wall
│
└── dist/                       # Production build output (single-file)
```

---

## 🧭 Detailed Feature Guide

### Navigation

A single **floating glass pill navbar** sticks below the top of the viewport. It contains:

- **Brand mark** — gold flame monogram linking back to the courtyard.
- **4 anchor links** — *Light a Diya*, *Wishes*, *Card Studio*, *Panchang & Wall* (the last is hidden on small screens).
- **Live diya counter pill** — shows `🪔 3/7` and updates as you light lamps.
- **Sound toggle** — mutes/unmutes all temple-bell chimes globally.

A toast notification appears in the bottom-right whenever a wish or panchang blessing is loaded into the Card Studio.

### The Courtyard (`#courtyard`)

| Interaction | Result |
|---|---|
| Click an unlit diya | Ignites its flame, plays a pitch-matched bell chime, bursts 36 sparks, updates the mantra toast and ambient aura |
| Click a lit diya | Pauses the flame (flame + halo extinguish, status reads *"paused"*) |
| **Light All 7 Sacred Diyas** | Lights every lamp, plays a 7-note Maha-Aarti arpeggio, fires a 5-point grand sparkler celebration |
| **Reset Altar to Single Lamp** | Returns to just the Mahalakshmi centerpiece |
| **Phuljhari Sparkler Trail** | Toggles the cursor-following spark particle effect |

### The Wishes Portfolio (`#wishes-portfolio`)

- **Filter pills** — `All Blessings` / `Family & Elders` / `Friends & Joy` / `Professional & Clients` / `Poetic & Shlokas`, plus a red **Saved Shortlist** pill.
- **Search** — matches the wish body, category label, and Sanskrit line (e.g. try *"Lakshmi"*, *"kaju katli"*, *"peace"*).
- **Bookmark** — the heart-style bookmark toggles membership in the shortlist.
- **Copy Wish** — copies the Sanskrit line + blessing + `🪔 Shubh Deepavali` signature; shows a green *"Copied ✨"* state.
- **Copy Shortlist** — bundles every saved wish into a single, neatly separated text block.
- **Card Studio** — loads the wish body, motif, recipient, and Sanskrit header into the designer and scrolls you there.

### The Card Studio (`#card-studio`)

**Controls (left column):**
1. **Recipient Name** — with 5 quick-pick chips (Maa & Papa, Priya & Rohan, etc.).
2. **Sender Signature** — your name or family name.
3. **Blessing Message** — up to 320 characters, with an *"Inspire Me"* button that cycles through all 15 curated presets, an optional **Sanskrit invocation header**, and 3 pre-built mantras.
4. **Royal Patrika Palette** — 4 themes with live gradient swatches.
5. **Sacred Seal Emblem** — 5 motifs.

**Preview & actions (right column):**
- Live card with twin miniature lit diyas framing the emblem medallion.
- **Download Card (High-Res PNG)** — 1200 × 1520px, fully rendered with borders, corner medallions, invocation, and metadata stamp.
- **Copy Formatted Text Card** — Unicode box-drawing formatted for WhatsApp.
- **Fullscreen Showcase** — a ceremonial, blurred-glass presentation modal.
- **Light & Pin to Community Wall** — publishes your card to the courtyard below.

### The Panchang & Wall (`#community-wall`)

**Panchang:** 5 day-cards act as tabs. Selecting a day reveals a jewel-box detail card with the tithi badge, Devanagari title, significance prose, Muhurat window, ritual highlight, and a tailored blessing with copy/studio actions.

**Community Wall:**
- Click **"Light a Virtual Diya & Post Wish"** to expand the sanctuary form.
- Fill in name, city/country, choose a **Sankalpa** theme, write your blessing, and pick a **flame aura**.
- Submit to publish instantly at the top of the grid with a *"Just now"* timestamp.
- Hit the **heart button** to send light to any blessing.

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-velvet` | `#0C0612` | Page background, deepest shadows |
| `bg-plum` | `#180C24` | Card wells, glass surfaces |
| `text-ivory` | `#FDFBF7` | Primary headings & body |
| `text-sandalwood` | `#D8C3A5` | Secondary body copy |
| `text-bronze` | `#9B8265` | Tertiary labels, placeholders |
| `accent-gold` | `#FFB703` | Primary accent, flames, zari |
| `accent-sindoor` | `#E63946` | Crimson accent, vermilion, sindoor |
| `accent-peacock` | `#118AB2` | Cool contrast, peacock teal |

### Typography

| Family | Role |
|---|---|
| **Cormorant Garamond** | Display headlines, the *"Shubh Deepavali"* title, poetic wish bodies |
| **Plus Jakarta Sans** | UI text, buttons, forms, navigation |
| **JetBrains Mono** | Muhurat timings, card serials, technical metadata |
| **Noto Serif Devanagari** | All Sanskrit / Devanagari script |

### Signature CSS Utilities (`src/index.css`)

| Utility | Effect |
|---|---|
| `.text-gold-foil` | Static 135° metallic gold gradient text |
| `.text-gold-shimmer` | Animated flowing gold foil (6s infinite loop) |
| `.kumkum-glass` | Translucent plum glass with 16px backdrop blur |
| `.zari-card` | Double-line gold border card with inner light + hover lift/glow |
| `.animate-flame` | Multi-stage flame flicker (scale + rotate + opacity) |
| `.animate-core` | Inner flame core pulse |
| `.animate-halo` | Breathing ambient glow aura |
| `.animate-rangoli-cw` / `-ccw` | Counter-rotating mandala rings (95s / 120s) |
| `.animate-toran` | Swaying garland swag |
| `.animate-float-gentle` | Gentle vertical float |

All keyframes are defined with `@keyframes` and applied via utility classes for maximum performance (compositor-only transforms where possible).

---

## 📦 Data Model

All content lives in **`src/data/diwaliData.ts`** and is fully typed:

```ts
export type WishCategory = 'all' | 'family' | 'friends' | 'professional' | 'shlokas';
export type MotifType = 'lotus' | 'kalash' | 'diya' | 'peacock' | 'ganesha';

export interface DiwaliWish {
  id: string;
  serial: string;            // e.g. "#DW-07"
  category: Exclude<WishCategory, 'all'>;
  categoryLabel: string;
  motif: MotifType;
  sanskritLine?: string;     // Devanagari shloka
  wishText: string;
  defaultRecipient?: string;
}

export interface SacredDiya {
  id: number;
  name: string;
  sanskrit: string;
  meaning: string;
  blessingToast: string;
  positionLabel: string;
  isCenterpiece?: boolean;
}

export interface CardThemeConfig {
  id: 'marigold-gold' | 'sindoor-velvet' | 'peacock-sapphire' | 'ivory-parchment';
  name: string;
  subtitle: string;
  bgGradient: string;
  canvasStops: [string, string, string];   // for PNG export
  borderPrimary: string;
  borderSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  badgeBg: string;
  isLight?: boolean;
}

export interface PanchangDay {
  dayNumber: number;
  title: string;
  traditionalName: string;
  sanskritTitle: string;
  tithi: string;
  muhuratWindow: string;
  significance: string;
  ritualHighlight: string;
  specialWish: string;
  accentHex: string;
}

export interface CommunityDiyaPost {
  id: string;
  senderName: string;
  location: string;
  message: string;
  blessingTag: string;
  timestamp: string;
  flameColor: 'gold' | 'sindoor' | 'peacock';
  likes: number;
}
```

### Exported Collections

| Constant | Contents |
|---|---|
| `SACRED_DIYAS` | 7 diyas with Sanskrit, meanings, and blessing toasts |
| `DIWALI_WISHES` | 15 curated blessings |
| `CARD_THEMES` | 4 Royal Patrika palettes |
| `PANCHANG_DAYS` | 5-day Deepavali almanac |
| `INITIAL_WALL_BLESSINGS` | 6 seed community posts |

---

## 🔧 How The Magic Works

### Flame Physics (`DiwaliMotifs.tsx`)

Each flame is a **four-layer SVG stack**:

1. **Outer glow tear** — 22% opacity saffron fill for volumetric bloom.
2. **Primary flame body** — gradient (`#FFF3B0` → `#FFB703` → `#E63946`) teardrop path.
3. **Inner core** — white-to-gold path with a faster independent pulse.
4. **Hot wick base** — a small blue-violet ellipse (`#38BDF8`) simulating complete combustion.

`transform-origin` is pinned to the wick (`50% 90%`) so the flame bends and sways from its base like a real candle.

The **ambient halo** is a separate absolutely-positioned radial-gradient div behind the SVG, scaled and faded with `.animate-halo` to simulate radiative heat shimmer.

### Particle System (`AmbientSparkleCanvas.tsx`)

A single `<canvas>` overlay renders two particle classes:

- **Ambient embers** — slow-rising, gently drifting golden motes. The target population is `26 + litCount × 5`, so the courtyard visibly gets warmer as you light lamps.
- **Burst sparks** — high-velocity particles with gravity and rapid alpha decay for the *phuljhari* effect.

Bursts are dispatched globally via a **CustomEvent** so any component can trigger them without prop drilling:

```ts
import { triggerSparkBurst } from './AmbientSparkleCanvas';

triggerSparkBurst({ x: 400, y: 300, count: 40 });  // local burst
triggerSparkBurst({ grand: true });                 // 5-point celebration
```

### Audio Engine (`soundChimes.ts`)

A dependency-free synthesizer that builds brass-like temple bells from **stacked oscillators**:

- **4 partials** at ratios `1 : 2 : 3.01 : 4.18` with independent decay envelopes (`1.8s` → `0.45s`).
- **Yaman Raga scale** (`Sa Re Ga Ma# Pa Dha Ni Sa'`) — each diya lights at its own ascending pitch.
- **Maha-Aarti** plays all 7 notes with 95ms spacing.
- **Sparkle tick** — a quick 3-note high arpeggio for copy/save feedback.
- The `AudioContext` is lazily created and auto-resumed on first interaction to satisfy browser autoplay policies.

### PNG Export (`exportCardCanvas.ts`)

Renders a **1200 × 1520** canvas in this order:

1. Theme background gradient → 2. Warm radial aura → 3. Double zari hairline borders → 4. Four corner medallions → 5. Sanskrit invocation → 6. Diya emblem → 7. *"Shubh Deepavali"* title → 8. Divider rule → 9. Recipient salutation → 10. Word-wrapped blessing body → 11. Signature block → 12. Footer metadata stamp.

Text is wrapped with `ctx.measureText()` for pixel-accurate line breaks, then delivered via `canvas.toDataURL('image/png')` and a synthetic `<a download>` click.

---

## ✏️ Customization Guide

### Add a new wish

Append to `DIWALI_WISHES` in `src/data/diwaliData.ts`:

```ts
{
  id: 'wish-16',
  serial: '#DW-16',
  category: 'friends',
  categoryLabel: 'Friends & Joy',
  motif: 'diya',
  sanskritLine: '॥ तमसो मा ज्योतिर्गमय ॥',
  wishText: 'May the light of this festival find you in every shadow…',
  defaultRecipient: 'My Friend',
}
```

It will automatically appear in the grid, the category counts, the search index, and the Studio *"Inspire Me"* preset cycler.

### Add a new card theme

```ts
{
  id: 'emerald-jade',              // extend the CardThemeConfig['id'] union
  name: 'Emerald Jade Zari',
  subtitle: 'Banarasi Green & Antique Silver',
  bgGradient: 'linear-gradient(155deg, #06281C 0%, #04140F 55%, #0A1F18 100%)',
  canvasStops: ['#06281C', '#04140F', '#0A1F18'],
  borderPrimary: '#34D399',
  borderSecondary: '#D1D5DB',
  textPrimary: '#F2FBF7',
  textSecondary: '#A7D8C4',
  accentColor: '#34D399',
  badgeBg: 'rgba(52, 211, 153, 0.20)',
}
```

### Change the palette

Edit the CSS custom properties at the top of `src/index.css`:

```css
:root {
  --accent-gold: #FFB703;
  --accent-sindoor: #E63946;
  /* … */
}
```

### Add a new motif emblem

Add a case to the `MotifEmblemSvg` switch statement in `src/components/DiwaliMotifs.tsx`, then extend the `MotifType` union in `src/data/diwaliData.ts`.

### Reset the Community Wall

```js
// Browser console
localStorage.removeItem('jyotirmaya_diya_wall_v1');
location.reload();
```

---

## ♿ Accessibility

- **Semantic landmarks** — `<header>`, `<nav aria-label="Primary Navigation">`, `<main>`, `<section>`, `<footer>`.
- **All interactive diyas are real `<button>` elements** with visible focus states and text labels.
- **Live counters** and toasts use text, not color alone — state is always announced (e.g. *"● Lit"* vs *"○ Tap to Light"*).
- **Icon-only buttons** carry `aria-label` or `title` attributes (sound toggle, clear search, fullscreen close).
- **Keyboard navigable** — every filter, chip, field, and action is reachable via Tab.
- **Color contrast** — body text (`#D8C3A5` on `#0C0612`) exceeds WCAG AA for normal text.
- **Reduced motion** — all decorative animation is CSS-driven and can be disabled via `@media (prefers-reduced-motion: reduce)`; the core experience remains fully usable without it.

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge (90+) | ✅ Full |
| Firefox (88+) | ✅ Full |
| Safari 15+ | ✅ Full |
| iOS Safari 15+ | ✅ Full (audio requires first tap) |
| Older browsers | ⚠️ Renders with reduced effects |

**Requirements:** ES2020, CSS backdrop-filter, Web Audio API, Canvas 2D, CSS Grid & Flexbox.

---

## 🚢 Deployment

Because the build produces a **single self-contained `index.html`**, deployment is trivial:

```bash
npm run build
# Upload the contents of dist/ to any static host
```

**Netlify / Vercel / GitHub Pages** — set the build command to `npm run build` and the publish directory to `dist`.

> **Note:** Google Fonts are loaded from `fonts.googleapis.com`. For fully offline deployment, self-host the four font families and update the `<link>` tags in `index.html`.

---

## 🙏 Credits

- **Fonts** — [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), [Noto Serif Devanagari](https://fonts.google.com/specimen/Noto+Serif+Devanagari) — all SIL Open Font License.
- **Icons** — [Lucide](https://lucide.dev) (ISC License).
- **All Diwali artwork** — hand-authored SVG in this repository. No stock imagery was used.
- **Audio** — synthesized at runtime with the Web Audio API. No audio files were used.

---

<div align="center">

### 🙏 *शुभ दीपावली • Shubh Deepavali*

**May every lamp in your courtyard burn bright, and every path ahead be illumined with wisdom, health, and joy.**

॥ *तमसो मा ज्योतिर्गमय* — Lead us from darkness unto Light ॥

`ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यम् भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥`

</div>

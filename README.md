# KALKOOT — Ab Nahin Sahenge

India's First AI-Powered Citizen Power Platform.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🏗️ Architecture

```
kalkoot/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx       — Navbar + Footer wrapper
│   │   ├── Navbar.jsx       — Sticky nav with language toggle
│   │   ├── Hero.jsx         — Homepage hero section
│   │   ├── TickerBanner.jsx — Scrolling wins ticker
│   │   ├── ProblemSection.jsx
│   │   ├── EntryPoints.jsx  — 3-issue entry cards
│   │   ├── FeaturesSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── FounderSection.jsx
│   │   ├── CTABanner.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Rights.jsx
│   │   ├── Documents.jsx
│   │   ├── Officials.jsx
│   │   ├── Tracker.jsx
│   │   ├── Community.jsx
│   │   ├── About.jsx
│   │   ├── Start.jsx        — Issue intake (AI coming soon)
│   │   ├── PlaceholderPage.jsx
│   │   └── NotFound.jsx
│   ├── contexts/
│   │   └── LanguageContext.jsx  — Hindi / Hinglish toggle
│   ├── i18n/
│   │   └── translations.js     — All text in both languages
│   ├── hooks/
│   │   └── useScrollReveal.js  — Intersection Observer animations
│   ├── App.jsx            — Router setup
│   ├── main.jsx           — React entry
│   └── index.css          — Tailwind + global styles
├── tailwind.config.js     — Brand colors, fonts, animations
├── vite.config.js
└── package.json
```

---

## 🌐 Language Support

Toggle between **Hindi (हिंदी)** and **Hinglish** using the button in the navbar.

To add a new language:
1. Add entries to `src/i18n/translations.js`
2. Update `LanguageContext.jsx` to support the new key

---

## 🎨 Brand Colors

| Token                  | Hex       | Usage                 |
|------------------------|-----------|-----------------------|
| `kalkoot-primary`      | `#E8440A` | CTA, accents, fire    |
| `kalkoot-secondary`    | `#FFB800` | Gold, justice, trust  |
| `kalkoot-dark`         | `#07090F` | Main background       |
| `kalkoot-navy`         | `#0D1526` | Section backgrounds   |
| `kalkoot-charcoal`     | `#1A2035` | Cards                 |
| `kalkoot-light`        | `#F5F0E8` | Primary text          |
| `kalkoot-muted`        | `#8B9BB4` | Secondary text        |

---

## 🔧 Adding New Features

### New Page
1. Create `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navbar.jsx`
4. Add translations in `src/i18n/translations.js`

### New Component
1. Create `src/components/YourComponent.jsx`
2. Use `useLang()` for text
3. Use `useScrollReveal()` for entrance animations

---

## 📦 Build

```bash
npm run build      # Production build in /dist
npm run preview    # Preview production build
```

---

## 📋 Roadmap

- [x] Phase 1: Website & Brand (this release)
- [ ] Phase 2: Nyay Mitra AI Chat Integration
- [ ] Phase 3: Document Generation Engine
- [ ] Phase 4: Officials Directory (live data)
- [ ] Phase 5: Corruption Tracker Database
- [ ] Phase 6: Mobile App (Android)

---

*KALKOOT — Ab Nahin Sahenge | Confidential | v1.0 | 2025*

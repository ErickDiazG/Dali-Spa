# DALI SPA — Belleza y Relajacion Website

A premium spa website built with **Astro** and **Tailwind CSS v4**, featuring a pixel-perfect luxury design with interactive React islands.

## 🌿 Features

- **Premium Design** — Serif typography, teal & gold palette, smooth animations
- **Language Switcher** — EN/ES toggle
- **Spa Packages Menu** — 7 category pill-carousel with image slider and expandable treatment details
- **Booking Drawer** — Date picker, guest selector, promo code, and spa cart with quantity management
- **Full-Screen Menu** — Multi-column overlay navigation with resort imagery
- **Tripadvisor Reviews** — Real review section with star ratings
- **Responsive** — Mobile-first design

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| [Astro](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [React](https://react.dev) | Interactive "islands" |
| [Lucide React](https://lucide.dev) | Icon library |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── DaliSpa.tsx      # Main React island (all interactive UI)
├── data/
│   └── index.ts         # Spa data, images, types
├── layouts/
│   └── Layout.astro     # Base HTML layout
├── pages/
│   └── index.astro      # Home page
└── styles/
    └── global.css        # Tailwind + design tokens
```



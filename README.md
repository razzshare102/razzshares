# 💎 RazzShares Web3

> **Alpha. Airdrops. Community.**

A modern Web3 landing page with integrated admin panel for the RazzShares Web3 community.

---

## 🚀 Live Preview

Open `index.html` in any browser — no build step required. All dependencies load from CDN at runtime.

---

## 📁 Project Structure

```
razzshares/
├── index.html              ← Main landing page
├── assets/
│   ├── css/
│   │   ├── styles.css      ← Landing page styles
│   │   └── admin.css       ← Admin panel styles
│   └── js/
│       └── supabase.js     ← Supabase client & DB helpers
├── admin/
│   ├── index.html          ← Admin panel (protected)
│   └── login.html          ← Admin login page
└── README.md
```

---

## 🎨 Landing Page Sections

| Section | Description |
|---|---|
| **Hero** | Animated particles, wallet visual, CTA buttons |
| **Ticker** | Live crypto price ticker |
| **Stats** | Animated counters (members, alpha calls, projects, reach) |
| **About** | Community overview, feature pills |
| **Features** | 6 feature cards (Airdrops, Alpha, Education, etc.) |
| **Ecosystem** | 6 project cards with tags and links |
| **Community** | 5 social platform cards + growth chart |
| **Testimonials** | 6 community testimonial cards with glow hover |
| **FAQ** | 7 accordion-style questions |
| **Newsletter** | Email subscribe form |
| **Footer** | Links, socials, branding |

---

## 🔧 Admin Panel Pages

| Page | Features |
|---|---|
| **Dashboard** | Stats widgets, growth chart, platform split doughnut, activity feed, quick actions, monthly goals |
| **Analytics** | Traffic charts, content performance, source breakdown table |
| **Projects** | Add/Edit/Delete projects, search & filter, status management |
| **Content** | Blog posts, alpha calls, announcements — tabbed view |
| **Users** | View/Ban/Unban users, role management, search & filter |
| **Newsletter** | Subscriber list, compose & send campaigns, open rate stats |
| **Media Library** | Upload files (drag & drop), grid/list view, delete assets |
| **Settings** | General, SEO, social links, theme colors, feature toggles, security |

### Admin Login
- URL: `admin/login.html`
- Demo credentials: `admin@razzshares.com` / `admin123`

---

## 🔌 Supabase Integration

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **Anon Key**
3. Update `assets/js/supabase.js`:
   ```js
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_KEY = 'your-anon-key';
   ```
4. Run the SQL schema in `assets/js/supabase.js` (see the comment block at the bottom)

---

## 🛠 Tech Stack

| Tech | Usage |
|---|---|
| HTML5 + CSS3 | Structure & styling |
| Vanilla JavaScript | Interactivity, animations, logic |
| CSS Custom Properties | Design tokens & theming |
| Chart.js (CDN) | Admin dashboard charts |
| Google Fonts (CDN) | Inter + Space Grotesk |
| Supabase | Backend, auth, database |

---

## ✨ UI Features

- 🌌 Animated particle canvas background
- 💎 Glassmorphism cards with backdrop-filter
- 🌈 Purple/Blue/Cyan gradient accents
- 🔮 Neon border animations
- 📊 Animated stat counters (IntersectionObserver)
- 🎭 Smooth scroll reveal animations
- 💫 Floating crypto token elements
- 📱 Fully responsive (mobile-first)
- 🎨 Dark futuristic aesthetic
- ⚡ Live crypto price ticker

---

## 📬 Community Links

- Telegram: [t.me/razzshares](https://t.me/razzshares)
- Discord: [discord.gg/razzshares](https://discord.gg/razzshares)  
- Twitter: [@razzshares](https://twitter.com/razzshares)
- YouTube: [@razzshares](https://youtube.com/@razzshares)
- Reference: [razzsharesweb3.lovable.app](https://razzsharesweb3.lovable.app)

---

*Not financial advice. DYOR. Built with 💜 for the Web3 community.*

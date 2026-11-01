# Nexus Sales Intelligence & Analytics Dashboard

A modern, responsive, high-performance sales analytics dashboard built with **vanilla HTML5, CSS3, and ES6 JavaScript**.

Zero external framework dependencies, zero build steps, and persistent client-side data storage using the browser's `localStorage` WebStorage API.

---

## 🚀 Key Features

- **Executive KPI Metrics**:
  - **Total Revenue**: Dynamic gross revenue tracking with comparative period trendlines.
  - **Gross Profit & Margin**: Profit calculations with estimated cost comparison and margin percentages.
  - **Transaction Velocity**: Completed orders vs. refunds breakdown and fulfillment ratios.
  - **Average Order Value (AOV)**: Average ticket size and top-performing territory indicator.

- **Retina-Ready Canvas Visualizations**:
  - **Revenue & Profit Dynamics**: Pure HTML5 Canvas interactive area chart with smooth gradient fills and hover tooltips.
  - **Category Breakdown**: Proportional donut chart displaying sales contribution across categories.
  - **Territory Performance**: Bar chart comparing sales volume across global regions.
  - **Acquisition Channels**: Progress distribution for Direct Sales, Partner Channels, Self-Serve, and Referrals.
  - **Top Products**: Ranked leaderboard of highest revenue-generating offerings.

- **Data Management & Audit**:
  - **Interactive Ledger**: Searchable, filterable, and sortable order table.
  - **Transaction Modal**: Dialog to log new transactions in real time with immediate metric recalculation.
  - **Data Portability**: Instant CSV export functionality.
  - **Reset Capability**: One-click restore to pre-populated demo dataset (36 comprehensive transactions).

- **Technical Design Constraints**:
  - **Strict CSS Architecture**: No CSS variables (`--*` or `var()`) are used.
  - **Offline & Self-Contained**: Vector SVG icons inline; no CDN fonts or third-party charting libraries required.
  - **WebStorage**: Fully persistent using `localStorage`.

---

## 🛠️ Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in any modern web browser:
```bash
open index.html
```

### Option 2: Run via Node.js
```bash
node server.js
```
Then visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
├── index.html     # Semantic single-page dashboard layout
├── style.css      # Direct CSS styling (zero CSS variables)
├── app.js         # Reactive analytics engine, HTML5 canvas charts, localStorage
├── server.js      # Zero-dependency local Node.js HTTP server
├── .gitignore     # Git ignore rules
└── README.md      # Project documentation
```

---

## 📄 License
MIT License. Free for personal and commercial use.

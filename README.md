# MOBIL Gas Station 🚗⛽

**An interactive, high-performance web interface for a Mobil gas station, inspired by Formula 1 racing.**

> A small React + Vite + TypeScript SPA providing a public site (fuel prices, services, station locator) and an Admin dashboard to manage fuel prices, inventory, and employees.

---

## 🔧 Features

- Public pages: Home, Fuel Prices, Services, Station Locator, About, Contact
- Admin dashboard to update fuel prices, manage inventory and employees
- Simple local state management (no backend required) using **Zustand** and initial data in `constants.ts`
- Responsive layout with light/dark theme toggle
- Client-side routing using `react-router-dom` (HashRouter)

## 🧭 Tech Stack

- **Framework:** React 19
- **Bundler/Tooling:** Vite
- **Language:** TypeScript
- **State Management:** Zustand
- **Routing:** react-router-dom

Dependencies are declared in `package.json`.

## 🚀 Getting started

### Prerequisites

- Node.js (recommended LTS)
- npm (or yarn/pnpm)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
# open http://localhost:5173 (Vite dev server)
```

### Production build

```bash
npm run build
npm run preview
```

## 📂 Project structure

- `index.html` — App entry HTML
- `index.tsx` — React entry point
- `App.tsx` — Router + layout wrapper
- `components/` — Reusable UI components (`Header`, `Footer`, `Icons`, `Logo`)
- `pages/` — Page views (Home, FuelPrices, Services, StationLocator, About, Contact, Admin)
- `store/` — Zustand stores: `useFuelStore`, `useInventoryStore`, `useEmployeeStore`, `useThemeStore`
- `constants.ts` — Initial data for fuel prices, products, employees, and services
- `types.ts` — TypeScript types used across the app

## ⚙️ State & Data

- Initial data lives in `constants.ts` (e.g., `FUEL_PRICES`, `PRODUCTS_DATA`, `EMPLOYEES_DATA`).
- State is managed locally via Zustand stores:
  - `useFuelStore.updatePrice(id, newPrice)` to change fuel prices
  - `useInventoryStore.updateStock(id, newStock)` to update product stock
  - `useEmployeeStore.addEmployee/updateEmployee/removeEmployee`

This makes it easy to swap to a backend later: replace store initializer and actions with API calls.

## 💡 Notes for developers

- Routing uses `HashRouter` (see `App.tsx`) to simplify static hosting without server-side routing setup.
- Theme is driven by `useThemeStore` and injects a `dark` class on the `documentElement`.
- Add or modify initial data in `constants.ts` to change what's shown by default.

## 🤝 Contributing

- Fork the repo and open a PR with clear changes and a short description.
- Add tests and update types where applicable.

## 📝 TODO / Ideas

- Add integration with a backend (REST/GraphQL) to persist changes
- Add form validation and unit tests
- Add CI pipeline and automated deployments

## 📞 Contact

For questions or feature requests, open an issue in this repository.

---

**License:** Add a license file (e.g., `LICENSE`) to make terms explicit.

*Generated: based on project files (`metadata.json`, `package.json`, source files).*
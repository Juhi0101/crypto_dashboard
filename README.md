# Crypto Dashboard

A responsive React dashboard displaying real-time cryptocurrency market data using the CoinGecko API. Users can browse coins, search, sort, and view detailed stats.

## Features

- Browse top cryptocurrencies with live market data
- Search coins by name or symbol
- Sort by Market Cap, Price, 24h %, and Volume
- Pagination for easy navigation
- Click any coin to see detailed stats in a modal
- Mobile and desktop responsive

## Tech Stack
- **Frontend:** React (Vite)  
- **Styling:** TailwindCSS  
- **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`)  
- **API:** CoinGecko API  
- **Deployment:** Vercel 

## Design Patterns & Rationale
* **Hooks for State & Effects:** Simplifies API fetching, caching, and reactive updates
* **Custom Hooks (`useFetch`, `useDebounce`):** Reusable logic for API calls and debounced search
* **Component Modularity:** Each UI section (All Coins, Highlights, CoinModal, Loading) is self-contained for clarity and maintainability

## Assumptions, Limitations & Future Improvements
* Assumes CoinGecko API is publicly accessible; no backend required
* Currently only handles USD prices
* Search requires improvement in logic.
* Future improvements: more currencies, enhanced filtering/sorting, user preferences, improved error handling

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Juhi0101/crypto_dashboard
cd crypto_dashboard
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with:
```bash
VITE_BASE_URL=https://api.coingecko.com/api/v3
```
4. Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Deployment

This project can be deployed on Vercel:

1. Push your latest code to GitHub.
2. Go to [Vercel](https://vercel.com/) → New Project → Import Git Repository.
3. Configure project:
   - Framework: Vite
   - Root Directory: `/`
   - Environment Variables: `VITE_BASE_URL=https://api.coingecko.com/api/v3`
   - **Note: The project works out-of-the-box without an `.env` file. In `api.js`, the app uses the local `/api` proxy when developing and the real CoinGecko API when live.**

4. Deploy the project. Vercel will provide a live URL for your app.

## Usage

- Use the search input to find coins by name or symbol.
- Click on table headers to sort by Market Cap, Price, 24h %, or Volume.
- Click on a coin row to view detailed statistics in a modal.
- Navigate through pages using the pagination buttons.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a pull request

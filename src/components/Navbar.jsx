import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = (isActive) =>
    `px-3 py-2 rounded-md text-sm font-semibold inline-block transition-colors ${
      isActive
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    }`;

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo/title */}
          <div className="flex items-center gap-3">
            <img
              src="https://static.coingecko.com/s/gecko-405ed53b475f61244130f95742a07da15f7ac30feeed5072812ae5c2d73b6194.svg"
              alt="CoinGecko Logo"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">Crypto Dashboard</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Live coin prices & highlights</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/all"
              end
              className={({ isActive }) => navLinkClass(isActive)}
            >
              All Coins
            </NavLink>

            <NavLink
              to="/highlights"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Highlights
            </NavLink>
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              {/* simple hamburger icon */}
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-2 border-t border-gray-100 flex flex-col gap-1">
            <NavLink
              to="/all"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "text-green-600 font-semibold" : "text-gray-700"}`
              }
              onClick={() => setMobileOpen(false)}
            >
              All Coins
            </NavLink>

            <NavLink
              to="/highlights"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "text-green-600 font-semibold" : "text-gray-700"}`
              }
              onClick={() => setMobileOpen(false)}
            >
              Highlights
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm p-4 sticky top-0 z-10 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Crypto Dashboard</h1>
      <div className="space-x-4">
        <NavLink
          to="/all"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl ${
              isActive ? "bg-green-200 text-green-900 font-bold" : "text-gray-700 hover:bg-gray-100 font-bold"
            }`
          }
        >
          All Coins
        </NavLink>
        <NavLink
          to="/highlights"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl ${
              isActive ? "bg-green-200 text-green-900 font-bold" : "text-gray-700 hover:bg-gray-100 font-bold"
            }`
          }
        >
          Highlights
        </NavLink>
      </div>
    </nav>
  );
}

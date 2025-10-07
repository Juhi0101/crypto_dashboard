import React from "react";
/*
 * HighlightCard component
 * Displays coin info: rank, icon, name, 24h change
 * Responsive, clickable, integrated with CoinModal
 */
export default function HighlightCard({ coin, onClick }) {
  return (
    <div
      onClick={() => onClick(coin)}
      className="flex items-center justify-between gap-3 p-3 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all duration-200 ease-in-out"
    >
      {/* Leftmost: market cap rank */}
      <span className="font-bold text-gray-700 w-6 text-center">
        {coin.market_cap_rank ?? "-"}
      </span>

      {/* Coin image */}
      <img src={coin.image} alt={coin.symbol} className="w-8 h-8" />

      {/* Coin info */}
      <div className="flex-1 flex flex-col">
        <span className="font-medium">{coin.name}</span>
        <span className="text-gray-500 uppercase text-xs">{coin.symbol}</span>
      </div>

      {/* Price & 24h change */}
      <div className="flex flex-col items-end">
        <span className="font-medium">
          ${coin.current_price?.toLocaleString() ?? "-"}
        </span>
        <span
          className={`text-sm font-semibold ${
            coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {coin.price_change_percentage_24h?.toFixed(2) ?? "-"}%
        </span>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config/api";

function formatNumber(num) {
  if (!num && num !== 0) return "-";
  return Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
}

export default function AllCoins() {
  const [page, setPage] = useState(1);

  const url = useMemo(() => {
    return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&price_change_percentage=24h`;
  }, [page]);

  const { data: coins, loading, error } = useFetch(url);
  const coinsArray = Array.isArray(coins) ? coins : [];

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">All Coins</h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-3 mb-3 rounded">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div className="text-gray-500 animate-pulse p-2">Loading coins…</div>
      )}

      {/* Empty state */}
      {!loading && !error && coinsArray.length === 0 && (
        <div className="text-gray-500 p-2">
          No data available right now. Please retry later.
        </div>
      )}

      {/* Data table */}
      {coinsArray.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Coin</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">24h %</th>
                <th className="py-3 px-4">Market Cap</th>
                <th className="py-3 px-4">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {coinsArray.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-2 px-4">{coin.market_cap_rank}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <img src={coin.image} alt={coin.symbol} className="w-5 h-5" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-gray-500 uppercase">
                      {coin.symbol}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    ${coin.current_price?.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="py-2 px-4">${formatNumber(coin.market_cap)}</td>
                  <td className="py-2 px-4">${formatNumber(coin.total_volume)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          ← Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="px-3 py-1 border rounded"
        >
          Next →
        </button>
      </div>
    </section>
  );
}

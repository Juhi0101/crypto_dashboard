import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config/api";
import useDebounce from "../hooks/useDebounce";
import CoinModal from "./CoinModal"
import Loading from "./Loading";

function formatNumber(num) {
  if (!num && num !== 0) return "-";
  return Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
}

export default function AllCoins() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "market_cap_rank", direction: "asc" });
  const [selectedCoin, setSelectedCoin] = useState(null);


  const debouncedSearch = useDebounce(searchTerm, 300);

  //helper for sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  //API URL with pagination
  const url = useMemo(() => {
    return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&price_change_percentage=24h`;
  }, [page]);

  const { data: coins, loading, error } = useFetch(url);

  //Filter and sort coins
  const filteredCoins = useMemo(() => {
    const coinsArray = Array.isArray(coins) ? coins : [];

    //Search filtering
    let filtered = coinsArray;
    if (debouncedSearch.trim()) {
      filtered = coinsArray.filter(
        (coin) =>
          coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    //Sorting
    const { key, direction } = sortConfig;
    filtered.sort((a, b) => {
      let aValue = a[key] ?? 0;
      let bValue = b[key] ?? 0;

      if (key === "price_change_percentage_24h") {
        aValue = a.price_change_percentage_24h ?? 0;
        bValue = b.price_change_percentage_24h ?? 0;
      } else if (key === "current_price") {
        aValue = a.current_price ?? 0;
        bValue = b.current_price ?? 0;
      }

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [coins, debouncedSearch, sortConfig]);

  //Function to render arrow indicators
  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    } else {
      //show default arrows for unsorted columns
      return "▲▼"; 
    }
  };

  //table headers
  const headers = [
    { key: "market_cap_rank", label: "#" },
    { key: "coin", label: "Coin", sortable: false },
    { key: "current_price", label: "Price" },
    { key: "price_change_percentage_24h", label: "24h %" },
    { key: "market_cap", label: "Market Cap" },
    { key: "total_volume", label: "Volume (24h)" },
  ];

  return (
    <section className="my-10 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">All Coins</h2>

      <p className="text-gray-500 mb-3 text-sm">
        Browse the latest crypto market data. Click any coin for detailed stats.
      </p>
      {/* Search Input */}
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-3 mb-3 rounded">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && !error && <Loading />}


      {/* Empty state */}
      {!loading && !error && filteredCoins.length === 0 && (
        <div className="text-gray-500 p-2">No coins found.</div>
      )}

      {/* Data table */}
      {filteredCoins.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-700 uppercase text-md tracking-wide border-b">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className={`py-3 px-4 cursor-pointer text-gray-800 font-semibold`}
                    onClick={() => header.sortable !== false && handleSort(header.key)}
                  >
                    {header.label}
                    {header.sortable !== false && renderSortArrow(header.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-t border-gray-200 shadow-sm shadow-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedCoin(coin)}
                >
                  <td className="py-2 px-4">{coin.market_cap_rank}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <img src={coin.image} alt={coin.symbol} className="w-5 h-5" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-gray-500 uppercase">{coin.symbol}</span>
                  </td>
                  <td className="py-2 px-4">${coin.current_price?.toLocaleString()}</td>
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
          className="px-3 py-1 border border-gray-200 shadow-sm rounded-lg hover:bg-green-100 transition disabled:opacity-40"
        >
          ← Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="px-3 py-1 border border-gray-200 shadow-sm rounded-lg hover:bg-green-100 transition disabled:opacity-40"
        >
          Next →
        </button>
      </div>
        {selectedCoin && (
          <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
        )}

    </section>

    
  
);
  
}

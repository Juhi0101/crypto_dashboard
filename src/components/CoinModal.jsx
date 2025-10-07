import { useEffect, useState } from "react";

export default function CoinModal({ coin, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  //fade-in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  //fade-out before closing
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); 
  };

  if (!coin) return null;

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-white/40 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose} //click outside closes modal
    >
      <div
        className={`bg-white rounded-xl shadow-lg shadow-gray-300 border border-gray-200 max-w-lg w-full p-6 relative transform transition-all duration-200${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={handleModalClick} //prevent close when clicking inside
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Coin info */}
        <div className="flex items-center gap-4 mb-4">
          <img src={coin.image} alt={coin.symbol} className="w-12 h-12" />
          <div>
            <h2 className="text-xl font-semibold">{coin.name}</h2>
            <p className="text-gray-500 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Price:</span> ${coin.current_price?.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Market Cap:</span> ${coin.market_cap?.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">24h Change:</span>{" "}
            <span className={coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="font-medium">Volume (24h):</span> ${coin.total_volume?.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">High 24h:</span> ${coin.high_24h?.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Low 24h:</span> ${coin.low_24h?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

import HighlightCard from "./HighlightCard";

export default function HighlightSection({ title, coins, onCoinClick }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {coins.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <ol className="space-y-2">
          {coins.map((coin) => (
            <li key={coin.id}>
              <HighlightCard coin={coin} onClick={onCoinClick} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

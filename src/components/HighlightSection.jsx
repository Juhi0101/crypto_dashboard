import HighlightCard from "./HighlightCard";

export default function HighlightSection({ title, coins, onCoinClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
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

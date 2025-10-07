export default function Highlights() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Market Highlights</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-4 shadow rounded-lg text-center">Top Gainers</div>
        <div className="bg-white p-4 shadow rounded-lg text-center">Top Losers</div>
        <div className="bg-white p-4 shadow rounded-lg text-center">Trending Coins</div>
      </div>
    </section>
  );
}

export default function AllCoins() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">All Coins</h2>
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search coin..."
          className="border rounded-md p-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="text-sm text-gray-600 hover:text-gray-800">Sort ▾</button>
      </div>
      <div className="bg-white p-4 shadow rounded-lg text-gray-500">
        (Table will go here)
      </div>
    </section>
  );
}

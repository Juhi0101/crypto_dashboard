import Navbar from "./components/Navbar";
import Highlights from "./components/Highlights";
import AllCoins from "./components/AllCoins";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Highlights />
        <AllCoins />
      </main>
    </div>
  );
}

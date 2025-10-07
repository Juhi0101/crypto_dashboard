import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllCoins from "./components/AllCoins";
import Highlights from "./components/Highlights";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/all" replace />} />
          <Route path="/all" element={<AllCoins />} />
          <Route path="/highlights" element={<Highlights />} />
        </Routes>
      </div>
    </Router>
  );
}
